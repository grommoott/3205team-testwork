import { FC } from "react"

interface Props {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    isErrored?: boolean
    onEnter?: () => void
}

const Input: FC<Props> = ({
    value = "",
    onChange = () => {},
    placeholder = "",
    isErrored = false,
    onEnter = () => {},
}) => {
    return (
        <input
            type="text"
            className={`outline-none p-2 rounded-2xl ${isErrored ? "bg-red-100 hover:bg-red-200 active:bg-red-300 focus-visible:bg-red-200" : "bg-blue-100 hover:bg-blue-200 active:bg-blue-300 focus-visible:bg-blue-200"} duration-100 placeholder-black/50 w-full`}
            defaultValue={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
                if (e.key == "Enter") {
                    onEnter()
                }
            }}
        />
    )
}

export default Input
