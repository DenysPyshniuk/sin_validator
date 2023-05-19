const url = "http://localhost:3001/validate-input";
const messageArea = document.querySelector("#message-area");
const form = document.querySelector("#input-form");
const inputArea = document.querySelector("#input");

// Submit button
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  messageArea.innerHTML = "";

  const formData = new FormData(form);
  const input = formData.get("input");
  const data = { input };
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (result.message && result.status === "200") {
    messageArea.style.color = "green";
    messageArea.append(result.message);
  } else if (result.message && result.status === "400") {
    messageArea.style.color = "orange";
    messageArea.append(result.message);
  } else {
    messageArea.style.color = "red";
    messageArea.append(result.error);
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
