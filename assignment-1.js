const textarea = document.getElementById("number");
const toggleBtn = document.getElementById("toggle");
const tooltipText = document.getElementById("tooltiptext");
const prefixInput = document.getElementById("prefixInput");
const applyPrefixBtn = document.getElementById("applyprefix");
const removePrefixBtn = document.getElementById("removeprefix");
const numberCountSpan = document.getElementById("numberCount");

let isCommaFormat = true;
let currentPrefix = "";

// Allow only digits, commas, and newlines while typing
textarea.addEventListener("input", function () {
  textarea.value = textarea.value.replace(/[^\d,\n]/g, "");
  updateCount();
});

// Update number count
function updateCount() {
  let values = textarea.value.split(/[\n,]+/).map(x => x.trim()).filter(x => x !== "");
  let validCount = 0;
  for (let i = 0; i < values.length; i++) {
    let number = currentPrefix ? values[i].replace(currentPrefix, "") : values[i];
    if (/^\d+$/.test(number)) {
      validCount++;
    }
  }
  numberCountSpan.textContent = validCount;
}

// Toggle between comma and newline format
toggleBtn.addEventListener("click", function () {
  let values = textarea.value.split(/[\n,]+/).map(x => x.trim()).filter(x => x !== "");
  let invalids = [];

  for (let i = 0; i < values.length; i++) {
    let number = currentPrefix ? values[i].replace(currentPrefix, "") : values[i];
    if (!/^\d+$/.test(number)) {
      invalids.push(values[i]);
    }
  }

  if (invalids.length > 0) {
    alert("Invalid number(s):\n" + invalids.join("\n"));
    return;
  }

  if (isCommaFormat) {
    textarea.value = values.join("\n");
    tooltipText.textContent = "Switch to Comma Format";
  } else {
    textarea.value = values.join(", ");
    tooltipText.textContent = "Switch to New Line Format";
  }

  isCommaFormat = !isCommaFormat;
  updateCount();
});

// Apply prefix
applyPrefixBtn.addEventListener("click", function () {
  let prefix = prefixInput.value.trim();
  if (prefix === "") {
    alert("Enter a prefix like +91");
    return;
  }

  let values = textarea.value.split(/[\n,]+/).map(x => x.trim()).filter(x => x !== "");
  let valid = [];
  let invalids = [];

  for (let i = 0; i < values.length; i++) {
    let num = values[i];
    let testNum = currentPrefix ? num.replace(currentPrefix, "") : num;
    if (/^\d+$/.test(testNum)) {
      if (!num.startsWith(prefix)) {
        num = prefix + testNum;
      }
      valid.push(num);
    } else {
      invalids.push(num);
    }
  }

  if (invalids.length > 0) {
    alert("Invalid number(s):\n" + invalids.join("\n"));
    return;
  }

  textarea.value = isCommaFormat ? valid.join(", ") : valid.join("\n");
  currentPrefix = prefix;
  removePrefixBtn.disabled = false;
  updateCount();
});

// Remove prefix
removePrefixBtn.addEventListener("click", function () {
  if (!currentPrefix) return;

  let values = textarea.value.split(/[\n,]+/).map(x => x.trim()).filter(x => x !== "");
  for (let i = 0; i < values.length; i++) {
    if (values[i].startsWith(currentPrefix)) {
      values[i] = values[i].slice(currentPrefix.length);
    }
  }

  textarea.value = isCommaFormat ? values.join(", ") : values.join("\n");
  currentPrefix = "";
  removePrefixBtn.disabled = true;
  updateCount();
});
