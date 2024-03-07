let resultOutput = document.getElementById('output');
let currentInput = '';
let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let result = 0;

const buttons = document.querySelectorAll('button');
const history = document.getElementById('history');
const allHistory = document.getElementById('all-history');
const signs = ['+', '-', '*', '/', '%', 'Enter', 'Backspace']

buttons.forEach((button) => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});

function handleButtonClick(value) {
    if (isNumeric(value) || (value === '.' && !currentInput.includes('.'))) {
        currentInput += value;
    } else if (value === 'Clear') {
        clearCalculator();
    } else if (value === 'Delete' || value === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
    } else if (currentOperator) {
        handleOperation(value);
    } else {
        firstOperand = result !== 0 ? result.toString() : currentInput;
        currentInput = '';
        currentOperator = value;
        updateResultOutput();
    }

    updateHistory();
    updateResultOutput();
}

function updateHistory() {
    const displayOperator = (currentOperator === 'Enter') ? '=' : currentOperator;
    history.textContent = currentOperator ? `${firstOperand} ${displayOperator} ${currentInput}` : '';
}

function updateAllHistory() {
    const entryHeight = 40;

    if (allHistory.clientHeight + entryHeight > 550) {
        const remainingSpace = 550 - entryHeight;
        while (allHistory.clientHeight > remainingSpace) {
            allHistory.removeChild(allHistory.children[1]);
        }
    }

    const displayOperator = (currentOperator === 'Enter') ? '=' : currentOperator;
    allHistory.innerHTML += `<p>${firstOperand} ${displayOperator} ${secondOperand} = ${result}</p>`;
}


function updateResultOutput() {
    resultOutput.textContent = currentInput || result;
}

function isNumeric(value) {
    return !isNaN(value);
}

function handleOperation(operator) {
    if (currentInput !== '') {
        secondOperand = currentInput;
        calculateResult();
        currentOperator = operator;
        updateResultOutput();
        currentInput = '';
        history.textContent = `${result} ${currentOperator}`;
    } else {
        currentOperator = operator;
    }

}

function calculateResult() {
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);

    switch (currentOperator) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num2 !== 0 ? num1 / num2 : (alert("Cannot divide by zero!"), clearCalculator()); break;
        case '%': result = num1 % num2; break;
        case '=':
        case 'Enter': result = num1; break;
        default: break;
    }

    // console.log(result, currentInput, firstOperand, secondOperand, currentOperator);

    updateHistory();
    updateAllHistory();

    currentInput = Number(result.toFixed(7));
    currentOperator = null;
    firstOperand = currentInput;

    // console.log(result, currentInput, firstOperand, secondOperand, currentOperator);
}

function clearCalculator() {
    currentInput = '';
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
    result = 0;
    updateResultOutput();
    history.textContent = '';
}

document.addEventListener('keydown', function(event) {
    const pressedKey = event.key;

    handleKeyboardKey(pressedKey)

    console.log('Key pressed: ' + pressedKey);
});

function handleKeyboardKey(value){
    if (signs.includes(value) || isNumeric(value)){
        handleButtonClick(value)
    }
}