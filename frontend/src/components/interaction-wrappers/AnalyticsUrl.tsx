import { forwardRef, useContext, useEffect, useState } from "react"
import InteractionWrapper, {
    InteractionWrapperProps,
} from "./InteractionWrapper"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { IUrlAnalytics } from "../../api/types"
import { Spin } from "antd"
import { AxiosError } from "axios"
import { toast } from "react-toastify/unstyled"
import { InteractionPanelHeightContext } from "../InteractionPanel"
import getUrlAnalytics from "../../api/getUrlAnalytics"

const AnalyticsUrl = forwardRef<HTMLDivElement, InteractionWrapperProps>(
    ({ isVisible }, ref) => {
        // Input data
        const [shortUrl, setShortUrl] = useState("")

        const [isErrored, setErrored] = useState(false)
        const [isLoading, setLoading] = useState(false)
        const [urlAnalytics, setUrlAnalytics] = useState<IUrlAnalytics>()

        const updateHeight = useContext(InteractionPanelHeightContext)
        useEffect(updateHeight, [urlAnalytics, isLoading])

        const sendRequest = async () => {
            if (shortUrl === "") {
                setErrored(true)
                return
            }

            setLoading(true)
            setErrored(false)

            try {
                const urlAnalytics = await getUrlAnalytics(shortUrl)

                setUrlAnalytics(urlAnalytics)
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
                <h2 className="text-3xl my-4">Аналитика по ссылке</h2>
                <Input
                    placeholder="Id ссылки, сокращённой с помощью cck"
                    value={shortUrl}
                    onChange={setShortUrl}
                    isErrored={isErrored}
                    onEnter={sendRequest}
                />

                <Button onClick={sendRequest}>Проанализировать ссылку</Button>

                <div className="h-4" />

                <div className="bg-blue-100 rounded-2xl p-4">
                    {isLoading ? (
                        <Spin />
                    ) : urlAnalytics ? (
                        <p>
                            Количество переходов: {urlAnalytics.clickCount}
                            <br />
                            Последние 5 IP адресов, которые перешли по ссылке:{" "}
                            {urlAnalytics.lastIps.map((ip) => (
                                <>
                                    <br />
                                    <span className="pl-2"> - {ip}</span>
                                </>
                            ))}
                            <br />
                        </p>
                    ) : (
                        <span className="opacity-50">
                            Здесь появиться аналитика по ссылке
                        </span>
                    )}
                </div>
            </InteractionWrapper>
        )
    },
)

export default AnalyticsUrl
