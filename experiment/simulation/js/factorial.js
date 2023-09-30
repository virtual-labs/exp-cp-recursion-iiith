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