const languages = ['py', 'js', 'c'];

const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const runButton = document.getElementById('run');
const resetButton = document.getElementById('reset');

const stackElement = document.getElementById('container-stack');
const resultElement = document.getElementById('result');

let basecaseOperatorSelect = document.getElementById(`basecase_operator-${languages[0]}`);
let basecaseSelect = document.getElementById(`basecase-${languages[0]}`);
let basecaseReturnSelect = document.getElementById(`basecase-return-${languages[0]}`);
let recursecaseSelect = document.getElementById(`recursecase-${languages[0]}`);
let variableSelect = document.getElementById(`variable-${languages[0]}`);
let operatorSelect = document.getElementById(`operator-${languages[0]}`);
let nSelect = document.getElementById('n-${languages[0]}');

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

languages.forEach(language => {
    let basecaseOperatorSelect = document.getElementById(`basecase_operator-${language}`);
    basecaseOperatorSelect.addEventListener('change', function () {
        basecaseOperator = changeOperator(basecaseOperatorSelect.value);
        reset();

        languages.forEach(language1 => {
            document.getElementById(`basecase_operator-${language1}`).value = basecaseOperatorSelect.value;
        })
    })
});
languages.forEach(language => {
    let basecaseSelect = document.getElementById(`basecase-${language}`);
    basecaseSelect.addEventListener('change', function () {
        basecase = parseInt(basecaseSelect.value);
        reset();

        languages.forEach(language1 => {
            document.getElementById(`basecase-${language1}`).value = basecaseSelect.value;
        })
    })
});
languages.forEach(language => {
    let basecaseReturnSelect = document.getElementById(`basecase-return-${language}`);
    basecaseReturnSelect.addEventListener('change', function () {
        basecaseReturn = parseInt(basecaseReturnSelect.value);
        reset();

        languages.forEach(language1 => {
            document.getElementById(`basecase-return-${language1}`).value = basecaseReturnSelect.value;
        })
    })
});
languages.forEach(language => {
    let recursecaseSelect = document.getElementById(`recursecase-${language}`);
    recursecaseSelect.addEventListener('change', function () {
        recursecase = recursecaseSelect.value;
        reset();

        languages.forEach(language1 => {
            document.getElementById(`recursecase-${language1}`).value = basecaseReturnSelect.value;
        })
    })
});
languages.forEach(language => {
    let variableSelect = document.getElementById(`variable-${language}`);
    variableSelect.addEventListener('change', function () {
        variable = variableSelect.value;
        reset();

        languages.forEach(language1 => {
            document.getElementById(`variable-${language1}`).value = variableSelect.value;
        })
    })
});
languages.forEach(language => {
    let operatorSelect = document.getElementById(`operator-${language}`);
    operatorSelect.addEventListener('change', function () {
        operator = operatorSelect.value;
        reset();

        languages.forEach(language1 => {
            document.getElementById(`operator-${language1}`).value = operatorSelect.value;
        })
    })
});
languages.forEach(language => {
    let nSelect = document.getElementById(`n-${language}`);
    nSelect.addEventListener('change', function () {
        maxStackDepth = parseInt(nSelect.value);
        stackText = document.getElementById('stack-depth');
        stackText.textContent = maxStackDepth;
        reset();

        languages.forEach(language1 => {
            document.getElementById(`n-${language1}`).value = maxStackDepth;
        })
    })
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

function sumOfNNaturalNumbers(n) {
    if (n <= 0) {
        return "Please enter a positive integer.";
    }

    const sum = (n * (n + 1)) / 2;
    return sum;
}

function step_sumOfNNaturalNumbers(n, stackDepth) {
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
        const subsol = step_sumOfNNaturalNumbers(eval(recursecase), stackDepth + 1);

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
    if (result === sumOfNNaturalNumbers(maxStackDepth)) {
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
    stepstoexecute = -1;

    let result = step_sumOfNNaturalNumbers(maxStackDepth, 1);
    check_result(result);

    runButton.disabled = true;
    nextButton.disabled = true;
    prevButton.disabled = true;

    console.log(basecaseOperator, basecase, basecaseReturn, recursecase, variable, operator, maxStackDepth);
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

    stackHTML = step_sumOfNNaturalNumbers(maxStackDepth, 1);

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

        stackHTML = step_sumOfNNaturalNumbers(maxStackDepth, 1);
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
