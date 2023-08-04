let intensityBoxShadow = 10;
let vida = 7;
let palabraAdivinada = "________";
const palabrasAhorcado = [
    'cabellos', 'caballos', 'acertado', 'armarios', 'silbidos', 'montaña',
    'bloquear', 'botellas', 'disfraza', 'alfombra', 'calabozo', 'mascaras',
    'remolino', 'silencio', 'tormenta', 'holganza', 'celestes', 'usuarios',
    'explorar', 'hormigas', 'invitado', 'nublados', 'zapatazo', 'aparecer',
    'manzana', 'libro', 'lápiz', 'cielo', 'avión', 'playa', 'computadora',
    'felicidad', 'arcoiris', 'chocolate', 'musica', 'bicicleta', 'estrella'
];
let palabraEscondida = palabrasAhorcado[Math.floor(Math.random() * palabrasAhorcado.length)];

letrasNoCoincidentes = ['', ' '];
palabraHTML = document.getElementById('palabra');
palabraHTML.innerHTML = "__________";
Retry = document.getElementById('retry');
Retry.className += " d-none";

EspaciarPalabra = () => {
    let palabraEspaciada = '';
    for (let i = 0; i < palabraEscondida.length; i++) {
        palabraEspaciada += `${palabraHTML.innerHTML[i]} `;
    }
    return palabraEspaciada;
}
palabraHTML.innerHTML = EspaciarPalabra();
RestarVida = () => {
    vida--;
    body = document.getElementsByTagName('body');
    document.body.style.boxShadow = `inset 0 0 ${intensityBoxShadow}px rgba(255, 0, 0, 1)`;
    intensityBoxShadow += 30;
}

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
    if (e.key === 'Enter' && !letrasNoCoincidentes.includes(inputLetra.value)) {
        inputLetra.value = inputLetra.value.toLowerCase();
        let letraComprobada = AdivinarLetra(inputLetra.value);
        if (letraComprobada == false && vida > 0){
            RestarVida();
            document.getElementById('imgState').src = `./img/Vida${vida}.png`;
            document.getElementById('letras-usadas').innerHTML += inputLetra.value + '<br>';
            letrasNoCoincidentes.push(inputLetra.value);
        }
        palabraHTML.innerHTML = palabraAdivinada;
        palabraHTML.innerHTML = EspaciarPalabra();
        inputLetra.value = '';
        ComprobarVida();
    }
    else if (letrasNoCoincidentes.includes(inputLetra.value)){
        inputLetra.value = '';
    }
});

inputPalabra = document.getElementById('input-palabra');
inputPalabra.addEventListener('keyup', function onEvent(e) {
    if (e.key === 'Enter') {
        inputPalabra.value = inputPalabra.value.toLowerCase();
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

    //Excepción
    letrasUsadas = document.querySelector('div .no-coincidentes');
    letrasUsadas.remove();
}