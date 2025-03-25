import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Contact } from "lucide-react";

export function Navbar() {
	return (
		<div className="absolute right-3 top-3 flex gap-3 items-center">
			<div>
				<a
					href="https://www.linkedin.com/in/gabrielprestesperez/"
					target="blank_"
					className="border-b-2 border-transparent hover:border-b-2 hover:border-purple-500 transition-colors flex gap-1 items-center"
				>
					<Contact className="text-gray-700 dark:text-gray-100" size={18} />
					Contato
				</a>
			</div>
			<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
				<ModeToggle />
			</ThemeProvider>
		</div>
	);
}
