import config from "#config"

export default async () => {
    const popularMovies = await $fetch(`${config.TMDB_API_URL}/movie/popular`, {
        headers: {
            Authorization: `Bearer ${config.TMDB_TOKEN}`
        }
    })
    const nowPlayingMovies = await $fetch(`${config.TMDB_API_URL}/movie/now_playing`, {
        headers: {
            Authorization: `Bearer ${config.TMDB_TOKEN}`
        }
    })
    const genres = await $fetch(`${config.TMDB_API_URL}/genre/movie/list`, {
        headers: {
            Authorization: `Bearer ${config.TMDB_TOKEN}`
        }
    })

    return {
        'popularMovies': popularMovies['results'],
        'nowPlayingMovies': nowPlayingMovies['results'],
        'genres': genres['genres'],
    }
}