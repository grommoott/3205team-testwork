import { forwardRef, useContext, useEffect, useState } from "react"
import InteractionWrapper, {
    InteractionWrapperProps,
} from "./InteractionWrapper"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { IUrlInfo } from "../../api/types"
import { Spin } from "antd"
import { AxiosError } from "axios"
import { toast } from "react-toastify/unstyled"
import getUrlInfo from "../../api/getUrlInfo"
import { InteractionPanelHeightContext } from "../InteractionPanel"

const InfoUrl = forwardRef<HTMLDivElement, InteractionWrapperProps>(
    ({ isVisible }, ref) => {
        // Input data
        const [shortUrl, setShortUrl] = useState("")

        const [isErrored, setErrored] = useState(false)
        const [isLoading, setLoading] = useState(false)
        const [urlInfo, setUrlInfo] = useState<IUrlInfo>()

        const updateHeight = useContext(InteractionPanelHeightContext)
        useEffect(updateHeight, [urlInfo, isLoading])

        const sendRequest = async () => {
            if (shortUrl === "") {
                setErrored(true)
                return
            }

            setLoading(true)
            setErrored(false)

            try {
                const urlInfo = await getUrlInfo(shortUrl)

                setUrlInfo(urlInfo)
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.status == 404) {
                        toast.error("Эта ссылка не найдена")
                    } else {
                        toast.error("Произошла ошибка")
                    }
                }
            }

            setLoading(false)
        }

        return (
            <InteractionWrapper isVisible={isVisible} ref={ref}>
                <h2 className="text-3xl my-4">Информация о ссылке</h2>
                <Input
                    placeholder="Id ссылки, сокращённой с помощью cck"
                    value={shortUrl}
                    onChange={setShortUrl}
                    isErrored={isErrored}
                    onEnter={sendRequest}
                />

                <Button onClick={sendRequest}>Получить информацию</Button>

                <div className="h-4" />

                <div className="bg-blue-100 rounded-2xl p-4">
                    {isLoading ? (
                        <Spin />
                    ) : urlInfo ? (
                        <p>
                            Оригинальный Url:{" "}
                            <a
                                href={urlInfo.originalUrl}
                                target="_blank"
                                className="text-blue-500"
                            >
                                {urlInfo.originalUrl}
                            </a>
                            <br />
                            Количество переходов: {urlInfo.clickCount}
                            <br />
                            Создана:{" "}
                            {urlInfo?.createdAt?.toLocaleDateString() +
                                " " +
                                urlInfo?.createdAt?.toLocaleTimeString()}
                            <br />
                        </p>
                    ) : (
                        <span className="opacity-50">
                            Здесь появиться информация о ссылке
                        </span>
                    )}
                </div>
            </InteractionWrapper>
        )
    },
)

export default InfoUrl
