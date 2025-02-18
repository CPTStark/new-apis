import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";

export function Navbar() {
    return (
        <div className="absolute right-3 top-3 flex gap-3 items-center">
            <div>
                <a href="https://www.linkedin.com/in/gabrielprestesperez/" target="blank_" className="hover:border-b-2 hover:border-purple-500 transition-colors">
                    Contato
                </a>
            </div>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <ModeToggle />
            </ThemeProvider>
        </div>
    )
}