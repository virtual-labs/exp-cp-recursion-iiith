const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const runButton = document.getElementById('run');
const resetButton = document.getElementById('reset');

const stackElement = document.getElementById('container-stack');
const resultElement = document.getElementById('result');

const basecaseOperatorSelect = document.getElementById('basecase_operator');
const basecaseSelect = document.getElementById('basecase');
const basecaseReturnSelect = document.getElementById('basecase_return');
const recursecaseSelect = document.getElementById('recursecase');
const variableSelect = document.getElementById('variable');
const operatorSelect = document.getElementById('operator');

let maxStackDepth = 5;
let stackHTML = '';
let resultContent = '';
let stepstoexecute = -1;
let executedsteps = 0;

let basecaseOperator = changeOperator(basecaseOperatorSelect.value);
let basecase = parseInt(basecaseSelect.value);
let basecaseReturn = parseInt(basecaseReturnSelect.value);
let recursecase = recursecaseSelect.value;
let variable = variableSelect.value;
let operator = operatorSelect.value;

basecaseOperatorSelect.addEventListener('change', function () {
    basecaseOperator = changeOperator(basecaseOperatorSelect.value);
    reset();
});
basecaseSelect.addEventListener('change', function () {
    basecase = parseInt(basecaseSelect.value);
    reset();
});
basecaseReturnSelect.addEventListener('change', function () {
    basecaseReturn = parseInt(basecaseReturnSelect.value);
    reset();
});
recursecaseSelect.addEventListener('change', function () {
    recursecase = recursecaseSelect.value;
    reset();
});
variableSelect.addEventListener('change', function () {
    variable = variableSelect.value;
    reset();
});
operatorSelect.addEventListener('change', function () {
    operator = operatorSelect.value;
    reset();
});

function step() {
    executedsteps++;
    if (stepstoexecute != -1 && executedsteps > stepstoexecute)
        return false;
    return true;
}

function changeOperator(operator) {
    switch (operator) {
        case 'eq':
            return '==';
        case 'neq':
            return '!=';
        case 'lt':
            return '<';
        case 'le':
            return '<=';
        case 'gt':
            return '>';
        case 'ge':
            return '>=';
        default:
            return '';
    }
}

function reset() {
    stackElement.innerHTML = '';
    stackElement.style.color = 'black';
    stackHTML = '';

    resultContent = '';
    resultElement.style.color = 'black';
    resultElement.textContent = ' ';

    runButton.disabled = false;
    nextButton.disabled = false;
    prevButton.disabled = true;

    stepstoexecute = -1;
    executedsteps = 0;
}

function factorial(n) {
    if (n === 0 || n === 1)
        return 1;
    else
        return n * factorial(n - 1);
}

function step_factorial(n, stackDepth) {
    newHTML = `<div class="stack">
        stackDepth: ${stackDepth}<br>
        n: ${eval(n)}<br>
        </div>\n`;
    stackHTML = newHTML + stackHTML;

    resultContent = `n: ${eval(n)} | subsol: undefined | sol: undefined`;
    resultElement.textContent = resultContent;

    if (stackDepth > maxStackDepth) {
        resultElement.style.color = 'red';
        resultElement.textContent = 'Stack Overflow';

        stackElement.style.color = 'red';
        stackElement.innerHTML = stackHTML;

        return 'Stack Overflow';
    }
    resultElement.style.color = 'black';

    if (!step()) {
        return stackHTML;
    }

    if (eval(`n ${basecaseOperator} ${basecase}`)) {
        stackHTML = stackHTML.replace(newHTML, '');
        return basecaseReturn;
    } else {
        const subsol = step_factorial(eval(recursecase), stackDepth + 1);

        if (subsol === 'Stack Overflow') {
            return 'Stack Overflow';
        }
        if (subsol.toString().startsWith('<')) {
            return subsol;
        }

        resultContent = `n: ${eval(n)} | subsol: ${subsol} | sol: undefined`;
        resultElement.textContent = resultContent;

        if (!step()) {
            return stackHTML;
        }

        const sol = eval(`${eval(variable)} ${operator} ${subsol}`);

        resultContent = `n: ${eval(n)} | subsol: ${subsol} | sol: ${sol}`;
        resultElement.textContent = resultContent;

        if (!step()) {
            return stackHTML;
        }

        stackHTML = stackHTML.substring(newHTML.length);
        stackElement.innerHTML = stackHTML;

        return sol;
    }
}

function check_result(result) {
    if (result === factorial(maxStackDepth)) {
        resultElement.style.color = 'green';
        resultElement.textContent = "Correct Answer: " + result.toString();
    }
    else {
        resultElement.style.color = 'red';
        resultElement.textContent = 'Wrong Answer: ' + result.toString();
    }

}

resetButton.addEventListener('click', reset);

document.getElementById('n').addEventListener('change', function () {
    maxStackDepth = parseInt(document.getElementById('n').value);
    stackText = document.getElementById('stack-depth');
    stackText.textContent = maxStackDepth;
    reset();
});

document.getElementById('lang-selector').addEventListener('change', function () {
    var selectedLanguage = document.getElementById('lang-selector').value;
    var containerPy = document.getElementById('container-py');
    var containerJs = document.getElementById('container-js');
    var containerC = document.getElementById('container-c');

    if (selectedLanguage === 'PY') {
        containerPy.style.display = 'block';
        containerJs.style.display = 'none';
        containerC.style.display = 'none';
    } else if (selectedLanguage === 'JS') {
        containerPy.style.display = 'none';
        containerJs.style.display = 'block';
        containerC.style.display = 'none';
    } else if (selectedLanguage === 'C') {
        containerPy.style.display = 'none';
        containerJs.style.display = 'none';
        containerC.style.display = 'block';
    } else {
        containerPy.style.display = 'none';
        containerJs.style.display = 'none';
        containerC.style.display = 'none';
    }

    resetButton.disabled = false;
    reset();
});

runButton.addEventListener('click', function () {
    stackElement.innerHTML = '';
    stackHTML = '';
    stepstoexecute = -1;

    let result = step_factorial(maxStackDepth, 1);
    check_result(result);

    runButton.disabled = true;
    nextButton.disabled = true;
    prevButton.disabled = true;
});

nextButton.addEventListener('click', function () {
    if (typeof stackHTML === 'number') {
        return;
    }
    if (stackHTML === 'Stack Overflow') {
        nextButton.disabled = true;
        prevButton.disabled = true;
        return;
    }
    stepstoexecute++;
    executedsteps = 0;

    stackHTML = '';

    stackHTML = step_factorial(maxStackDepth, 1);

    if (typeof stackHTML === 'number') {
        nextButton.disabled = true;
        prevButton.disabled = true;
        runButton.disabled = true;

        check_result(stackHTML);
        stackElement.innerHTML = '';
        return;
    }

    if (stackHTML === 'Stack Overflow') {
        stackElement.style.color = 'red';
        nextButton.disabled = true;
        runButton.disabled = true;
        return;
    }
    stackElement.innerHTML = stackHTML;
    prevButton.disabled = false;
});

prevButton.addEventListener('click', function () {
    if (stepstoexecute <= 0) {
        stackHTML = '';
        resultContent = '';
        resultElement.innerHTML = ' ';
        stepstoexecute = -1;
        prevButton.disabled = true;
    }
    else {
        stepstoexecute--;
        executedsteps = 0;

        stackHTML = '';

        stackHTML = step_factorial(maxStackDepth, 1);
        if (stackHTML === 'Stack Overflow') {
            stackElement.style.color = 'red';
            return;
        }
        else {
            stackElement.style.color = 'black';
        }
    }
    stackElement.innerHTML = stackHTML;
    nextButton.disabled = false;
    runButton.disabled = false;
});
