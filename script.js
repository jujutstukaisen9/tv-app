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

   searchBtn.addEventListener('click', async () => {
       const query = searchInput.value;
       if (query) {
           const data = await fetch(SEARCH_API + query).then(res => res.json());
           displayResults(data.results);
       }
   });

   function displayResults(results) {
       resultsDiv.innerHTML = '';
       results.forEach(result => {
           const div = document.createElement('div');
           div.textContent = result.title || result.name;
           div.addEventListener('click', () => loadMedia(result.id, result.media_type));
           resultsDiv.appendChild(div);
       });
   }

   async function loadMedia(id, type) {
       const url = `${VIDEO_API}${id}`;
       const data = await fetch(url).then(res => res.json());
       if (data.stream) {
           videoPlayer.src = data.stream;
           videoPlayer.play();
       }
   }
