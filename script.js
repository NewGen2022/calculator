let resultOutput = document.getElementById('output');
let currentInput = '';
let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let result = 0;

const buttons = document.querySelectorAll('button');
const maxCurrentInputLength = 18;
const history = document.getElementById('history')
const allHistory = document.getElementById('all-history')
const MAX_HISTORY_ENTRIES = 9;

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        handleButtonClick(e.target.textContent);
    });
});

function handleButtonClick(value) {
    if ((isNumeric(value) || (value === '.' && !currentInput.includes('.')))) {
        currentInput += value;
    } else if (value === 'Clear') {
        clearCalculator();
    } else if (value === 'Delete') {
        currentInput = currentInput.slice(0, -1);
    } else if (currentOperator) {
        handleOperation(value);
    } else {
        firstOperand = result !== 0 ? result.toString() : currentInput;
        currentInput = '';
        currentOperator = value;
        updateResultOutput();
    }

    updateHistory()
    updateResultOutput();
}

function updateHistory() {
    if (currentOperator) {
        history.textContent = `${firstOperand} ${currentOperator} ${currentInput}`;
    } else {
        history.textContent = '';
    }
}

function updateAllHistory() {
    const entryHeight = 40;

    if (allHistory.clientHeight + entryHeight > 550) {
        const remainingSpace = 550 - entryHeight;

        while (allHistory.clientHeight > remainingSpace) {
            allHistory.removeChild(allHistory.children[1]);
        }
    }

    allHistory.innerHTML += `<p>${firstOperand} ${currentOperator} ${secondOperand} = ${result}</p>`;
}


function updateResultOutput() {
    resultOutput.textContent = currentInput !== '' ? currentInput : result;
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
    let num1 = parseFloat(firstOperand);
    let num2 = parseFloat(secondOperand);

    switch (currentOperator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 !== 0) {
                result = num1 / num2;
            } else {
                alert("Cannot divide by zero!");
                clearCalculator();
                return;
            }
            break;
        case '%':
            result = num1 % num2;
            break;
        default:
            break;
    }

    // console.log(result, currentInput, firstOperand, secondOperand, currentOperator);
    
    updateHistory()
    updateAllHistory()

    currentInput = result.toString();
    currentOperator = null;
    firstOperand = currentInput

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
