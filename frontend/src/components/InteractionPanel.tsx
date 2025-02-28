import {
    createContext,
    FC,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react"
import { Interaction, Interactions } from "../interactions"
import InteractionButton from "./ui/InteractionButton"
import CreateUrl from "./interaction-wrappers/CreateUrl"
import InfoUrl from "./interaction-wrappers/InfoUrl"
import DeleteUrl from "./interaction-wrappers/DeleteUrl"
import AnalyticsUrl from "./interaction-wrappers/AnalyticsUrl"

export const InteractionPanelHeightContext = createContext(() => {})

const InteractionPanel: FC = () => {
    const [selectedInteraction, setSelectedInteraction] = useState<Interaction>(
        Interactions.Create,
    )

    const [followerOffset, setFollowerOffset] = useState(0)
    const [wrappersContainerHeight, setWrappersContainerHeight] = useState(0)

    const wrapperRefs = {
        [Interactions.Create]: useRef(null),
        [Interactions.GetInfo]: useRef(null),
        [Interactions.Delete]: useRef(null),
        [Interactions.Analytics]: useRef(null),
    }

    const updateHeight = useCallback(() => {
        const ref = wrapperRefs[selectedInteraction]

        if (!ref.current) {
            return
        }

        const wrapper = ref.current as HTMLDivElement
        setWrappersContainerHeight(wrapper.scrollHeight)
    }, [setWrappersContainerHeight, wrapperRefs])

    useEffect(updateHeight, [selectedInteraction])

    return (
        <div className="p-4 m-4 rounded-2xl bg-blue-50 flex flex-row items-start gap-6">
            <div className="flex flex-col items-stretch gap-2 relative">
                {Object.values(Interactions).map((interaction) => (
                    <InteractionButton
                        interaction={interaction}
                        key={interaction}
                        onClick={(ref) => {
                            setSelectedInteraction(interaction)

                            if (!ref.current) {
                                return
                            }

                            const button = ref.current as HTMLButtonElement
                            setFollowerOffset(button.offsetTop)
                        }}
                    />
                ))}
                <div
                    className="bg-blue-400 h-10 absolute duration-200 w-full rounded-2xl z-10 pointer-events-none"
                    style={{ top: followerOffset }}
                ></div>
            </div>

            <InteractionPanelHeightContext value={updateHeight}>
                <div
                    className="relative w-[30rem] duration-300"
                    style={{ height: wrappersContainerHeight }}
                >
                    <CreateUrl
                        isVisible={selectedInteraction == Interactions.Create}
                        ref={wrapperRefs[Interactions.Create]}
                    />
                    <InfoUrl
                        isVisible={selectedInteraction == Interactions.GetInfo}
                        ref={wrapperRefs[Interactions.GetInfo]}
                    />
                    <DeleteUrl
                        isVisible={selectedInteraction == Interactions.Delete}
                        ref={wrapperRefs[Interactions.Delete]}
                    />
                    <AnalyticsUrl
                        isVisible={
                            selectedInteraction == Interactions.Analytics
                        }
                        ref={wrapperRefs[Interactions.Analytics]}
                    />
                </div>
            </InteractionPanelHeightContext>
        </div>
    )
}

export default InteractionPanel
