const messageArea = document.querySelector("#message-area");
const form = document.querySelector("#input-form");
const inputArea = document.querySelector("#input");

// Submit button
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  messageArea.innerHTML = "";

  const formData = new FormData(form);
  const input = formData.get("input");
  if (!input || input.length !== 9 || isNaN(Number(input))) {
    messageArea.style.color = "red";
    messageArea.append("Invalid input! Please make sure that you are entering 9 digits number without spaces.");
  } else {
      const digits = input.split('').map(Number);
      let sum = 0;

      for (let i = 0; i < digits.length; i++) {
        let digit = digits[i];

        if (i % 2 === 1) {
          digit *= 2;

          if (digit > 9) {
            digit = digit.toString().split('').map(Number).reduce((a, b) => a + b);
          }
        }
        sum += digit;
      }

      const isValid = sum % 10 === 0;

      if(isValid) {
        messageArea.style.color = "green";
        messageArea.append("SIN is VALID.");
      } else {
        messageArea.style.color = "orange";
        messageArea.append("SIN is INVALID.");
      };
    }
});

// Input text color change and remove message
inputArea.addEventListener("input", () => {
  messageArea.innerHTML = "";
  const data = inputArea.value;
  data.length === 9
    ? (inputArea.style.color = "blue")
    : (inputArea.style.color = "red");
});

// Clear message when input gains focus
inputArea.addEventListener("focus", () => {
  messageArea.innerHTML = "";
});
