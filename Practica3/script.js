// Definición de playlists
let playlists = {
    "Feliz": [
        { title: "Giant Steps", artist: "John Coltrane", src: "canciones/Giant_Steps.mp3", cover: "portadas/Giant_Steps.jpg" },
        { title: "So What", artist: "Joe Walsh", src: "canciones/So_What.mp3", cover: "portadas/So_What.jpg" }
    ],
    "Triste": [
        { title: "Nuvole Bianche", artist: "Einaudi", src: "canciones/Einaudi_Nuvole_Bianche.mp3", cover: "portadas/Einaudi_ Nuvole_Bianche.jpg" },
        { title: "Moonlight Sonata", artist: "Beethoven", src: "canciones/Moonlight_Sonata.mp3", cover: "portadas/Moonlight_Sonata.jpg" }
    ],
    "Energético": [
        { title: "Thunderstruck", artist: "AC/DC", src: "canciones/Thunderstruck.mp3", cover: "portadas/Thunderstruck.jpg" },
        { title: "Killing In The Name", artist: "Rage Against The Machine", src: "canciones/Killing_In_the_Name.mp3", cover: "portadas/Killing_In_the_Name.jpg" }
    ],
    "Relajado": [
        { title: "Rain In Your Black Eyes", artist: "Ezio Bosso", src: "canciones/In_Your_Black_Eyes.mp3", cover: "portadas/In_Your_Black_Eyes.jpg" },
        { title: "I Loves You", artist: "Paolo Fresu", src: "canciones/Paolo_Fresu_I_Loves_You.mp3", cover: "portadas/Paolo_Fresu_I_Loves_You.jpg" }
    ],
    "Inspirado": [
        { title: "Love You So Bad", artist: "Ezra Furman", src: "canciones/Love_You_So_Bad.mp3", cover: "portadas/Love_You_So_Bad.jpg" },
        { title: "No Hay Tanto Pan", artist: "Silvia Pérez", src: "canciones/No_Hay_Tanto_Pan.mp3", cover: "portadas/No_Hay_Tanto_Pan.jpg" }
    ],
    "Estresado": [
        { title: "Breezeblocks", artist: "Alt-J", src: "canciones/Breezeblocks.mp3", cover: "portadas/Breezeblocks.jpg" },
        { title: "Gave You Everything", artist: "The Interrupters", src: "canciones/Gave_You_Everything.mp3", cover: "portadas/Gave_You_Everything.jpg" }
    ]
};

let currentPlaylist = "Feliz"; // Playlist inicial
let currentSongIndex = 0;
let currentRadioIndex = 0; // Índice de la emisora actual
let radioStations = []; // Array para almacenar las emisoras
let isPlaying = false;
let howler;
let analyser, bufferLength, dataArray;
let isRadioMode = false;

// Cargar canciones y emisoras
document.addEventListener("DOMContentLoaded", () => {
    loadSongs();
    loadRadios();
    setupEqualizer();
});

// Funciones de reproducción
function loadSongs() {
    const songList = document.getElementById('songList');
    songList.innerHTML = ''; // Limpiar lista de canciones
    playlists[currentPlaylist].forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.artist}: ${song.title}`;
        li.onclick = () => playSong(index);
        songList.appendChild(li);
    });
    loadSong(currentSongIndex);
}

function loadSong(index) {
    if (howler) howler.unload();
    const song = playlists[currentPlaylist][index];
    howler = new Howl({
        src: [song.src],
        volume: 0.5,
        onplay: () => animateEqualizer(),
        onend: () => nextTrack()
    });
    document.getElementById('albumArt').src = song.cover;
}

function playSong(index) {
    isRadioMode = false; // Asegúra de que no estamos en modo de radio
    currentSongIndex = index;
    loadSong(currentSongIndex);
    togglePlay();
}

function togglePlay() {
    if (isPlaying) {
        howler.pause();
    } else {
        howler.play();
    }
    isPlaying = !isPlaying;
}

function previousTrack() {
    if (isRadioMode) {
        currentRadioIndex = (currentRadioIndex - 1 + radioStations.length) % radioStations.length;
        playRadio(radioStations[currentRadioIndex].src, radioStations[currentRadioIndex].logo, radioStations[currentRadioIndex].tittle, radioStations[currentRadioIndex].frequency);
    } else {
        currentSongIndex = (currentSongIndex - 1 + playlists[currentPlaylist].length) % playlists[currentPlaylist].length;
        playSong(currentSongIndex);
    }
}

function nextTrack() {
    if (isRadioMode) {
        currentRadioIndex = (currentRadioIndex + 1) % radioStations.length;
        playRadio(radioStations[currentRadioIndex].src, radioStations[currentRadioIndex].logo, radioStations[currentRadioIndex].tittle, radioStations[currentRadioIndex].frequency);
    }else {
        currentSongIndex = (currentSongIndex + 1) % playlists[currentPlaylist].length;
        playSong(currentSongIndex);
    }
}

function setVolume(volume) {
    Howler.volume(volume);
}

function changePlaylist(playlist) {
    currentPlaylist = playlist; // Actualiza la playlist actual
    currentSongIndex = 0; // Reinicia la canción actual
    loadSongs(); // Carga las canciones de la nueva playlist
}

// Funciones de reproducción
function loadSong(index) {
    if (howler) howler.unload();
    const song = playlists[currentPlaylist][index];
    howler = new Howl({
        src: [song.src],
        volume: 0.5,
        onplay: () => {
            animateEqualizer();
            updateProgressBar(); // Actualiza la barra de progreso al comenzar la canción
        },
        onend: () => nextTrack()
    });
    document.getElementById('albumArt').src = song.cover;
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const duration = howler.duration();
    const currentTime = howler.seek();
    progressBar.max = duration;
    progressBar.value = currentTime;

    // Actualizar la barra de progreso cada segundo
    const interval = setInterval(() => {
        if (isPlaying) {
            const currentTime = howler.seek();
            progressBar.value = currentTime;
        } else {
            clearInterval(interval);
        }
    }, 1000);
}

function setSongTime(value) {
    if (howler) {
        howler.seek(value); // Cambia el tiempo de la canción a la posición especificada en la barra
    }
}

function loadSong(index) {
    if (howler) howler.unload();
    const song = playlists[currentPlaylist][index];
    
    howler = new Howl({
        src: [song.src],
        volume: 0.5,
        onplay: () => {
            animateEqualizer();
            updateProgressBar(); // Actualiza la barra de progreso al comenzar la canción
        },
        onend: () => nextTrack()
    });

    // Actualiza la portada y la información de la canción
    document.getElementById('albumArt').src = song.cover;
    document.getElementById('artistName').textContent = song.artist; // Actualiza el nombre del artista
    document.getElementById('songTitle').textContent = song.title; // Actualiza el título de la canción
}



// Función para cargar emisoras de radio desde la API
async function loadRadios() {
    const radioList = document.getElementById('radioList');
    try {
        const response = await fetch('api.json'); //Reemplazo la api por un json para poder poner el LOGO
        const data = await response.json();

        // Asegúra de que "radios" es un array
        if (Array.isArray(data.radios)) {
            data.radios.forEach((radio, index) => {
                radioStations.push(radio); // Agregar emisora al array
                const li = document.createElement('li');
                li.textContent = `${radio.tittle} (${radio.frequency})`;
                li.onclick = () => playRadio(radio.src, radio.logo, radio.tittle, radio.frequency); // Pasamos el logo y todo al hacer clic
                radioList.appendChild(li);
            });
        } else {
            console.error("El formato de datos no es el esperado:", data);
        }
    } catch (error) {
        console.error("Error al cargar las emisoras de radio:", error);
    }
}

function loadRadio() {
    isRadioMode = true; // Cambiar a modo radio
}

// Función para reproducir una emisora de radio seleccionada
function playRadio(src, logo, emisora, freq) {
    if (howler) howler.unload();
    howler = new Howl({ src: [src], html5: true });
    howler.play();
    
    // Cambia el logo de la emisora en lugar de la portada
    document.getElementById('albumArt').src = logo;
    document.getElementById('artistName').textContent = emisora; // Actualiza el nombre del artista
    document.getElementById('songTitle').textContent = freq; // Actualiza el título de la canción
    loadRadio(); // Activar modo de radio
}



let bassGainNode;
let trebleGainNode;

// Configuración del ecualizador
function setupEqualizer() {
    const canvas = document.getElementById('equalizer');
    const ctx = canvas.getContext('2d');
    analyser = Howler.ctx.createAnalyser();
    analyser.fftSize = 2048;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    // Crear nodos de ganancia para bajos y agudos
    bassGainNode = Howler.ctx.createGain();
    trebleGainNode = Howler.ctx.createGain();

    Howler.masterGain.connect(bassGainNode);
    bassGainNode.connect(trebleGainNode);
    trebleGainNode.connect(analyser);
    analyser.connect(Howler.ctx.destination);
}

// Funciones para ajustar bajos y agudos
function setBass(value) {
    const gainValue = Math.pow(10, value / 20); // Convertir dB a ganancia
    bassGainNode.gain.setValueAtTime(gainValue, Howler.ctx.currentTime);
}

function setTreble(value) {
    const gainValue = Math.pow(10, value / 20); // Convertir dB a ganancia
    trebleGainNode.gain.setValueAtTime(gainValue, Howler.ctx.currentTime);
}

function animateEqualizer() {
    const canvas = document.getElementById('equalizer');
    const ctx = canvas.getContext('2d');
    requestAnimationFrame(animateEqualizer);
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / bufferLength) * 10;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i];
        ctx.fillStyle = 'blue';
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }
}




// crear una cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

//  obtener la cookie
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") == 0) {
            return cookie.substring((name + "=").length);
        }
    }
    return "";
}

// Cambia la playlist y guarda la selección en una cookie
function changePlaylist(playlist) {
    currentPlaylist = playlist;
    currentSongIndex = 0;
    loadSongs();
    setCookie("selectedPlaylist", playlist, 7); 
}

// Configura el valor del <select> según la cookie al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const savedPlaylist = getCookie("selectedPlaylist");
    if (savedPlaylist) {
        document.getElementById("playlistSelect").value = savedPlaylist;
        currentPlaylist = savedPlaylist;
        loadSongs();
    } else {
        loadSongs();
    }
    loadRadios();
    setupEqualizer();
});
