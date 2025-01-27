const TMDB_API_KEY = 'your_tmdb_api_key';
const SEARCH_API = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=`;
const VIDEO_API = 'https://embed.rgshows.me/api/1/movie/?id=';

const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const resultsDiv = document.getElementById('results');
const videoPlayer = document.getElementById('video-player');
const subtitlesSelect = document.getElementById('subtitles');
const audioSelect = document.getElementById('audio');
const qualitySelect = document.getElementById('quality');

// Search for movies/TV shows
searchBtn.addEventListener('click', async () => {
    const query = searchInput.value;
    if (query) {
        const data = await fetch(SEARCH_API + query).then(res => res.json());
        displayResults(data.results);
    }
});

// Display search results
function displayResults(results) {
    resultsDiv.innerHTML = '';
    results.forEach(result => {
        const div = document.createElement('div');
        div.textContent = result.title || result.name;
        div.addEventListener('click', () => loadMedia(result.id, result.media_type));
        resultsDiv.appendChild(div);
    });
}

// Load media and player features
async function loadMedia(id, type) {
    const url = `${VIDEO_API}${id}`;
    const data = await fetch(url).then(res => res.json());
    if (data.stream) {
        videoPlayer.src = data.stream;
        videoPlayer.play();

        // Load subtitles, audio, and quality options
        if (data.subtitles) loadSubtitles(data.subtitles);
        if (data.audioTracks) loadAudioTracks(data.audioTracks);
        if (data.qualityOptions) loadVideoQuality(data.qualityOptions);
    }
}

// Load subtitles
function loadSubtitles(subtitles) {
    subtitlesSelect.innerHTML = '';
    subtitles.forEach(sub => {
        const option = document.createElement('option');
        option.value = sub.url;
        option.textContent = sub.language;
        subtitlesSelect.appendChild(option);
    });
    subtitlesSelect.addEventListener('change', () => {
        videoPlayer.textTracks[0].src = subtitlesSelect.value;
    });
}

// Load audio tracks
function loadAudioTracks(audioTracks) {
    audioSelect.innerHTML = '';
    audioTracks.forEach(audio => {
        const option = document.createElement('option');
        option.value = audio.url;
        option.textContent = audio.language;
        audioSelect.appendChild(option);
    });
    audioSelect.addEventListener('change', () => {
        videoPlayer.src = audioSelect.value;
    });
}

// Load video quality options
function loadVideoQuality(qualityOptions) {
    qualitySelect.innerHTML = '';
    qualityOptions.forEach(quality => {
        const option = document.createElement('option');
        option.value = quality.url;
        option.textContent = quality.resolution;
        qualitySelect.appendChild(option);
    });
    qualitySelect.addEventListener('change', () => {
        videoPlayer.src = qualitySelect.value;
    });
}
