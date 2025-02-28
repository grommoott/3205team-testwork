import { FC } from "react"
import InteractionPanel from "./InteractionPanel"
import { ToastContainer } from "react-toastify/unstyled"
import { Bounce } from "react-toastify"

const App: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center">
                <h1
                    className="text-6xl my-10 select-none text-blue-500"
                    draggable={false}
                >
                    Cck
                </h1>
                <img
                    src="/logo.svg"
                    className="size-20 select-none"
                    draggable={false}
                />
            </div>{" "}
            <InteractionPanel />
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </div>
    )
}

export default App
