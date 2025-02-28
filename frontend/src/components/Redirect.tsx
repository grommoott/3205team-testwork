import { Spin } from "antd"
import { FC, useEffect } from "react"
import { useParams } from "react-router"
import config from "../config"

const Redirect: FC = () => {
    const params = useParams()

    useEffect(() => {
        const shortUrl = params["shortUrl"]

        if (!shortUrl) {
            return
        }

        window.location.replace(`${config.backendBaseUrl}/${shortUrl}`)
    }, [])

    return (
        <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-center p-4 rounded-2xl bg-blue-100 m-8">
                <p className="text-3xl">Переадресация...</p>
                <Spin />
            </div>
        </div>
    )
}

export default Redirect
