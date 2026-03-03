const historyLines = [];
const HISTORY_LIMIT = 5;

function whenButtonClicked() {
  clearErrors();

  const a = getNumberOrShowError("value1", "err1");
  const b = getNumberOrShowError("value2", "err2");
  const op = document.getElementById("operation").value;

  if (a === null || b === null) return;

  if (op === "/" && b === 0) {
    showError("value2", "err2", "Деление на 0!");
    return;
  }

  const result = calculate(a, b, op);
  const line = `${format(a)} ${op} ${format(b)} = ${format(result)}`;

  addToHistory(line);
  renderHistory();
}

function getNumberOrShowError(inputId, errorId) {
  const text = document.getElementById(inputId).value.trim().replace(",", ".");
  const num = Number(text);

  if (text === "" || Number.isNaN(num)) {
    showError(inputId, errorId, "Введите число");
    return null;
  }
  return num;
}

function calculate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;

    case "-":
      return a - b;

    case "*":
      return a * b;

    case "/":
      return a / b;

    default:
      return NaN;
  }
}

function format(n) {
  return Number.isInteger(n) ? String(n) : String(Number(n.toFixed(4)));
}

function addToHistory(line) {
  historyLines.push(line);
  while (historyLines.length > HISTORY_LIMIT) historyLines.shift();
}

function renderHistory() {
  const results = document.getElementById("results");

  if (historyLines.length === 0) {
    results.textContent = "Результат";
    return;
  }

  results.innerHTML = "";

  historyLines.forEach((line, i) => {
    const row = document.createElement("div");
    row.textContent = line;

    const age = historyLines.length - 1 - i;
    row.style.opacity = age === 0 ? "1" : String(Math.max(0.25, 0.85 - age * 0.15));

    results.appendChild(row);
  });
}

function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);

  if (input) input.classList.add("input-error");
  if (error) error.textContent = message;
}

function clearErrors() {
  removeError("value1", "err1");
  removeError("value2", "err2");
}

function removeError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);

  if (input) input.classList.remove("input-error");
  if (error) error.textContent = "";
}