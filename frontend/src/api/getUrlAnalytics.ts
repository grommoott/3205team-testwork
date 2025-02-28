import axios from "axios"
import config from "../config"
import { IUrlAnalytics } from "./types"

const getUrlAnalytics = async (shortUrl: string): Promise<IUrlAnalytics> => {
    const { data } = await axios.get(
        `${config.backendBaseUrl}/analytics/${shortUrl}`,
    )

    return data
}

export default getUrlAnalytics
