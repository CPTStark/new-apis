import { useState } from "react";
import { NavLink } from "react-router";

type OptionsMenuType = {
    id: number;
    name: string;
    current: boolean;
    href: string;
}

export function Sidebar() {
    const [items, setItems] = useState<OptionsMenuType[]>([
        { id: 1, name: "Consultar CNPJ", current: false, href: "/consulta-cnpj" },
        { id: 2, name: "Consultar Código IBGE", current: false, href: "/consulta-ibge" },
        { id: 3, name: "Consultar CEP", current: false, href: "/consulta-cep" },
        { id: 4, name: "Feriados Nacionais", current: false, href: "/feriados-nacionais" },
        { id: 5, name: "Consultar DDD", current: false, href: "/consulta-ddd" },
    ])
    const [, setSelectedItemId] = useState<number | null>(null);

    const handleItemClick = (id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, current: true } : { ...item, current: false }
            )
        );
        setSelectedItemId(id)
    };
    return (
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
                            <NavLink key={item.id} to={item.href} onClick={() => handleItemClick(item.id)} className={`w-full rounded-md hover:bg-sidebarhover py-2 text-sidebartext text-center ${item.current ? 'bg-sidebarhover' : ''}`}>{item.name}</NavLink>
                        </>
                    ))
                }
            </nav>
        </div>
    )
}