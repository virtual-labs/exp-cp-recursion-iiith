import {
    step,
    changeOperator,
    languages,
    nextButton,
    prevButton,
    runButton,
    resetButton,
    stackElement,
    stackText,
    resultElement,
    sumOfNNaturalNumbers
} from './main.js';

let basecaseOperatorSelect = document.getElementById(`basecase-operator-${languages[0]}`);
let basecaseSelect = document.getElementById(`basecase-${languages[0]}`);
let basecaseReturnSelect = document.getElementById(`basecase-return-${languages[0]}`);
let recursecaseSelect = document.getElementById(`recursecase-${languages[0]}`);
let variableSelect = document.getElementById(`variable-${languages[0]}`);
let operatorSelect = document.getElementById(`operator-${languages[0]}`);
let nSelect = document.getElementById(`n-${languages[0]}`);

let stackHTML = '';
let resultContent = '';
let stepstoexecute = { value: -1 };
let executedsteps = { value: 0 };

let maxStackDepth = parseInt(nSelect.value);
stackText.textContent = maxStackDepth;

let basecaseOperator = changeOperator(basecaseOperatorSelect.value);
let basecase = parseInt(basecaseSelect.value);
let basecaseReturn = parseInt(basecaseReturnSelect.value);
let recursecase = recursecaseSelect.value;
let variable = variableSelect.value;
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
    
    let recursecaseSelect = document.getElementById(`recursecase-${language}`);
    recursecaseSelect.addEventListener('change', function () {
        recursecase = recursecaseSelect.value;
        reset();

        languages.forEach(language1 => {
            document.getElementById(`recursecase-${language1}`).value = recursecaseSelect.value;
        })
    })
    
    let variableSelect = document.getElementById(`variable-${language}`);
    variableSelect.addEventListener('change', function () {
        variable = variableSelect.value;
        reset();

        languages.forEach(language1 => {
            document.getElementById(`variable-${language1}`).value = variableSelect.value;
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

function step_sumOfNNaturalNumbers(n, stackDepth) {
    let newHTML = `<div class="stack">
        stackDepth: ${stackDepth}<br>
        n: ${n}<br>
        </div>\n`;
    stackHTML = newHTML + stackHTML;

    resultContent = `n: ${n} | subsol: undefined | sol: undefined`;
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

    if (eval(`"use strict";n ${basecaseOperator} ${basecase}`)) {
        stackHTML = stackHTML.replace(newHTML, '');
        return basecaseReturn;
    } else {
        const subsol = step_sumOfNNaturalNumbers(eval(`"use strict";${recursecase}`), stackDepth + 1);

        if (subsol === 'Stack Overflow') {
            return 'Stack Overflow';
        }
        if (subsol.toString().startsWith('<')) {
            return subsol;
        }

        resultContent = `n: ${n} | subsol: ${subsol} | sol: undefined`;
        resultElement.textContent = resultContent;

        if (!step(executedsteps, stepstoexecute)) {
            return stackHTML;
        }

        const sol = eval(`"use strict";${variable} ${operator} ${subsol}`);

        resultContent = `n: ${n} | subsol: ${subsol} | sol: ${sol}`;
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
    stepstoexecute.value = -1;

    let result = step_sumOfNNaturalNumbers(maxStackDepth, 1);
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
    if (stepstoexecute.value <= 0) {
        stackHTML = '';
        resultContent = '';
        resultElement.innerHTML = ' ';
        stepstoexecute.value = -1;
        prevButton.disabled = true;
    }
    else {
        stepstoexecute.value--;
        executedsteps.value = 0;

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
