import { AlignJustify, ArrowBigRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";

type OptionsMenuType = {
    id: number;
    name: string;
    current: boolean;
    href: string;
}

export function Sidebar() {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);

    const [items, setItems] = useState<OptionsMenuType[]>([
        { id: 1, name: "Consultar CNPJ", current: false, href: "/consulta-cnpj" },
        { id: 2, name: "Consultar Código IBGE", current: false, href: "/consulta-ibge" },
        { id: 3, name: "Consultar CEP", current: false, href: "/consulta-cep" },
        { id: 4, name: "Feriados Nacionais", current: false, href: "/feriados-nacionais" },
        // { id: 5, name: "Consultar DDD", current: false, href: "/consulta-ddd" },
    ])
    const [, setSelectedItemId] = useState<number | null>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    function openSidebar() {
        setIsOpenSidebar(true)
    }

    function closeSidebar() {
        setIsOpenSidebar(false)
    }

    const handleItemClick = (id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, current: true } : { ...item, current: false }
            )
        );
        setSelectedItemId(id)
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                closeSidebar();
            }
        }

        if (isOpenSidebar) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpenSidebar]);

    return (
        <>
            <div className="fixed top-1 left-1 md:hidden">
                <button onClick={openSidebar} className="p-3">
                    <AlignJustify /> 
                </button>
            </div>
            {isOpenSidebar && (
                <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 z-50 w-60 h-full bg-sidebar px-4 py-2 space-y-5
                    transform transition-all duration-300 ease-in-out
                    ${isOpenSidebar ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
            >
                <div className="flex items-center justify-end w-full">
                    <button onClick={closeSidebar} className="p-1 rounded-md hover:bg-sidebarhover hover:text-red-500">
                        <ArrowBigRight className="size-5" />
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    {items.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.href}
                            className={`${item.current ? "bg-sidebarhover" : ""} p-2 rounded-md hover:bg-sidebarhover hover:text-red-500`}
                            onClick={() => handleItemClick(item.id)}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            
            )}
            <div className="w-64 h-full bg-sidebar hidden md:flex flex-col items-center gap-3">
            {/* Em breve será feito o input de pesquisa */}
            {/* <div className="w-full flex items-center border border-b-gray-300 relative px-3 py-2">
            <Input placeholder="Pesquisar..." className="max-w-full text-sm px-7" />
            <Icons name="search" size={20} className="text-gray-400 absolute" />
          </div> */}
            <div>
            </div>
            <nav className="w-full flex flex-col gap-1 px-6 mt-6">
                {
                    items.map(item => (
                        <>
                            <NavLink key={item.id} to={item.href} onClick={() => handleItemClick(item.id)} className={`w-full rounded-md hover:bg-sidebarhover py-2 px-2 truncate text-sidebartext ${item.current ? 'bg-sidebarhover' : ''}`}>{item.name}</NavLink>
                        </>
                    ))
                }
            </nav>
        </div>
        </>
    )
}