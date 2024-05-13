const audio = document.querySelector('audio'),
    songLength = document.getElementById('SongLength'),
    currentTime = document.getElementById('CurrentSongTime');

const calculateTime = (secs) =>{
    const minutes = Math.floor(secs / 60),
        seconds = Math.floor(secs % 60),
        returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () =>{
    songLength.innerHTML = calculateTime(audio.duration);
}

if(audio.readyState > 0){
    displayDuration();
    currentTime.innerHTML = calculateTime(audio.currentTime);
}else{
    audio.addEventListener('loadedmetadata', () =>{
        displayDuration();
    })
}

audio.ontimeupdate = function(){
    currentTime.innerHTML = calculateTime(audio.currentTime);
    setProgress();
}

function setProgress(){
    let percentage = (audio.currentTime / audio.duration) * 100;
    document.querySelector('.progress').style.width = percentage + '%'; 
}

//Audio Controls
const playPause = document.getElementById('PlayPause'),
    plus10 = document.getElementById('Plus10'),
    back10 = document.getElementById('Back10');

playPause.addEventListener('click', ()=>{
    if(audio.paused){
        playPause.src = 'pause.svg';
        audio.play();
    }else{
        playPause.src = 'Play.svg';
        audio.pause();
    }
})

plus10.addEventListener('click', ()=>{
    audio.currentTime +=10;
})

back10.addEventListener('click', ()=>{
    audio.currentTime -=10;
})

Next.addEventListener('click',()=>{
     // Obtener el nombre del documento actual
    let currentDocumentName = window.location.pathname.split('/').pop();

    // Extraer el número del nombre del documento
    let documentNumber = parseInt(currentDocumentName.match(/\d+/)[0]);

    // Sumar 1 al número del documento
    let nextDocumentNumber = documentNumber + 1;

    // Construir el nombre del siguiente documento
    let nextDocumentName = currentDocumentName.replace(documentNumber, nextDocumentNumber);

    // Verificar si la página siguiente existe
    fetch(nextDocumentName)
        .then(response => {
            if (response.ok) {
                // La página siguiente existe, redirigir a esa página
                window.location.href = nextDocumentName;
            } else {
                // La página siguiente no existe, redirigir al archivo "1.html"
                window.location.href = '1.html';
            }
        })
        .catch(error => {
            console.error('Error al verificar la existencia de la página siguiente:', error);
        });
})

Back.addEventListener('click',()=>{
    // Obtener el nombre del documento actual
    let currentDocumentName = window.location.pathname.split('/').pop();

    // Extraer el número del nombre del documento
    let documentNumber = parseInt(currentDocumentName.match(/\d+/)[0]);

    // Restar 1 al número del documento
    let previousDocumentNumber = documentNumber - 1;

    // Construir el nombre del documento anterior
    let previousDocumentName = currentDocumentName.replace(documentNumber, previousDocumentNumber);

    // Verificar si la página anterior existe
    fetch(previousDocumentName)
        .then(response => {
            if (response.ok) {
                // La página anterior existe, redirigir a esa página
                window.location.href = previousDocumentName;
            } else {
                // La página anterior no existe, no hacer nada
                console.log("La página anterior no existe");
            }
        })
        .catch(error => {
            console.error('Error al verificar la existencia de la página anterior:', error);
        });
})