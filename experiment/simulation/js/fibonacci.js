const languages = ['py', 'js', 'c'];

import { step } from './main.js';

const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const runButton = document.getElementById('run');
const resetButton = document.getElementById('reset');

const stackElement = document.getElementById('container-stack');
const stackText = document.getElementById('stack-depth');
const resultElement = document.getElementById('result');

let basecaseOperatorSelect = document.getElementById(`basecase-operator-${languages[0]}`);
let basecaseSelect = document.getElementById(`basecase-${languages[0]}`);
let basecaseReturnSelect = document.getElementById(`basecase-return-${languages[0]}`);
let recursecase1Select = document.getElementById(`recursecase1-${languages[0]}`);
let recursecase2Select = document.getElementById(`recursecase2-${languages[0]}`);
let operatorSelect = document.getElementById(`operator-${languages[0]}`);
let nSelect = document.getElementById(`n-${languages[0]}`);

let stackHTML = '';
let resultContent = '';
let stepstoexecute = { value: -1 };
let executedsteps = { value: 0 };

let maxStackDepth = parseInt(nSelect.value) + 1;
stackText.textContent = maxStackDepth;

let basecaseOperator = changeOperator(basecaseOperatorSelect.value);
let basecase = parseInt(basecaseSelect.value);
let basecaseReturn = basecaseReturnSelect.value;
let recursecase1 = recursecase1Select.value;
let recursecase2 = recursecase2Select.value;
let operator = operatorSelect.value;

languages.forEach(language => {
    let basecaseOperatorSelect = document.getElementById(`basecase-operator-${language}`);
    basecaseOperatorSelect.addEventListener('change', function () {
        basecaseOperator = changeOperator(basecaseOperatorSelect.value);
        reset();

        languages.forEach(language1 => {
            document.getElementById(`basecase-operator-${language1}`).value = basecaseOperatorSelect.value;
        })
    })
    
    let basecaseSelect = document.getElementById(`basecase-${language}`);
    basecaseSelect.addEventListener('change', function () {
        basecase = parseInt(basecaseSelect.value);
        reset();

        languages.forEach(language1 => {
            document.getElementById(`basecase-${language1}`).value = basecaseSelect.value;
        })
    })
    
    let basecaseReturnSelect = document.getElementById(`basecase-return-${language}`);
    basecaseReturnSelect.addEventListener('change', function () {
        basecaseReturn = parseInt(basecaseReturnSelect.value);
        reset();

        languages.forEach(language1 => {
            document.getElementById(`basecase-return-${language1}`).value = basecaseReturnSelect.value;
        })
    })
    
    let recursecase1Select = document.getElementById(`recursecase1-${language}`);
    recursecase1Select.addEventListener('change', function () {
        recursecase1 = recursecase1Select.value;
        reset();

        languages.forEach(language1 => {
            document.getElementById(`recursecase1-${language1}`).value = recursecase1Select.value;
        })
    })
    
    let recursecase2Select = document.getElementById(`recursecase2-${language}`);
    recursecase2Select.addEventListener('change', function () {
        recursecase1 = recursecase2Select.value;
        reset();

        languages.forEach(language1 => {
            document.getElementById(`recursecase2-${language1}`).value = recursecase2Select.value;
        })
    })
    
    let operatorSelect = document.getElementById(`operator-${language}`);
    operatorSelect.addEventListener('change', function () {
        operator = operatorSelect.value;
        reset();

        languages.forEach(language1 => {
            document.getElementById(`operator-${language1}`).value = operatorSelect.value;
        })
    })
    
    let nSelect = document.getElementById(`n-${language}`);
    nSelect.addEventListener('change', function () {
        maxStackDepth = parseInt(nSelect.value);
        stackText.textContent = maxStackDepth;
        reset();

        languages.forEach(language1 => {
            document.getElementById(`n-${language1}`).value = nSelect.value;
        })
    })
});

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

    stepstoexecute.value = -1;
    executedsteps.value = 0;
}

function fibonnaci(n) {
    if (n <= 1)
        return n;
    else
        return fibonnaci(n - 1) + fibonnaci(n - 2);
}

function step_fibonacci(n, stackDepth) {
    let newHTML = `<div class="stack">
        stackDepth: ${stackDepth} | n: ${eval(n)}<br>
        </div>\n`;
    stackHTML = newHTML + stackHTML;

    resultContent = `n: ${eval(n)} | subsol1: undefined | subsol2: undefined | sol: undefined`;
    resultElement.textContent = resultContent;

    if (stackDepth > maxStackDepth) {
        resultElement.style.color = 'red';
        resultElement.textContent = 'Stack Overflow';

        stackElement.style.color = 'red';
        stackElement.innerHTML = stackHTML;

        return 'Stack Overflow';
    }
    resultElement.style.color = 'black';

    if (!step(executedsteps, stepstoexecute)) {
        return stackHTML;
    }

    if (eval(`n ${basecaseOperator} ${basecase}`)) {
        stackHTML = stackHTML.replace(newHTML, '');
        return eval(basecaseReturn);
    } else {
        const subsol1 = step_fibonacci(eval(recursecase1), stackDepth + 1);

        if (subsol1 === 'Stack Overflow')
            return 'Stack Overflow';
        if (subsol1.toString().startsWith('<'))
            return subsol1;

        resultContent = `n: ${eval(n)} | subsol1: ${subsol1} | subsol2: undefined | sol: undefined`;
        resultElement.textContent = resultContent;

        if (!step(executedsteps, stepstoexecute)) {
            return stackHTML;
        }

        const subsol2 = step_fibonacci(eval(recursecase2), stackDepth + 1);

        if (subsol2 === 'Stack Overflow')
            return 'Stack Overflow';
        if (subsol2.toString().startsWith('<'))
            return subsol2;

        resultContent = `n: ${eval(n)} | subsol1: ${subsol1} | subsol2: ${subsol2} | sol: undefined`;
        resultElement.textContent = resultContent;

        if (!step(executedsteps, stepstoexecute)) {
            return stackHTML;
        }

        const sol = eval(`${subsol1} ${operator} ${subsol2}`);

        resultContent = `n: ${eval(n)} | subsol1: ${subsol1} | subsol2: ${subsol2} | sol: ${sol}`;
        resultElement.textContent = resultContent;

        if (!step(executedsteps, stepstoexecute)) {
            return stackHTML;
        }

        stackHTML = stackHTML.substring(newHTML.length);
        stackElement.innerHTML = stackHTML;

        return sol;
    }
}

function check_result(result) {
    if (result === fibonnaci(maxStackDepth)) {
        resultElement.style.color = 'green';
        resultElement.textContent = "Correct Answer: " + result.toString();
    }
    else {
        resultElement.style.color = 'red';
        resultElement.textContent = 'Wrong Answer: ' + result.toString();
    }

}

resetButton.addEventListener('click', reset);

document.getElementById('lang-selector').addEventListener('change', function () {
    var selectedLanguage = document.getElementById('lang-selector').value.toLowerCase();

    languages.forEach(function (language) {
        var container = document.getElementById('container-' + language);
        container.style.display = 'none';
    });

    if (languages.includes(selectedLanguage)) {
        var selectedContainer = document.getElementById('container-' + selectedLanguage);
        selectedContainer.style.display = 'block';
    } else {
        console.log('Unsupported language: ' + selectedLanguage);
        resetButton.disabled = true;
        return;
    }

    resetButton.disabled = false;
    reset();
});

runButton.addEventListener('click', function () {
    stackElement.innerHTML = '';
    stackHTML = '';
    stepstoexecute.value = -1;

    let result = step_fibonacci(maxStackDepth, 1);
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
    stepstoexecute.value++;
    executedsteps.value = 0;

    stackHTML = '';

    stackHTML = step_fibonacci(maxStackDepth, 1);

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
    if (stepstoexecute.value <= 0) {
        stackHTML = '';
        resultContent = '';
        resultElement.textContent = ' ';
        stepstoexecute.value = -1;
        prevButton.disabled = true;
    }
    else {
        stepstoexecute.value--;
        executedsteps.value = 0;

        stackHTML = '';

        stackHTML = step_fibonacci(maxStackDepth, 1);
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
