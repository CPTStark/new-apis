// import Icons from "./components/icons"
// import { Input } from './components/ui/input'
import SearchCnpj from "@/layouts/consulta-cnpj"
import SearchIbge from "@/layouts/consulta-ibge";
import SearchCep from "@/layouts/consulta-cep"
import NationalHolidays from '@/layouts/feriados-nacionais'
import DefaultPage from "../src/layouts/default-page";
import { ModeToggle } from '@/components/mode-toggle'
import { ThemeProvider } from "@/components/theme-provider"
import { useState } from "react"

type OptionsMenuType = {
  id: number;
  name: string;
  current: boolean;
}

function App() {
  const [items, setItems] = useState<OptionsMenuType[]>([
    {id: 1, name: "Consultar CNPJ", current: false},
    {id: 2, name: "Consultar Código IBGE", current: false},
    {id: 3, name: "Consultar CEP", current: false},
    {id: 4, name: "Feriados Nacionais", current: false},
  ])
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleItemClick = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, current: true } : { ...item, current: false }
      )
    );
    setSelectedItemId(id)
  };

  const renderComponent = () => {
    switch (selectedItemId) {
      case 1:
        return <SearchCnpj />
      case 2:
        return <SearchIbge />
      case 3:
        return <SearchCep />
      case 4:
        return <NationalHolidays />
      default:
        return <DefaultPage />
    }
  }

  return (
      <div className="w-screen h-screen flex relative">
        <div className="absolute right-3 top-3 flex gap-3 items-center">
          <div>
            <a href="https://www.linkedin.com/in/gabrielprestesperez/" target="blank_" className="hover:border-b-2 hover:border-purple-500 transition-colors">
              Contato
            </a>
          </div>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <ModeToggle/>
        </ThemeProvider>
        </div>
        <div className="w-52 h-full bg-sidebar flex flex-col items-center gap-3">

          {/* Em breve será feito o input de pesquisa */}

          {/* <div className="w-full flex items-center border border-b-gray-300 relative px-3 py-2">
            <Input placeholder="Pesquisar..." className="max-w-full text-sm px-7" />
            <Icons name="search" size={20} className="text-gray-400 absolute" />
          </div> */}
          <div>
          </div>
          <nav className="w-full flex flex-col gap-1 px-3 mt-6">
            {
              items.map(item => (
                <>
                  <a key={item.id} href="#" onClick={() => handleItemClick(item.id)} className={`w-full rounded-md hover:bg-sidebarhover py-2 text-sidebartext text-center ${item.current ? 'bg-sidebarhover' : ''}`}>{item.name}</a>
                </>
              ))
            }
          </nav>
        </div>
        <div className="w-full h-full">
          <div className="w-full h-full flex flex-col px-9 py-10 gap-10">
            {renderComponent()} 
          </div>
        </div>
      </div>
  )
}

export default App