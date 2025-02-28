import axios from "axios"
import config from "../config"

const deleteUrl = async (shortUrl: string) => {
    await axios.delete(`${config.backendBaseUrl}/delete/${shortUrl}`)
}

export default deleteUrl
