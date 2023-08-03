// Get all the required elements from the DOM
const display = document.querySelector(".display p");
const buttons = document.querySelectorAll(".pad button");

let currentInput = "";
let previousInput = "";
let operator = "";
let resultDisplayed = false;

// Add event listener to each button
buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

function handleClick(e) {
  const value = e.target.textContent;

  // Handle special cases
  if (value === "CL") {
    clearDisplay();
  } else if (value === "DEL") {
    deleteLastInput();
  } else if (value === "=" && currentInput !== "") {
    performCalculation();
  } else if ("+-*/%".includes(value)) {
    handleOperator(value);
  } else {
    appendInput(value);
  }
}

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = "";
  resultDisplayed = false;
  updateDisplay();
}

function deleteLastInput() {
  if (!resultDisplayed) {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  }
}

function appendInput(value) {
  if (resultDisplayed) {
    clearDisplay();
  }
  currentInput += value;
  updateDisplay();
}

function handleOperator(value) {
  if (!resultDisplayed) {
    if (currentInput !== "") {
      if (previousInput !== "") {
        performCalculation();
      } else {
        previousInput = currentInput;
      }
      operator = value;
      currentInput = "";
      updateDisplay();
    } else if (previousInput !== "") {
      operator = value;
      updateDisplay();
    }
  }
}

function performCalculation() {
  if (operator && previousInput && currentInput) {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result;

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      case "%":
        result = (num1 * num2) / 100;
        break;
      default:
        return;
    }

    currentInput = result.toString();
    previousInput = "";
    operator = "";
    resultDisplayed = true;
    updateDisplay();
  }
}

function updateDisplay() {
  display.textContent = currentInput || "0";
}
