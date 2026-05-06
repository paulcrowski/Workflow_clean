const fs = require("fs");

const file = "tasks/todo.md";

if (!fs.existsSync(file)) {
  console.error("Missing tasks/todo.md");
  process.exit(1);
}

const txt = fs.readFileSync(file, "utf8");

const required = [
  "## Tryb pracy",
  "## Cel / Outcome",
  "## Kryteria sukcesu",
  "## Kontekst dla agenta",
  "## Zakres",
  "## Reprodukcja / dowód problemu",
  "## Escalation",
  "## Klasyfikacja",
  "## Diagnoza",
  "## Granice",
  "## Kontrakt",
  "## Failure modes",
  "## Guard Scope",
  "## Plan",
  "## Weryfikacja",
  "## Definition of Done",
  "## Review / Wyniki"
];

const missing = required.filter(x => !txt.includes(x));

if (missing.length) {
  console.error("tasks/todo.md missing sections:", missing.join(", "));
  process.exit(1);
}

if (!/PASS|FAIL|Nie uruchomiono testów/i.test(txt)) {
  console.error("tasks/todo.md must include verification result: PASS / FAIL / Nie uruchomiono testów");
  process.exit(1);
}

const hasOverbuildClassification = /## Klasyfikacja[\s\S]*OVERBUILD[\s\S]*Uzasadnienie:/i.test(txt);
const hasOverbuildGuards = /## Guard Scope[\s\S]*OVERBUILD GUARDS:/i.test(txt);
const parkingLotStatus = txt.match(/ParkingLot\.md updated:\s*(YES|NO|NOT_NEEDED)/i);

if ((hasOverbuildClassification || hasOverbuildGuards) && !parkingLotStatus) {
  console.error("OVERBUILD requires explicit 'ParkingLot.md updated: YES / NO / NOT_NEEDED'.");
  process.exit(1);
}

if (hasOverbuildClassification && /ParkingLot\.md updated:\s*NO/i.test(txt)) {
  console.error("Task classified as OVERBUILD cannot proceed unless moved to ParkingLot.md or marked NOT_NEEDED with justification.");
  process.exit(1);
}

console.log("check:task PASS");
