let maxStackDepth = 5;

function changeMaxStackDepth() {
    maxStackDepth = parseInt(document.getElementById('n').value);
    stackText = document.getElementById('stack-depth');
    stackText.textContent = maxStackDepth;
}
document.getElementById('n').addEventListener('change', changeMaxStackDepth);

function toggleCodeLanguage() {
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

    const runButton = document.getElementById('run');
    runButton.disabled = false;
}
document.getElementById('lang-selector').addEventListener('change', toggleCodeLanguage);

function reset() {
    document.getElementById('result').textContent = '';
    let stackElement = document.getElementById('container-stack');
    stackElement.innerHTML = '';
    stackHTML = '';
    const runButton = document.getElementById('run');
    runButton.disabled = false;
}
document.getElementById('reset').addEventListener('click', reset);

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

let stackHTML = '';
const basecaseOperatorSelect = document.getElementById('basecase_operator');
const basecaseSelect = document.getElementById('basecase');
const basecaseReturnSelect = document.getElementById('basecase_return');
const recursecaseSelect = document.getElementById('recursecase');
const variableSelect = document.getElementById('variable');
const operatorSelect = document.getElementById('operator');
const resultElement = document.getElementById('result');
const stackElement = document.getElementById('container-stack');

let basecaseOperator = changeOperator(basecaseOperatorSelect.value);
let basecase = parseInt(basecaseSelect.value);
let basecaseReturn = parseInt(basecaseReturnSelect.value);
let recursecase = recursecaseSelect.value;
let variable = variableSelect.value;
let operator = operatorSelect.value;

basecaseOperatorSelect.addEventListener('change', function () {
    basecaseOperator = changeOperator(basecaseOperatorSelect.value);
});
basecaseSelect.addEventListener('change', function () {
    basecase = parseInt(basecaseSelect.value);
});
basecaseReturnSelect.addEventListener('change', function () {
    basecaseReturn = parseInt(basecaseReturnSelect.value);
});
recursecaseSelect.addEventListener('change', function () {
    recursecase = recursecaseSelect.value;
});
variableSelect.addEventListener('change', function () {
    variable = variableSelect.value;
});
operatorSelect.addEventListener('change', function () {
    operator = operatorSelect.value;
});

const runButton = document.getElementById('run');
runButton.addEventListener('click', calculateFactorial);

function calculateFactorial() {
    stackElement.innerHTML = '';
    stackHTML = '';

    let result = factorial(maxStackDepth, 1);
    resultElement.textContent = "Final Result: " + result.toString();

    runButton.disabled = true;
}

function factorial(n, stackDepth) {
    newHTML = `<div class="stack">
        stackDepth: ${stackDepth}<br>
        n: ${eval(n)}<br>
        </div>`;
    stackHTML = newHTML + stackHTML;
    stackElement.innerHTML = stackHTML;

    if (stackDepth > maxStackDepth) {
        return 'Stack Overflow';
    }
    if (eval(`n ${basecaseOperator} ${basecase}`)) {
        stackHTML = stackHTML.replace(newHTML, '');
        return basecaseReturn;
    } else {
        const subsol = factorial(eval(recursecase), stackDepth + 1);
        if (subsol === 'Stack Overflow') {
            return 'Stack Overflow';
        }
        const sol = eval(`${eval(variable)} ${operator} ${subsol}`);
        stackHTML = stackHTML.substring(newHTML.length);
        stackElement.innerHTML = stackHTML;
        return sol;
    }
}
