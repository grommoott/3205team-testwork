import axios from "axios"
import config from "../config"

const getUrl = async (shortUrl: string) => {
    await axios.get(`${config.backendBaseUrl}/${shortUrl}`)
}

export default getUrl
