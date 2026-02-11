 // Music configuration

const songs = [

{

artistName: "Tetris",

songName: "Theme A (Korobeiniki)",

url: "https://ia800504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3"

}

];


export function initMusic() {
    const audio = new Audio(songs[0].url);
    audio.loop = true;

    const toggleButton = document.getElementById('resume-pause-music-btn');
    const cassette = document.querySelector('.cassette');

    // Function to toggle music and animation
    const toggleMusic = () => {
        if (audio.paused) {
            audio.play().catch(error => {
                console.log("Audio playback failed (user interaction might be needed):", error);
            });
            cassette.classList.add('playing');
        } else {
            audio.pause();
            cassette.classList.remove('playing');
        }
    };

    // Event listener
    toggleButton.addEventListener('click', toggleMusic);

    // Initial state: remove playing class so it matches the paused audio state
    cassette.classList.remove('playing');
} 