import { Navbar } from "./Navbar"
import { Outlet } from "react-router-dom"

// Narbar is the parent route, with each page as the child routes, meaning navbar is only rendered once

export function Layout() {
    return (
        <>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}