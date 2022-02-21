import {useAsyncData, useState} from "#app";

export default function () {

    const popularTvs = useState('popularTvs', () => {
    })
    const topRatedTvs = useState('topRatedTvs', () => {
    })
    const tv = useState('tv', () => {
    })

    const errors = useState('errors', () => {
    })

    const getTvs = async () => {
        const {data, error} = await useAsyncData('tvs', () => $fetch('/api/tvs'))

        if (error.value) {
            throw new Error(error.value)
        }

        popularTvs.value = await formatTvs(data.value.popularTvs, data.value.genres)
        topRatedTvs.value = await formatTvs(data.value.topRatedTvs, data.value.genres)
    }

    const getTv = async (id) => {
        const {data, error} = await useAsyncData('tv', () => $fetch('/api/tv', {
            params: {
                id
            }
        }))
        if (error.value) {
            throw new Error(error.value)
        }

        tv.value = formatTv(data.value)
    }

    return {
        popularTvs, topRatedTvs, tv, errors, getTvs, getTv
    }
}

async function formatTvs(tvs, genres) {
    return tvs.slice(0, 10).map(tv => {
        let formattedGenres = tv.genre_ids.map(genre => {
            return genres.find(g => g.id === genre).name
        }).join(', ')
        return {
            id: tv.id,
            name: tv.name,
            genres: formattedGenres,
            poster_path: 'https://image.tmdb.org/t/p/w500/' + tv.poster_path,
            overview: tv.overview,
            first_air_date: new Date(tv.first_air_date).toLocaleDateString("en-US", {
                year: 'numeric', month: 'long', day: 'numeric'
            }),
            vote_average: tv.vote_average * 10 + '%',
            genre_ids: tv.genre_ids
        }
    })
}

function formatTv(tv) {
    return {
        "id": tv.id,
        "poster_path": tv.poster_path ? 'https://image.tmdb.org/t/p/w500/' + tv.poster_path : 'https://via.placeholder.com/500x750',
        "genres": tv.genres.map(genre => genre.name).join(', '),
        "name": tv.name,
        "vote_average": tv.vote_average * 10 + '%',
        "overview": tv.overview,
        "first_air_date": new Date(tv.first_air_date).toLocaleDateString("en-US", {
            "year": 'numeric', "month": 'long', "day": 'numeric'
        }),
        "created_by": tv.created_by,
        "credits": tv.credits,
        "videos": tv.videos.results.filter(v => v.type === 'Trailer')[0].key,
        "images": tv.images.backdrops.slice(0, 9),
        "crew": tv.credits.crew.slice(0, 2),
        "cast": tv.credits.cast.slice(0, 5).map(cast => {
            return {
                ...cast,
                "profile_path": cast.profile_path ? 'https://image.tmdb.org/t/p/w300/' + cast.profile_path : 'https://via.placeholder.com/300x450'
            }
        })
    }
}