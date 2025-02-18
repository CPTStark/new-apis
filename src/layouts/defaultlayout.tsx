import { Outlet } from "react-router";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export function DefaultLayout() {
    return (
        <div className="h-screen flex relative">
            <Navbar />
            <Sidebar />
            <div className="w-full h-full flex flex-col px-9 py-14 gap-10">
                <Outlet />
            </div>
        </div>
    )
}