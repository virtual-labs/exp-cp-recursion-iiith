export const languages = ['py', 'js', 'c'];

// Constant Elements across all pages
export const nextButton = document.getElementById('next');
export const prevButton = document.getElementById('prev');
export const runButton = document.getElementById('run');
export const resetButton = document.getElementById('reset');

export const stackElement = document.getElementById('container-stack');
export const stackText = document.getElementById('stack-depth');
export const resultElement = document.getElementById('result');

// Helper Functions
export function step(executedsteps, stepstoexecute) {
    executedsteps.value++;
    if (stepstoexecute.value !== -1 && executedsteps.value > stepstoexecute.value) {
        return false;
    }
    return true;
}

export function changeOperator(operator) {
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

// Checker Functions
export function sumOfNNaturalNumbers(n) {
    if (n <= 0) {
        return "Please enter a positive integer.";
    }

    const sum = (n * (n + 1)) / 2;
    return sum;
}

export function power(base, n) {
    return Math.pow(base, n);
}

export function fibonnaci(n) {
    if (n <= 1)
        return n;
    else
        return fibonnaci(n - 1) + fibonnaci(n - 2);
}

export function factorial(n) {
    if (n === 0 || n === 1)
        return 1;
    else
        return n * factorial(n - 1);
}
