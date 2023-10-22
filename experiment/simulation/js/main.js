export function step(executedsteps, stepstoexecute) {
    executedsteps.value++;
    if (stepstoexecute.value !== -1 && executedsteps.value > stepstoexecute.value) {
        return false;
    }
    return true;
}