const maxStackDepth = 5;

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
}
document.getElementById('lang-selector').addEventListener('change', toggleCodeLanguage);

function reset() {
    document.getElementById('lang-selector').value = '';
    document.getElementById('result').textContent = '';
    toggleCodeLanguage();
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

document.addEventListener('DOMContentLoaded', function () {
    const runButton = document.getElementById('run');
    runButton.addEventListener('click', calculateFactorial);

    function calculateFactorial() {
        const basecaseOperatorSelect = document.getElementById('basecase_operator');
        const basecaseSelect = document.getElementById('basecase');
        const basecaseReturnSelect = document.getElementById('basecase_return');
        const recursecaseSelect = document.getElementById('recursecase');
        const variableSelect = document.getElementById('variable');
        const operatorSelect = document.getElementById('operator');

        const resultElement = document.getElementById('result');

        const basecaseOperator = changeOperator(basecaseOperatorSelect.value);
        const basecase = parseInt(basecaseSelect.value);
        const basecaseReturn = parseInt(basecaseReturnSelect.value);
        const recursecase = recursecaseSelect.value;
        const variable = variableSelect.value;
        const operator = operatorSelect.value;

        let result = factorial(5, basecaseOperator, basecase, basecaseReturn, recursecase, variable, operator, 1);
        resultElement.textContent = "Final Result" + result.toString();
    }

    function factorial(n, basecaseOperator, basecase, basecaseReturn, recursecase, variable, operator, stackDepth) {
        if (stackDepth > maxStackDepth) {
            return 'Stack Overflow';
        }
        if (eval(`n ${basecaseOperator} ${basecase}`)) {
            return basecaseReturn;
        } else {
            const subsol = factorial(eval(recursecase), basecaseOperator, basecase, basecaseReturn, recursecase, variable, operator, stackDepth + 1);
            if (subsol === 'Stack Overflow') {
                return 'Stack Overflow';
            }
            const sol = eval(`${eval(variable)} ${operator} ${subsol}`);
            return sol;
        }
    }
});
