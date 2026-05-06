const { execFileSync } = require("child_process");

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function diffArgs() {
  if (process.env.GITHUB_BASE_REF) {
    return ["diff", "--numstat", `origin/${process.env.GITHUB_BASE_REF}...HEAD`];
  }

  const staged = git(["diff", "--cached", "--name-only"]);
  if (staged) {
    return ["diff", "--cached", "--numstat"];
  }

  return null;
}

const args = diffArgs();

if (!args) {
  console.log("check:diff-size PASS - no staged changes");
  process.exit(0);
}

const output = git(args);

if (!output) {
  console.log("check:diff-size PASS - no changed files");
  process.exit(0);
}

const ignoredLargeFiles = [
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "bun.lockb",
  "Cargo.lock",
  "poetry.lock"
];

const generatedPatterns = [
  /(^|\/)dist\//,
  /(^|\/)build\//,
  /(^|\/)coverage\//,
  /\.snap$/,
  /\.generated\./,
  /\.gen\./
];

function isIgnoredLargeFile(file) {
  return ignoredLargeFiles.some(name => file.endsWith(name)) ||
    generatedPatterns.some(pattern => pattern.test(file));
}

let total = 0;
let countedTotal = 0;
const countedFiles = [];
const ignoredFiles = [];

for (const line of output.split("\n")) {
  const [added, removed, file] = line.split(/\s+/);
  const a = Number(added) || 0;
  const r = Number(removed) || 0;
  const changed = a + r;

  total += changed;

  if (isIgnoredLargeFile(file)) {
    ignoredFiles.push(file);
    continue;
  }

  countedTotal += changed;
  countedFiles.push(file);
}

if (countedFiles.length > 12) {
  console.error(`Too many files changed: ${countedFiles.length}. Limit: 12. Re-plan required.`);
  console.error(`Ignored generated/lock files: ${ignoredFiles.join(", ") || "none"}`);
  process.exit(1);
}

if (countedTotal > 250) {
  console.error(`Diff too large: ${countedTotal} counted lines. Limit: 250. Split into smaller AI-safe tasks.`);
  console.error(`Total including generated/lock files: ${total}`);
  console.error(`Ignored generated/lock files: ${ignoredFiles.join(", ") || "none"}`);
  process.exit(1);
}

console.log(`check:diff-size PASS - ${countedFiles.length} counted files, ${countedTotal} counted lines`);

if (ignoredFiles.length) {
  console.log(`Ignored generated/lock files: ${ignoredFiles.join(", ")}`);
}
