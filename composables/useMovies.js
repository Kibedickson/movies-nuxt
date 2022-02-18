import {useLazyAsyncData, useState} from "#app";

export default function () {

    const popularMovies = useState('popularMovies', () => {
    })
    const nowPlayingMovies = useState('nowPlayingMovies', () => {
    })

    const errors = useState('errors', () => {
    })

    const getMovies = async () => {
        const {data, error} = await useLazyAsyncData('movies', () => $fetch('/api/movies'))
        popularMovies.value = formatMovies(data.value.popularMovies, data.value.genres)
        nowPlayingMovies.value = formatMovies(data.value.nowPlayingMovies, data.value.genres)

        errors.value = error
    }

    return {
        popularMovies, nowPlayingMovies, errors, getMovies
    }
}

function formatMovies(movies, genres) {
    return movies.slice(0, 10).map(movie => {
        let formattedGenres = movie.genre_ids.map(genre => {
            return genres.find(g => g.id === genre).name
        }).join(', ')
        return {
            id: movie.id,
            title: movie.title,
            genres: formattedGenres,
            poster_path: 'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
            overview: movie.overview,
            release_date: new Date(movie.release_date).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'}),
            vote_average: movie.vote_average * 10 + '%'
        }
    })
}