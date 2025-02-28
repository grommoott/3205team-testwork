import { forwardRef, useState } from "react"
import Input from "../ui/Input"
import InteractionWrapper, {
    InteractionWrapperProps,
} from "./InteractionWrapper"
import Button from "../ui/Button"
import createUrl from "../../api/createUrl"
import { Spin } from "antd"
import DateTimePicker from "../ui/DateTimePicker"
import { AxiosError } from "axios"
import { UrlIsAlreadyExists } from "../../errors"
import { toast } from "react-toastify/unstyled"

const CreateUrl = forwardRef<HTMLDivElement, InteractionWrapperProps>(
    ({ isVisible }, ref) => {
        // Input data
        const [originalUrl, setOriginalUrl] = useState("")
        const [isOriginalUrlErrored, setOriginalUrlErrored] = useState(false)
        const [alias, setAlias] = useState("")
        const [date, setDate] = useState<Date | undefined>(undefined)

        const [shortenedUrl, setShortenedUrl] = useState("")
        const [isLoading, setLoading] = useState(false)

        const sendRequest = async () => {
            if (!originalUrl) {
                setOriginalUrlErrored(true)
                return
            }

            setOriginalUrlErrored(false)
            setLoading(true)

            try {
                const response = await createUrl(originalUrl, date, alias)

                setShortenedUrl(response.url)
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.response?.data.message == UrlIsAlreadyExists) {
                        toast.error("Данный алиас уже занят")
                    } else if (e.status == 400) {
                        toast.error(
                            "Произошла ошибка, возможно введённые данные не являются url",
                        )
                    } else {
                        toast.error("Произошла ошибка")
                    }
                }
            }

            setLoading(false)
        }

        return (
            <InteractionWrapper isVisible={isVisible} ref={ref}>
                <h2 className="text-3xl my-4">Сокращение ссылки</h2>

                <Input
                    value={originalUrl}
                    onChange={setOriginalUrl}
                    placeholder="Ссылка, которую хотите сократить"
                    isErrored={isOriginalUrlErrored}
                />

                <Input
                    value={alias}
                    onChange={setAlias}
                    placeholder="Кастомный алиас(опционально) < 20 символов"
                />

                <p className="text-black/70 w-80 text-center">
                    Время, до которого будет действовать ссылка(опционально)
                </p>

                <DateTimePicker value={date} onChange={setDate} />

                <Button onClick={sendRequest}>
                    <p className="px-4">Сократить ссылку</p>
                </Button>

                <div className="h-4" />

                <div className="flex flex-row items-stretch gap-[2px]">
                    <div className="rounded-[1rem_0_0_1rem] bg-blue-100 p-3">
                        {isLoading ? (
                            <Spin />
                        ) : shortenedUrl ? (
                            <span>{shortenedUrl}</span>
                        ) : (
                            <>
                                <span className="opacity-50">
                                    Здесь появится сокращённая ссылка
                                </span>
                            </>
                        )}
                    </div>

                    <button
                        disabled={!shortenedUrl}
                        className="rounded-[0_1rem_1rem_0] px-2 bg-blue-100 hover:bg-blue-200 active:bg-blue-300 focus-visible:bg-blue-200 duration-100 text-black/50 outline-none cursor-pointer"
                        onClick={() => {
                            if (shortenedUrl) {
                                if (window.isSecureContext) {
                                    navigator.clipboard.writeText(shortenedUrl)
                                    toast.info("Скопировано")
                                } else {
                                    toast.warning(
                                        "Эта кнопка работает только если приложение запущено локально или используется https(",
                                    )
                                }
                            }
                        }}
                    >
                        <img src="/copy.svg" className="size-8" />
                    </button>
                </div>
            </InteractionWrapper>
        )
    },
)

export default CreateUrl
