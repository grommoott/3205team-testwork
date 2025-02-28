import { forwardRef, useContext, useEffect, useState } from "react"
import InteractionWrapper, {
    InteractionWrapperProps,
} from "./InteractionWrapper"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { InteractionPanelHeightContext } from "../InteractionPanel"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import deleteUrl from "../../api/deleteUrl"
import { Spin } from "antd"

const DeleteUrl = forwardRef<HTMLDivElement, InteractionWrapperProps>(
    ({ isVisible }, ref) => {
        // Input data
        const [shortUrl, setShortUrl] = useState("")

        const [isErrored, setErrored] = useState(false)
        const [isLoading, setLoading] = useState(false)

        const updateHeight = useContext(InteractionPanelHeightContext)
        useEffect(updateHeight, [isLoading])

        const sendRequest = async () => {
            if (shortUrl === "") {
                setErrored(true)
                return
            }

            setLoading(true)

            try {
                await deleteUrl(shortUrl)

                toast.info("Ссылка успешно удалена")
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.status == 404) {
                        toast.error("Ссылка с таким Id не найдена")
                    } else {
                        toast.error("Произошла ошибка")
                    }
                }
            }

            setLoading(false)
        }

        return (
            <InteractionWrapper isVisible={isVisible} ref={ref}>
                <h2 className="text-3xl my-4">Удаление ссылки</h2>
                <Input
                    placeholder="Id ссылки, которую хотите удалить"
                    value={shortUrl}
                    onChange={setShortUrl}
                    isErrored={isErrored}
                    onEnter={sendRequest}
                />
                <Button onClick={sendRequest}>Удалить ссылку</Button>

                {isLoading && (
                    <div className="flex flex-row items-center p-4 rounded-2xl bg-blue-100">
                        <Spin />
                    </div>
                )}
            </InteractionWrapper>
        )
    },
)

export default DeleteUrl
