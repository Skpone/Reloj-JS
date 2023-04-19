"use strict";

let CANVAS = document.querySelector('#my-canvas');
const CTX = CANVAS.getContext("2d");

const CENTERX = CANVAS.width / 2; //seteamos los puntos para empezar a dibujar el circulo
const CENTERY = CANVAS.height / 2;
const RADIUS = 300; //lo grande que va a ser el reloj

function drawClock()
{
    //primero podemos limpiar el espacio del canvas para evitar que se superpongan los dibujos
    CTX.clearRect(0,0,CANVAS.width,CANVAS.height);

    //dibujamos el contorno del reloj y coloreamos el fondo
    CTX.beginPath();
    CTX.arc(CENTERX,CENTERY,RADIUS,0,2 * Math.PI);
    CTX.fillStyle = '#fff';
    CTX.fill();
    CTX.lineWidth = 5;
    CTX.strokeStyle = '#faa';
    CTX.stroke();

    //dibujamos los numeros de cada hora
    const SYMBOLRADIUS = RADIUS - 15; //determinamos el radio que van a tener cada hora (osea cuan lejos o cerca del centro estan)

    for (let i = 1; i <= 12; i++) {
        const ANGLE = i * (Math.PI / 6) - Math.PI / 2; // aca calculamos el angulo que va a tener cada hora respecto a que hora sea (i)
        
        //coordenadas para saber donde dibujar la hora en el canvas
        const X = CENTERX + SYMBOLRADIUS * Math.cos(ANGLE);
        const Y = CENTERY + SYMBOLRADIUS * Math.sin(ANGLE);

        CTX.font = '15px Montserrat'; //la fuente de la hora
        CTX.fillStyle = '#000';
        CTX.textAlign = 'center'; //necesario para que cada numero quede al centro y no al comienzo
        CTX.textBaseline = 'middle'; //necesario sino por default quedan en "alphabetic"
        CTX.fillText(i, X, Y); //para dibujar texto
    }
    
    //obtenemos el tiempo actual
    const NOW = new Date();
    const HOUR = NOW.getHours(); //hora actual
    const MINUTE = NOW.getMinutes(); //minutos actuales
    const SECOND = NOW.getSeconds(); //segundo actual

    
  //dibujamos la aguja de las horas
    //sacamos el angulo en el que va a estar nuestra aguja
    const HOURANGLE = (HOUR % 12 + MINUTE / 60 + SECOND / 3600) * Math.PI / 6 - Math.PI / 2;
    const HOURLENGTH = RADIUS * 0.6; //largo de la aguja
    //calculamos el index x e y de la punta de la aguja
    const HOURHANDX = CENTERX + HOURLENGTH * Math.cos(HOURANGLE);
    const HOURHANDY = CENTERY + HOURLENGTH * Math.sin(HOURANGLE);
    CTX.beginPath();
    CTX.moveTo(CENTERX, CENTERY);
    CTX.lineTo(HOURHANDX, HOURHANDY);
    CTX.lineWidth = 5;
    CTX.strokeStyle = randomRGBA();
    CTX.stroke();

  //dibujamos la aguja de los minutos
    const MINUTEANGLE = (MINUTE + SECOND / 60) * Math.PI / 30 - Math.PI / 2;
    const MINUTELENGTH = RADIUS * 0.7;
    const MINUTEHANDX = CENTERX + MINUTELENGTH * Math.cos(MINUTEANGLE);
    const MINUTEHANDY = CENTERY + MINUTELENGTH * Math.sin(MINUTEANGLE);
    CTX.beginPath();
    CTX.moveTo(CENTERX, CENTERY);
    CTX.lineTo(MINUTEHANDX, MINUTEHANDY);
    CTX.lineWidth = 3;
    CTX.strokeStyle = randomRGBA();
    CTX.stroke();

  //dibujamos la aguja de los segundos
    const SECONDANGLE = (SECOND + NOW.getMilliseconds() / 1000) * Math.PI / 30 - Math.PI / 2;
    const SECONDLENGTH = RADIUS * 0.8;
    const SECONDHANDX = CENTERX + SECONDLENGTH * Math.cos(SECONDANGLE);
    const SECONDHANDY = CENTERY + SECONDLENGTH * Math.sin(SECONDANGLE);
    CTX.beginPath();
    CTX.moveTo(CENTERX, CENTERY);
    CTX.lineTo(SECONDHANDX, SECONDHANDY);
    CTX.lineWidth = 2;
    CTX.strokeStyle = randomRGBA();
    CTX.stroke();


  // hacemos el circulo del centro
    CTX.beginPath();
    CTX.arc(CENTERX, CENTERY, 8, 0, 2 * Math.PI);
    CTX.fillStyle = randomRGBA();
    CTX.fill();
}

function randomRGBA() {
    //pongo limite a los 3 de 190 asi el color random q se genera no se aproxima al blanco y no se tapan las agujas con el fondo
    let r = Math.round(Math.random() * 190);
    let g = Math.round(Math.random() * 190);
    let b = Math.round(Math.random() * 190);
    let a = 1;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

//cada 1 segundo llamamos a la funcion setInterval
setInterval(drawClock, 1000);