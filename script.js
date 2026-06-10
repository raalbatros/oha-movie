let movies = [];

async function loadMovies() {
    try {
        const response = await fetch('movies.json');
        if (!response.ok) throw new Error('movies.json yüklenemedi');
        movies = await response.json();
        displayMovies(movies);
        document.getElementById('info').innerHTML = `<p>✅ ${movies.length} film hazır! Film seçin.</p>`;
    } catch (error) {
        console.error('Hata:', error);
        document.getElementById('movieList').innerHTML = '<div style="color: red;">movies.json yüklenemedi! Dosyayı kontrol edin.</div>';
        document.getElementById('info').innerHTML = '<p>❌ movies.json dosyası bulunamadı. Lütfen dosyayı oluşturun.</p>';
    }
}

function displayMovies(movieList) {
    const container = document.getElementById('movieList');
    if (!movieList || movieList.length === 0) {
        container.innerHTML = '<div>Film bulunamadı</div>';
        return;
    }
    
    container.innerHTML = movieList.map((movie, index) => `
        <div class="movie-item" onclick="playMovie('${movie.id}', '${movie.name.replace(/'/g, "\\'")}')">
            <strong>${index + 1}.</strong> ${movie.name} (${movie.year})
        </div>
    `).join('');
}

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
        if (item.innerText.includes(movieName.substring(0, 20))) {
            item.classList.add('active');
        }
    });
}

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
