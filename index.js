vida = 7;
let palabraAdivinada = "________";
const palabrasAhorcado = [
    'cabellos', 'caballos', 'acertado', 'armarios', 'silbidos',
    'bloquear', 'botellas', 'disfraza', 'alfombra', 'calabozo', 'mascaras',
    'remolino', 'silencio', 'tormenta', 'holganza', 'celestes', 'usuarios',
    'explorar', 'hormigas', 'invitado', 'nublados', 'zapatazo', 'aparecer'
];
let palabraEscondida = palabrasAhorcado[Math.floor(Math.random() * palabrasAhorcado.length)];

palabraHTML = document.getElementById('palabra');
Retry = document.getElementById('retry');
Retry.className += " d-none";

AdivinarLetra = (letra) => {
    let palabraEncontrada = false;
    let i = 0;
    letra = letra.toLowerCase();
    while (i < palabraEscondida.length) {
        if (letra == palabraEscondida[i]) {
            let nuevaPalabra = palabraAdivinada.split('');
            nuevaPalabra[i] = letra;
            palabraAdivinada = nuevaPalabra.join('');
            palabraEncontrada = true;
        }
        i++;
    }
    return palabraEncontrada;
}

inputLetra = document.getElementById('input-letra');
inputLetra.addEventListener('keyup', function onEvent(e) {
    if (e.key === 'Enter') {
        let letraComprobada = AdivinarLetra(inputLetra.value);
        if (letraComprobada == false && vida > 0){
            vida--;
            document.getElementById('imgState').src = `./img/Vida${vida}.png`;
        }
        palabraHTML.innerHTML = palabraAdivinada;
        inputLetra.value = '';
        ComprobarVida();
    }
});

inputPalabra = document.getElementById('input-palabra');
inputPalabra.addEventListener('keyup', function onEvent(e) {
    if (e.key === 'Enter') {
        if(inputPalabra.value == palabraEscondida)
        {
            palabraHTML.className += "text-success h3 mt-3";
            palabraHTML.innerHTML = palabraEscondida.toUpperCase();
            document.getElementById('imgState').src = `./img/VidaWINNER.png`;
            Retry.className = Retry.className.replace('d-none', '');
        }
        else{
            vida--;
            inputPalabra.value = '';
        }
        ComprobarVida();
    }
});

ComprobarVida = () => {
    if(vida <= 0)
    {
        JuegoFinalizado();
    }
}

JuegoFinalizado = () => {
    Retry.className = Retry.className.replace('d-none', '');
    // Obtener todos los elementos <div> con clase "col" que no tengan la ID "retry"
    elementosCol = (document.querySelectorAll('div[class^="col"]:has(input):not(#retry)'));

    elementosCol.forEach(elemento => {
        elemento.remove();
    });
}