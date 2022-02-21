import config from "#config"

export default async () => {
    const popularTvs = await $fetch(`${config.TMDB_API_URL}/tv/popular`, {
        headers: {
            Authorization: `Bearer ${config.TMDB_TOKEN}`
        }
    })
    const topRatedTvs = await $fetch(`${config.TMDB_API_URL}/tv/top_rated`, {
        headers: {
            Authorization: `Bearer ${config.TMDB_TOKEN}`
        }
    })
    const genres = await $fetch(`${config.TMDB_API_URL}/genre/tv/list`, {
        headers: {
            Authorization: `Bearer ${config.TMDB_TOKEN}`
        }
    })

    return {
        'popularTvs': popularTvs['results'],
        'topRatedTvs': topRatedTvs['results'],
        'genres': genres['genres'],
    }
}