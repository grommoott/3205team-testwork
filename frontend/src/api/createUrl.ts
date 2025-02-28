import axios from "axios"
import config from "../config"

type Response = {
    url: string
}

const createUrl = async (
    originalUrl: string,
    expiresAt?: Date,
    alias?: string,
): Promise<Response> => {
    let body: any = { originalUrl }

    if (expiresAt) {
        body.expiresAt = expiresAt
    }

    if (alias) {
        body.shortUrl = alias
    }

    const { data } = await axios.post(`${config.backendBaseUrl}/shorten`, body)

    return data
}

export default createUrl
