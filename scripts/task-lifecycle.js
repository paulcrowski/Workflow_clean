const fs = require("fs");
const path = require("path");

const cmd = process.argv[2];
const args = parse(process.argv.slice(3));

if (cmd === "new") taskNew(args);
else if (cmd === "close") taskClose(args);
else {
  console.error("Usage: node scripts/task-lifecycle.js new|close --slug task --files src/a.js");
  process.exit(1);
}

function taskNew(a) {
  const file = a["task-file"] || "tasks/todo.md";
  const date = a.date || today();
  const slug = slugify(a.slug || a._[0]);
  const mode = up(a.mode || "MINIMAL_FIX");
  const change = a["change-mode"] || "code-change";
  const klass = up(a.classification || "REQUIRED");
  const files = list(a.files);

  must(slug, "task:new", "Missing --slug.");
  oneOf(mode, ["MINIMAL_FIX", "RUNTIME_FIX", "STRUCTURE_FIX", "FEATURE", "AUDIT"], "task:new", "--mode");
  oneOf(change, ["code-change", "audit-only", "release-build"], "task:new", "--change-mode");
  oneOf(klass, ["REQUIRED", "NICE_TO_HAVE", "OVERBUILD"], "task:new", "--classification");
  if (change !== "audit-only" && files.length === 0) die("task:new", "Missing --files for code-changing task.");
  if (fs.existsSync(file) && !a.force && !field(read(file), "Task ID").endsWith("-ready-for-next-task")) {
    die("task:new", `Refusing to overwrite ${file}. Use --force intentionally.`);
  }

  const id = `${date}-${slug}`;
  const allowed = uniq([...files, show(file), "tasks/archive/**"]);
  write(file, render({
    id,
    date,
    mode,
    change,
    klass,
    module: a.module || "workflow",
    outcome: a.outcome || `Zrealizować task: ${slug}.`,
    success: list(a.success)[0] || "Task ma dowód PASS.",
    files: files.length ? files.join(", ") : "brak",
    allowed,
    review: "Nie uruchomiono testów"
  }));
  console.log(`task:new PASS - created ${id} in ${file}`);
}

function taskClose(a) {
  const file = a["task-file"] || "tasks/todo.md";
  const archiveDir = a["archive-dir"] || "tasks/archive";
  const date = a.date || today();
  const txt = read(file);
  const id = field(txt, "Task ID");
  const status = field(txt, "Task Status");
  const result = up(a.result || review(txt));

  must(id, "task:close", "Current task has no Task ID.");
  if (status !== "ACTIVE") die("task:close", `Task Status must be ACTIVE. Found: ${status || "missing"}.`);
  if (id.endsWith("-ready-for-next-task")) die("task:close", "Ready task is already clean.");
  oneOf(result, ["PASS", "FAIL"], "task:close", "--result");

  const archive = path.join(archiveDir, `${id}.md`);
  if (fs.existsSync(archive) && !a.force) die("task:close", `Archive exists: ${archive}. Use --force intentionally.`);

  const closed = txt.replace(/PASS \/ FAIL:\s*(PASS|FAIL|Nie uruchomiono testów)\s*$/im, `PASS / FAIL: ${result}`);
  write(archive, `# Archived Task\n\nClosed At: ${new Date().toISOString()}\nResult: ${result}\nSource File: ${file}\n\n${closed}`);
  write(file, render({
    id: `${date}-ready-for-next-task`,
    date,
    mode: "MINIMAL_FIX",
    change: "code-change",
    klass: "REQUIRED",
    module: "workflow task lifecycle",
    outcome: "Repo czeka na następny realny task.",
    success: "Poprzedni task jest w archiwum.",
    files: `${show(file)}, ${show(archiveDir)}/**`,
    allowed: [show(file), `${show(archiveDir)}/**`],
    review: "PASS"
  }));
  console.log(`task:close PASS - archived ${id} to ${archive}; reset ${file}`);
}

function render(t) {
  const allowed = t.allowed.map(x => `- ${x}`).join("\n");
  const sections = [
    ["Tryb pracy", `${t.mode}\n\nUzasadnienie trybu:\nTask utworzony przez task lifecycle.`],
    ["Cel / Outcome", t.outcome],
    ["Kryteria sukcesu", `- ${t.success}`],
    ["Kontekst dla agenta", `Moduł: ${t.module}\nTryb zmiany: ${t.change}\nMaksymalny zakres plików: allowlista z taska\nDozwolone pliki do zmiany:\n${allowed}\nKontrakty do przeczytania: AGENTS.md, README.md\nPliki zakazane: wszystko poza allowlistą\nCzego nie ruszać: pliki poza zakresem`],
    ["Zakres", `Moduł: ${t.module}\nPliki: ${t.files}`],
    ["Reprodukcja / dowód problemu", "Task utworzony z polecenia użytkownika albo przez zamknięcie poprzedniego taska."],
    ["Escalation", "Czy brakuje danych do bezpiecznej zmiany?\nNIE\n\nJeśli TAK:\nBrakujące dane: brak\nCzego nie da się potwierdzić: brak\nRyzyko kodowania teraz: niskie po utrzymaniu scope locka\nNajmniejszy następny krok: wykonać najmniejszą zmianę z allowlisty"],
    ["Klasyfikacja", `${t.klass}\n\nUzasadnienie:\nZmiana jest wymagana dla aktualnego stanu workflow.`],
    ["Diagnoza", "Root cause: do uzupełnienia przez agenta.\nDowód: do uzupełnienia przed finalnym PASS.\nAktualny flow: do uzupełnienia, jeśli dotyczy."],
    ["Granice", `Moduły dotknięte: ${t.module}\nKontrakty dotknięte: do uzupełnienia, jeśli dotyczy.\nPoza zakresem: wszystko poza allowlistą.`],
    ["Kontrakt", "INPUT: polecenie użytkownika i pliki z allowlisty.\nSUCCESS: spełnione kryteria sukcesu.\nERRORS: brak dowodu, zmiana poza scope albo failujące gate'y.\nSTATUSES: PASS / FAIL.\nSIDE EFFECTS: tylko zmiany w plikach z allowlisty.\nLOGS: komendy weryfikacyjne.\nTESTS: do uzupełnienia przed końcem taska.\nDONE: review ma konkretny wynik."],
    ["Failure modes", "Timeout: przerwać i pokazać ostatni bezpieczny stan.\nNull/missing data: nie zgadywać, użyć ESCALATION.\nInvalid schema: nie dotyczy, chyba że task dotyka danych.\nDuplicate request: sprawdzić idempotencję, jeśli task ma side effecty.\nConcurrent request: nie dotyczy, chyba że task dotyka runtime.\nPartial write: nie zostawiać pustego sukcesu.\nWorker crash: nie dotyczy, chyba że task dotyka workera.\nRetry loop: nie dodawać retry bez klasyfikacji błędów.\nProvider unavailable: nie dotyczy, chyba że task dotyka providera."],
    ["Guard Scope", "REQUIRED GUARDS:\n- trzymać się allowlisty.\n- uruchomić testy wskazane w tasku.\n\nNICE_TO_HAVE GUARDS:\n- pomysły poza zakresem zapisać do ParkingLot.md.\n\nOVERBUILD GUARDS:\n- nie tworzyć nowego subsystemu bez osobnego taska.\n\nParkingLot.md updated:\nNOT_NEEDED"],
    ["Runtime guards", "State machine: do uzupełnienia, jeśli dotyczy.\nError classification: do uzupełnienia, jeśli dotyczy.\nIdempotency: do uzupełnienia, jeśli dotyczy.\nSingle-flight: do uzupełnienia, jeśli dotyczy.\nWorker lock: do uzupełnienia, jeśli dotyczy.\nCircuit breaker: do uzupełnienia, jeśli dotyczy.\nBackpressure: do uzupełnienia, jeśli dotyczy.\nUI truth: do uzupełnienia, jeśli dotyczy.\nObservability: komendy weryfikacyjne jako dowód."],
    ["Code Structure Guard", "Czy dotykamy pliku >300 LOC?\nNIE\n\nJeśli TAK:\nPlik: brak\nLOC: brak\nDlaczego zmiana trafia tutaj: brak\nCzy plik ma wiele odpowiedzialności: brak\nMinimalny fix: brak\nCzy potrzebne wydzielenie odpowiedzialności: brak\nRyzyko: brak"],
    ["GOD_FILE_CHECK", "Wymagane, jeśli plik >500 LOC.\n\nPlik: brak\nLOC: brak\nObecne odpowiedzialności: brak\nCzy task dokłada nową odpowiedzialność: brak\nMinimalny fix bez rozbicia: brak\nMałe wydzielenie odpowiedzialności: brak\nRyzyko minimalnego fixu: brak\nRyzyko wydzielenia: brak\nRekomendacja: brak"],
    ["Dependency Direction Guard", "Czy zmiana odwraca zależność?\nNIE\n\nCzy Business Logic importuje UI/DB/framework?\nNIE\n\nCzy adapter przecieka do core?\nNIE"],
    ["Change Isolation", "Ile modułów dotyka zmiana: jeden wskazany obszar.\nCzy to naturalne: tak.\nCzy da się ograniczyć zmianę do jednego kontraktu: tak."],
    ["Plan", "- [ ] Przeczytać pliki z allowlisty.\n- [ ] Wykonać najmniejszą bezpieczną zmianę.\n- [ ] Uruchomić weryfikację."],
    ["Weryfikacja", "Komendy:\ndo uzupełnienia\nExpected result: PASS."],
    ["Definition of Done", "- [ ] test PASS\n- [ ] build PASS albo NOT_NEEDED z uzasadnieniem\n- [ ] brak ERROR w logach\n- [ ] zmiana nie wychodzi poza zakres\n- [ ] brak refaktoru przy okazji\n- [ ] failure modes obsłużone\n- [ ] brak silent fallbacków\n- [ ] brak empty success\n- [ ] UI truth zachowane, jeśli dotyczy\n- [ ] dependency direction zachowany\n- [ ] brak cyklicznych zależności\n- [ ] duże pliki nie zostały powiększone bez uzasadnienia\n- [ ] implementowano tylko REQUIRED GUARDS"],
    ["Review / Wyniki", `Co zmieniono: nie zakończono.\nJak sprawdzono: nie uruchomiono jeszcze.\nPASS / FAIL: ${t.review}\nRyzyka: brak finalnej weryfikacji.\nFollow-up: brak.`]
  ];
  return `# Current Task\n\nTask ID: ${t.id}\nTask Date: ${t.date}\nTask Status: ACTIVE\n\n${sections.map(s => `## ${s[0]}\n${s[1]}`).join("\n\n")}\n`;
}

function parse(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) out._.push(arg);
    else {
      const key = arg.slice(2);
      const next = argv[i + 1];
      out[key] = !next || next.startsWith("--") ? true : next;
      if (out[key] === next) i += 1;
    }
  }
  return out;
}

function list(v) { return v ? String(v).split(",").map(x => x.trim()).filter(Boolean) : []; }
function field(txt, name) { const m = txt.match(new RegExp(`^${name}:\\s*(.+?)\\s*$`, "m")); return m ? m[1].trim() : ""; }
function review(txt) { const m = txt.match(/PASS \/ FAIL:\s*(PASS|FAIL)\s*$/im); return m ? m[1] : ""; }
function read(file) { if (!fs.existsSync(file)) die("task", `Missing ${file}.`); return fs.readFileSync(file, "utf8"); }
function write(file, txt) { fs.mkdirSync(path.dirname(file), { recursive: true }); const tmp = `${file}.tmp-${process.pid}`; fs.writeFileSync(tmp, txt); fs.renameSync(tmp, file); }
function show(file) { const rel = path.relative(process.cwd(), path.resolve(file)); return rel.startsWith("..") ? file : rel; }
function today() { return new Date().toISOString().slice(0, 10); }
function slugify(v) { return String(v || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
function up(v) { return String(v || "").toUpperCase(); }
function uniq(v) { return Array.from(new Set(v.filter(Boolean))); }
function must(v, p, m) { if (!v) die(p, m); }
function oneOf(v, allowed, p, label) { if (!allowed.includes(v)) die(p, `Invalid ${label}: ${v}.`); }
function die(prefix, message) { console.error(`${prefix} FAIL - ${message}`); process.exit(1); }
