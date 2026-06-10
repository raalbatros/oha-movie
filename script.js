let movies = [];

// Filmleri yükle
async function loadMovies() {
    try {
        const response = await fetch('movies.json');
        movies = await response.json();
        displayMovies(movies);
        console.log(`${movies.length} film yüklendi`);
    } catch (error) {
        console.error('Filmler yüklenemedi:', error);
        // Demo veri
        movies = [
            {id: "movie.1339713", name: "Obsession", year: "2026"},
            {id: "movie.1228710", name: "The Mandalorian and Grogu", year: "2026"}
        ];
        displayMovies(movies);
    }
}

// Filmleri listele
function displayMovies(movieList) {
    const container = document.getElementById('movieList');
    container.innerHTML = movieList.map((movie, index) => `
        <div class="movie-item" onclick="playMovie('${movie.id}', '${movie.name}')">
            <strong>${index + 1}.</strong> ${movie.name} (${movie.year})
        </div>
    `).join('');
}

// Film oynat
function playMovie(movieId, movieName) {
    const player = document.getElementById('player');
    const watchUrl = `https://www.oha.to/web-vod/watch/${movieId}`;
    
    player.src = watchUrl;
    
    document.getElementById('info').innerHTML = `
        <h3>🎬 ${movieName}</h3>
        <p>🔗 <a href="${watchUrl}" target="_blank">Yeni sekmede aç</a></p>
        <p>💡 Video açılmazsa yukarıdaki linke tıklayın</p>
    `;
    
    // Aktif sınıfını güncelle
    document.querySelectorAll('.movie-item').forEach(item => {
        item.classList.remove('active');
        if (item.innerText.includes(movieName)) {
            item.classList.add('active');
        }
    });
}

// Film ara
function searchMovies() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filtered = movies.filter(movie => 
        movie.name.toLowerCase().includes(searchTerm) ||
        movie.year.includes(searchTerm)
    );
    displayMovies(filtered);
}

// Sayfa yüklendiğinde
loadMovies();
