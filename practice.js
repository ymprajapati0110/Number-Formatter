const textarea = document.getElementById("number");
const toggleBtn = document.getElementById("toggle");
const toggleTooltip = document.getElementById("tooltiptext");
const prefixInput = document.getElementById("prefixInput");
const applyPrefixBtn = document.getElementById("applyprefix");
const removePrefixBtn = document.getElementById("removeprefix");
const numberCountSpan = document.getElementById("numberCount");

let isCommaSeparated = true;
let currentPrefix = "";

function getAllValues() {
    let raw = textarea.value.trim();
    if (!raw) return [];

    return raw
        .split(/[\n,]+/)
        .map(v => v.trim())
        .filter(v => v !== "");
}

function getValidValues(dataArray) {
    const onlyDigits = /^[0-9]+$/;
    return dataArray.filter(num => {
        const clean = currentPrefix ? num.replace(currentPrefix, "") : num;
        return onlyDigits.test(clean);
    });
}

function getInvalidValues(dataArray) {
    const onlyDigits = /^[0-9]+$/;
    return dataArray.filter(num => {
        const clean = currentPrefix ? num.replace(currentPrefix, "") : num;
        return !onlyDigits.test(clean);
    });
}

function updateNumberCount() {
    const values = getAllValues();
    const valid = getValidValues(values);
    numberCountSpan.textContent = valid.length;
}

toggleBtn.addEventListener("click", () => {
    const allValues = getAllValues();
    if (allValues.length === 0) return;

    const invalids = getInvalidValues(allValues);
    if (invalids.length > 0) {
        const message =
            invalids.length === 1
                ? "Invalid number founded:\n" + invalids[0]
                : "Invalid numbers founded:\n" + invalids.join("\n");
        alert(message);
        return;
    }

    const valid = getValidValues(allValues);

    if (isCommaSeparated) {
        textarea.value = valid.join("\n");
        toggleTooltip.textContent = "Switch to Comma Format";
    } else {
        textarea.value = valid.join(", ");
        toggleTooltip.textContent = "Switch to New Line Format";
    }

    isCommaSeparated = !isCommaSeparated;
    updateNumberCount();
});

applyPrefixBtn.addEventListener("click", () => {
    const prefix = prefixInput.value.replace(/^\s+/, "");

    if (!prefix) {
        alert("Please enter a prefix like +91 or +91 ");
        return;
    }

    const allValues = getAllValues();
    const invalids = getInvalidValues(allValues);

    if (invalids.length > 0) {
        const message =
            invalids.length === 1
                ? "Invalid number is:\n" + invalids[0]
                : "Invalid numbers are:\n" + invalids.join("\n");
        alert(message);
        return;
    }

    const valid = getValidValues(allValues);
    const updated = valid.map(val =>
        val.startsWith(prefix) ? val : prefix + val
    );

    textarea.value = isCommaSeparated ? updated.join(", ") : updated.join("\n");

    currentPrefix = prefix;
    removePrefixBtn.disabled = false;
    updateNumberCount();
});



removePrefixBtn.addEventListener("click", () => {
    if (!currentPrefix) return;

    let values = getAllValues();

    values = values.map(val =>
        val.startsWith(currentPrefix) ? val.slice(currentPrefix.length) : val
    );

    textarea.value = isCommaSeparated ? values.join(", ") : values.join("\n");

    currentPrefix = "";
    removePrefixBtn.disabled = true;
    updateNumberCount();
});

textarea.addEventListener("input", updateNumberCount);


