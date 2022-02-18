import config from "#config"
import * as url from "url";

export default async (req, res) => {
    const {id} = url.parse(req.url, true).query;

    return await $fetch(`${config.TMDB_API_URL}/movie/${id}?append_to_response=credits,videos,images`, {
        headers: {
            Authorization: `Bearer ${config.TMDB_TOKEN}`
        }
    })
}