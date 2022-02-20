import {useAsyncData, useState} from "#app";

export default function () {

    const popularMovies = useState('popularMovies', () => {
    })
    const nowPlayingMovies = useState('nowPlayingMovies', () => {
    })
    const movie = useState('movie', () => {
    })

    const errors = useState('errors', () => {
    })

    const getMovies = async () => {
        const {data, error} = await useAsyncData('movies', () => $fetch('/api/movies'))

        if (error.value) {
            throw new Error(error.value)
        }

        popularMovies.value = await formatMovies(data.value.popularMovies, data.value.genres)
        nowPlayingMovies.value = await formatMovies(data.value.nowPlayingMovies, data.value.genres)
    }

    const getMovie = async (id) => {
        const {data, error} = await useAsyncData('movie', () => $fetch('/api/movie', {
            params: {
                id
            }
        }))
        if (error.value) {
            throw new Error(error.value)
        }

        movie.value = await formatMovie(data.value)
    }

    return {
        popularMovies, nowPlayingMovies, movie, errors, getMovies, getMovie
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
            release_date: new Date(movie.release_date).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            vote_average: movie.vote_average * 10 + '%'
        }
    })
}

function formatMovie(movie) {
    return {
        id: movie.id,
        poster_path: movie.poster_path ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path : 'https://via.placeholder.com/500x750',
        genres: movie.genres.map(genre => genre.name).join(', '),
        title: movie.title,
        vote_average: movie.vote_average * 10 + '%',
        overview: movie.overview,
        release_date: new Date(movie.release_date).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        credits: movie.credits,
        videos: movie.videos.results.filter(v => v.type === 'Trailer')[0].key,
        images: movie.images.backdrops.slice(0, 9),
        crew: movie.credits.crew.slice(0, 2),
        cast: movie.credits.cast.slice(0, 5).map(cast => {
            return {
                ...cast,
                profile_path: cast.profile_path ? 'https://image.tmdb.org/t/p/w300/' + cast.profile_path : 'https://via.placeholder.com/300x450'
            }
        })
    }
}