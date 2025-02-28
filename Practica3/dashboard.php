<?php
session_start();
include_once '../includes/functions.php';
include_once '../includes/config.php';

// Verifica si el usuario está autenticado
if (!is_authenticated()) {
    header('Location: ../pages/login.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jazz Jukebox</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js"></script>
</head>
<body>
    <header class="header">
        <div class="header-content">
            <h1 class="jukebox-title">Jazz Jukebox</h1>
            <a href="../pages/logout.php" class="logout-link">Cerrar sesión</a>
        </div>
    </header>

    <main class="container">
        <div class="player" id="player">
            <img id="albumArt" src="portadas/Breezeblocks.jpg" alt="Album Art">
            <div id="songInfo">
                <strong id="artistName">John Coltrane</strong>: <span id="songTitle">Giant Steps</span>
            </div>
            <div class="controls">
                <button onclick="previousTrack()">⏮️</button>
                <button onclick="togglePlay()">⏯️</button>
                <button onclick="nextTrack()">⏭️</button>
            </div>
            <input type="range" id="progressBar" value="0" min="0" step="1" onchange="setSongTime(this.value)">
        </div>

        <div class="playlist" id="playlist">
            <h2>Selecciona tu estado de ánimo</h2>
            <select id="playlistSelect" onchange="changePlaylist(this.value)">
                <option value="Feliz">Feliz</option>
                <option value="Triste">Triste</option>
                <option value="Energético">Energético</option>
                <option value="Relajado">Relajado</option>
                <option value="Inspirado">Inspirado</option>
                <option value="Estresado">Estresado</option>
            </select>
            <ul id="songList"></ul>
        </div>

        <div class="radio" id="radio">
            <h2>Emisoras de Radio</h2>
            <ul id="radioList"></ul>
        </div>

        <div class="settings">
            <h2>Ajustes de Reproducción</h2>
            <label for="volumeControl">Volumen</label>
            <input type="range" min="0" max="1" step="0.01" value="0.5" id="volumeControl" oninput="setVolume(this.value)">
            <label for="bass">Bajos</label>
            <input type="range" id="bass" min="-30" max="30" step="1" oninput="setBass(this.value)">
            <label for="treble">Agudos</label>
            <input type="range" id="treble" min="-30" max="30" step="1" oninput="setTreble(this.value)">
            <canvas id="equalizer" width="300" height="100"></canvas>
        </div>
        
    </main>
    
    <footer class="footer">
        2DAW Nacho García
    </footer>

    <script src="script.js"></script>
</body>
</html>
