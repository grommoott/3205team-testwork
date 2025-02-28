import { FC, ReactNode } from "react"

interface Props {
    onClick?: () => void
    children?: ReactNode
}

const Button: FC<Props> = ({ onClick = () => {}, children }) => {
    return (
        <button
            className="p-2 rounded-2xl bg-blue-400 hover:bg-blue-500 active:bg-blue-600 focus-visible:bg-blue-500 outline-none duration-100 cursor-pointer px-4"
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
