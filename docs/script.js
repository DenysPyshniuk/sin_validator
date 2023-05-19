const messageArea = document.querySelector("#message-area");
const form = document.querySelector("#input-form");
const inputArea = document.querySelector("#input");

// Input text color change and remove message
inputArea.addEventListener("input", () => {
  resetMessageArea();
  const data = inputArea.value;
  inputArea.style.color = data.length === 9 ? "blue" : "red";
});

// Clear message when input gains focus
inputArea.addEventListener("focus", () => {
  resetMessageArea();
});

// Submit button
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  resetMessageArea();

  const formData = new FormData(form);
  const input = formData.get("input");
  if (!isValidInput(input)) {
    showMessage(
      "Invalid input! Please make sure that you are entering a 9-digit number without spaces.",
      "red"
    );
  } else {
    const isValid = isValidSIN(input);

    showMessage(
      isValid ? "SIN is VALID." : "SIN is INVALID.",
      isValid ? "green" : "orange"
    );
  }
});

//Helper Functions
function isValidInput(input) {
  return input && input.length === 9 && /^\d+$/.test(input);
}

function isValidSIN(sin) {
  const digits = sin.split("").map(Number);
    let sum = 0;

    for (let i = 0; i < digits.length; i++) {
      let digit = digits[i];

      if (i % 2 === 1) {
        digit *= 2;

        if (digit > 9) {
          digit = digit
            .toString()
            .split("")
            .map(Number)
            .reduce((a, b) => a + b);
        }
      }
      digits[i] = digit;
      sum += digit;
    }
    return sum % 10 === 0;
}

function showMessage(message, color) {
  messageArea.style.color = color;
  messageArea.append(message);
}

function resetMessageArea() {
  messageArea.innerHTML = "";
}
