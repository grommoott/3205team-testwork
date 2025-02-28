import { forwardRef, ReactNode } from "react"

export interface InteractionWrapperProps {
    isVisible: boolean
}

interface Props extends InteractionWrapperProps {
    children?: ReactNode
}

const InteractionWrapper = forwardRef<HTMLDivElement, Props>(
    ({ isVisible, children }, ref) => {
        return (
            <div
                ref={ref}
                className={`${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} duration-200 flex flex-col items-center p-4 gap-2 w-[30rem] absolute top-0`}
            >
                {children}
            </div>
        )
    },
)

export default InteractionWrapper
