document.addEventListener("DOMContentLoaded", function () {
    // Initializing calculator state
    let displayValue = "0";
    let firstOperand = null;
    let operator = null;
    let waitForSecondOperand = false;
    let lastClickedButton = null;

    const display = document.getElementById("display");

    // to update the display
    function updateDisplay() {
        display.textContent = displayValue;
    }

    // to handle number button clicks
    function inputDigit(digit) {
        if (waitForSecondOperand) {
            displayValue = digit;
            waitForSecondOperand = false;
        } else {
            displayValue = displayValue === "0" ? digit : displayValue + digit;
        }
        updateDisplay();
    }

    // to handle operator button clicks
    function inputOperator(nextOperator) {
        const inputValue = parseFloat(displayValue);

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator && lastClickedButton !== "operator") {
            const result = performCalculation();
            displayValue = String(result);
            firstOperand = result;
        }

        operator = nextOperator;
        waitForSecondOperand = true;
        lastClickedButton = "operator";
    }

    // to perform the calculation
    function performCalculation() {
        const inputValue = parseFloat(displayValue);

        switch (operator) {
            case "+":
                return firstOperand + inputValue;
            case "-":
                return firstOperand - inputValue;
            case "*":
                return firstOperand * inputValue;
            case "/":
                return firstOperand / inputValue;
            default:
                return inputValue;
        }
    }

    // Adding event listeners to number buttons
    const numberButtons = document.querySelectorAll(".button[id^='one'], .button[id^='two'], .button[id^='three'], .button[id^='four'], .button[id^='five'], .button[id^='six'], .button[id^='seven'], .button[id^='eight'], .button[id^='nine'], .button[id='zero'], .button[id='decimal']");
    numberButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.textContent === ".") {
                if (!displayValue.includes(".")) {
                    inputDigit(button.textContent);
                }
            } else {
                inputDigit(button.textContent);
            }
            lastClickedButton = "number";
        });
    });

    // Adding event listeners to operator buttons
    const operatorButtons = document.querySelectorAll(".button[id^='add'], .button[id^='subtract'], .button[id^='multiply'], .button[id^='divide']");
    operatorButtons.forEach(button => {
        button.addEventListener("click", () => {
            inputOperator(button.textContent);
            lastClickedButton = "operator";
        });
    });

    // Adding event listener for the equals button
    document.getElementById("equals").addEventListener("click", () => {
        if (operator && lastClickedButton !== "operator") {
            const result = performCalculation();
            displayValue = String(result);
            firstOperand = result;
            operator = null;
            waitForSecondOperand = true;
            lastClickedButton = "equals";
            updateDisplay();
        }
    });

    // Adding event listener for the clear button
  document.getElementById("clear").addEventListener("click", () => {
        displayValue = "0";
        firstOperand = null;
        operator = null;
        waitForSecondOperand = false;
        lastClickedButton = "clear";
        updateDisplay();
    });
});
