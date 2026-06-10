import requests
import json

URL = 'https://www.oha.to/web-vod/'

def fetch_movies():
    headers = {
        'User-Agent': 'Mozilla/5.0',
        'Referer': URL
    }
    
    all_movies = []
    categories = ['popular', 'trending', 'upcoming', 'top_rated', 'now_playing']
    
    for cat in categories:
        print(f"📥 {cat} taranıyor...")
        url = URL + f'api/list?id=movie.{cat}'
        
        try:
            r = requests.get(url, headers=headers)
            if r.status_code == 200:
                data = r.json()
                movies = data.get('data', [])
                for m in movies:
                    all_movies.append({
                        'id': m.get('id'),
                        'name': m.get('name'),
                        'year': m.get('releaseDate', '')[:4] if m.get('releaseDate') else '?',
                        'poster': m.get('poster')
                    })
                print(f"   ✅ {len(movies)} film eklendi")
        except Exception as e:
            print(f"   ❌ Hata: {e}")
    
    # JSON'a kaydet
    with open('movies.json', 'w', encoding='utf-8') as f:
        json.dump(all_movies, f, ensure_ascii=False, indent=2)
    
    print(f"\n🎬 Toplam {len(all_movies)} film kaydedildi!")

if __name__ == '__main__':
    fetch_movies()
