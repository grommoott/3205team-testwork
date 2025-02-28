import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./components/App"
import "@ant-design/v5-patch-for-react-19"
import { BrowserRouter } from "react-router"
import { Route } from "react-router"
import { Routes } from "react-router"
import Redirect from "./components/Redirect"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/:shortUrl" element={<Redirect />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
