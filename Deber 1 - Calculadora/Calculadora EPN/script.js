const nota1Input = document.getElementById('nota1');
const nota2Input = document.getElementById('nota2');
const notaSupletorioInput = document.getElementById('notaSupletorio');
const notaFinalDisplay = document.getElementById('notaFinal');
const notaMateriaCard = document.getElementById('notaMateriaCard');
const notaMateriaDisplay = document.getElementById('notaMateria');
const messageEl = document.getElementById('message');
const btnCalcular = document.getElementById('btnCalcular');

function validateInput(input, min, max) {
    let value = parseFloat(input.value);
    if (isNaN(value) || value < min) {
        value = min;
    } else if (value > max) {
        value = max;
    }
    input.value = value;
    return value;
}

function showMessage(text, type) {
    messageEl.textContent = text;
    messageEl.className = `message ${type} show`;
}

function hideMessage() {
    messageEl.className = 'message';
}

function calculateNotaFinal() {
    const nota1 = validateInput(nota1Input, 0, 20);
    const nota2 = validateInput(nota2Input, 0, 20);
    const notaFinal = nota1 + nota2;
    notaFinalDisplay.textContent = notaFinal.toFixed(2);
    return notaFinal;
}

function calculate() {
    hideMessage();
    notaMateriaCard.style.display = 'none';
    
    const notaFinal = calculateNotaFinal();
    const notaSupletorio = validateInput(notaSupletorioInput, 0, 40);

    if (notaFinal >= 28) {
        showMessage('Felicidades. Pasaste sin supletorio! :D', 'success');
    } 
    else if (notaFinal < 14) {
        showMessage('Sorry, has reprobado la materia :(', 'error');
    }
    else {
        if (notaSupletorio > 0) {
            const notaFinalMateria = (notaFinal + notaSupletorio) / 2;
            notaMateriaDisplay.textContent = notaFinalMateria.toFixed(2);
            notaMateriaCard.style.display = 'block';
            
            if (notaFinalMateria >= 24) {
                showMessage(`Felicidades, pasaste con la prueba de supletorios! :)`, 'success');
            } else {
                showMessage(`Sorry, has reprobado la materia con supletorio :(`, 'error');
            }
        } else {
            showMessage('No pasas sin supletorio. Porfavor ingresa la Nota del supletorio', 'warning');
        }
    }
}

nota1Input.addEventListener('input', calculateNotaFinal);
nota2Input.addEventListener('input', calculateNotaFinal);
btnCalcular.addEventListener('click', calculate);

nota1Input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') calculate();
});
nota2Input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') calculate();
});
notaSupletorioInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') calculate();
});
