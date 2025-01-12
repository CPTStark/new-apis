import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FirstTitle from "@/components/first-title"
import Loading from "@/components/loading"
import { IbgeData } from "@/interfaces/ibge"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"


interface Estados {
    id: number;
    name: string;
    uf: string;
}

function SearchIbge() {
    const [isLoading, setIsLoading] = useState(false);
    const [state, setStateSelect] = useState('');
    const [cities, setCities ] = useState<IbgeData[] | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('')

    const { toast } = useToast()
      
    const estados: Estados[] = [
        { id: 1, name: "Acre", uf: "AC" },
        { id: 2, name: "Alagoas", uf: "AL" },
        { id: 3, name: "Amapá", uf: "AP" },
        { id: 4, name: "Amazonas", uf: "AM" },
        { id: 5, name: "Bahia", uf: "BA" },
        { id: 6, name: "Ceará", uf: "CE" },
        { id: 7, name: "Distrito Federal", uf: "DF" },
        { id: 8, name: "Espírito Santo", uf: "ES" },
        { id: 9, name: "Goiás", uf: "GO" },
        { id: 10, name: "Maranhão", uf: "MA" },
        { id: 11, name: "Mato Grosso", uf: "MT" },
        { id: 12, name: "Mato Grosso do Sul", uf: "MS" },
        { id: 13, name: "Minas Gerais", uf: "MG" },
        { id: 14, name: "Pará", uf: "PA" },
        { id: 15, name: "Paraíba", uf: "PB" },
        { id: 16, name: "Paraná", uf: "PR" },
        { id: 17, name: "Pernambuco", uf: "PE" },
        { id: 18, name: "Piauí", uf: "PI" },
        { id: 19, name: "Rio de Janeiro", uf: "RJ" },
        { id: 20, name: "Rio Grande do Norte", uf: "RN" },
        { id: 21, name: "Rio Grande do Sul", uf: "RS" },
        { id: 22, name: "Rondônia", uf: "RO" },
        { id: 23, name: "Roraima", uf: "RR" },
        { id: 24, name: "Santa Catarina", uf: "SC" },
        { id: 25, name: "São Paulo", uf: "SP" },
        { id: 26, name: "Sergipe", uf: "SE" },
        { id: 27, name: "Tocantins", uf: "TO" }
    ];

    const handleChange = (value: string) => {
        setStateSelect(value)
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
      
    async function getCitys() {
        setIsLoading(true)
        setModalOpen(false)

        try {
            if(state === '') {
                toast({
                    description: `Por favor, selecione um estado`
                })
                return
            }

            const response = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${state}?providers=dados-abertos-br,gov,wikipedia`);
            const data = await response.json()

            setCities(data)
            setModalOpen(true)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Toaster/>
            <div>
                <FirstTitle>Instituto Brasileiro de Geografia e Estatística (Código IBGE)</FirstTitle>
            </div>
            <div className="w-full flex items-center justify-center gap-4">
                <div className="flex items-center justify-center w-[20%]">
                    <Label className="w-60">Selecione o estado:</Label>
                    <Select onValueChange={handleChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            {estados.map((item) => {
                                return <SelectItem key={item.id} value={item.uf}>{item.name}</SelectItem>
                            })}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-4">
                    <Input onChange={(event) => handleInput(event)} placeholder="Filtre pela cidade (Opcional)" className="w-[200px]" />
                    <Button onClick={getCitys}>Buscar</Button>
                </div>
            </div>
            <div className="flex items-center justify-center">
                {modalOpen && (
                    <div className="p-2 border border-gray-200 overflow-y-scroll max-h-[30rem]">
                        <Table className="max-h-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Código IBGE</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {cities
                                ?.filter((item) => 
                                    inputValue === '' || item?.nome.toLowerCase().includes(inputValue.toLowerCase())
                                )
                                .map((item) => (
                                    <TableRow key={item?.nome}>
                                        <TableCell>{item?.nome}</TableCell>
                                        <TableCell>{item?.codigo_ibge}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                        </Table>
                    </div>
                )}
            </div>
                {!modalOpen && (
                    <div className="w-full h-full flex items-center justify-center">
                        <img className="w-72" draggable="false" src="undraw_code_thinking_re_gka2.svg" alt="" />
                    </div>
                )}      
            {isLoading && (
                <Loading />
            )}
        </>
    )
}

export default SearchIbge