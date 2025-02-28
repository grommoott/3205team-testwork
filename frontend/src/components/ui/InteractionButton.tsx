import { FC, RefObject, useRef } from "react"
import { Interaction, translateInteraction } from "../../interactions"

interface Props {
    interaction: Interaction
    onClick: (ref: RefObject<null>) => void
}

const InteractionButton: FC<Props> = ({ interaction, onClick }) => {
    const ref = useRef(null)

    return (
        <button
            className="p-2 rounded-2xl bg-blue-100/50 hover:bg-blue-200/50 active:bg-blue-300/50 bg-opacity-25 cursor-pointer duration-100 relative outline-none focus-visible:bg-blue-200/50 px-4"
            onClick={() => onClick(ref)}
            ref={ref}
        >
            <p className="z-20 relative">{translateInteraction(interaction)}</p>
        </button>
    )
}

export default InteractionButton
