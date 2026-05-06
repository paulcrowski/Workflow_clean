const fs = require("fs");
const { execFileSync } = require("child_process");

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function changedFilesArgs() {
  if (process.env.GITHUB_BASE_REF) {
    return ["diff", "--name-only", `origin/${process.env.GITHUB_BASE_REF}...HEAD`];
  }

  const staged = git(["diff", "--cached", "--name-only"]);
  if (staged) {
    return ["diff", "--cached", "--name-only"];
  }

  return null;
}

const args = changedFilesArgs();

if (!args) {
  console.log("check:godfiles PASS - no staged files");
  process.exit(0);
}

const output = git(args);

if (!output) {
  console.log("check:godfiles PASS - no changed files");
  process.exit(0);
}

const todo = fs.existsSync("tasks/todo.md")
  ? fs.readFileSync("tasks/todo.md", "utf8")
  : "";

const hasGodFileCheck = /## GOD_FILE_CHECK|GOD_FILE_CHECK/i.test(todo);

const files = output
  .split("\n")
  .filter(file => /\.(ts|tsx|js|jsx|py|go|rs|java|cs)$/.test(file))
  .filter(file => fs.existsSync(file));

let hardFail = false;

for (const file of files) {
  const loc = fs.readFileSync(file, "utf8").split("\n").length;

  if (loc > 1000) {
    if (!hasGodFileCheck) {
      console.error(`${file}: ${loc} LOC. >1000 LOC requires GOD_FILE_CHECK in tasks/todo.md.`);
      hardFail = true;
    } else {
      console.warn(`${file}: ${loc} LOC. >1000 LOC but GOD_FILE_CHECK found.`);
    }
  } else if (loc > 800) {
    console.warn(`${file}: ${loc} LOC. >800 LOC - architecture risk.`);
  } else if (loc > 500) {
    console.warn(`${file}: ${loc} LOC. >500 LOC - require split consideration.`);
  } else if (loc > 300) {
    console.warn(`${file}: ${loc} LOC. >300 LOC - size warning.`);
  }
}

if (hardFail) {
  process.exit(1);
}

console.log("check:godfiles PASS");
