import axios from "axios"
import config from "../config"
import { IUrlInfo } from "./types"

const getUrlInfo = async (shortUrl: string): Promise<IUrlInfo> => {
    const { data } = await axios.get(
        `${config.backendBaseUrl}/info/${shortUrl}`,
    )

    return {
        ...data,
        createdAt: new Date(data.createdAt || 0),
    }
}

export default getUrlInfo
