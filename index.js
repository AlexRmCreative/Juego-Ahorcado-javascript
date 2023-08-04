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
palabraHTML.innerHTML = "__________";
Retry = document.getElementById('retry');
Retry.className += " d-none";

let intensityBoxShadow = 10;
RestarVida = () => {
    vida--;
    body = document.getElementsByTagName('body');
    document.body.style.boxShadow = `inset 0 0 ${intensityBoxShadow}px rgba(255, 0, 0, 1)`;
    intensityBoxShadow += 30;
}
EspaciarPalabra = () => {
    let palabraEspaciada = '';
    for (let i = 0; i < palabraHTML.innerHTML.length; i++) {
        palabraEspaciada += `${palabraHTML.innerHTML[i]} `;
    }
    return palabraEspaciada;
}
palabraHTML.innerHTML = EspaciarPalabra();

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
    if (e.key === 'Enter' && inputLetra.value != '') {
        let letraComprobada = AdivinarLetra(inputLetra.value);
        if (letraComprobada == false && vida > 0){
            RestarVida();
            document.getElementById('imgState').src = `./img/Vida${vida}.png`;
            document.getElementById('letras-usadas').innerHTML += inputLetra.value + '<br>';
        }
        palabraHTML.innerHTML = palabraAdivinada;
        palabraHTML.innerHTML = EspaciarPalabra();
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
            document.body.style.boxShadow = `inset 0 0 100px rgba(0, 255, 0, 1)`;
            JuegoFinalizado();
        }
        else{
            RestarVida();
            inputPalabra.value = '';
        }
        ComprobarVida();
    }
});

ComprobarVida = () => {
    if(vida <= 0)
    {
        palabraHTML.className += "text-danger h3 mt-3 text-decoration-line-through";
        JuegoFinalizado();
    }
}

JuegoFinalizado = () => {
    palabraHTML.innerHTML = palabraEscondida.toUpperCase();

    Retry.className = Retry.className.replace('d-none', '');
    // Obtener todos los elementos <div> con clase "col" que no tengan la ID "retry"
    elementosCol = (document.querySelectorAll('div[class^="col"]:has(input):not(#retry)'));
    //y los elimino
    elementosCol.forEach(elemento => {
        elemento.remove();
    });
}