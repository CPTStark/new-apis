import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FirstTitle from "@/components/first-title"
import ModalCenter from "@/components/modal-center"
import Loading from "@/components/loading"
import { IbgeData } from "@/interfaces/ibge"

interface Estados {
    id: number;
    nome: string;
    uf: string;
}

function SearchIbge() {
    const [isLoading, setIsLoading] = useState(false)
    const [state, setStateSelect] = useState('')
    const [city, setCity] = useState<IbgeData | null>(null)

      
    const estados: Estados[] = [
    { id: 1, nome: "Acre", uf: "AC" },
    { id: 2, nome: "Alagoas", uf: "AL" },
    { id: 3, nome: "Amapá", uf: "AP" },
    { id: 4, nome: "Amazonas", uf: "AM" },
    { id: 5, nome: "Bahia", uf: "BA" },
    { id: 6, nome: "Ceará", uf: "CE" },
    { id: 7, nome: "Distrito Federal", uf: "DF" },
    { id: 8, nome: "Espírito Santo", uf: "ES" },
    { id: 9, nome: "Goiás", uf: "GO" },
    { id: 10, nome: "Maranhão", uf: "MA" },
    { id: 11, nome: "Mato Grosso", uf: "MT" },
    { id: 12, nome: "Mato Grosso do Sul", uf: "MS" },
    { id: 13, nome: "Minas Gerais", uf: "MG" },
    { id: 14, nome: "Pará", uf: "PA" },
    { id: 15, nome: "Paraíba", uf: "PB" },
    { id: 16, nome: "Paraná", uf: "PR" },
    { id: 17, nome: "Pernambuco", uf: "PE" },
    { id: 18, nome: "Piauí", uf: "PI" },
    { id: 19, nome: "Rio de Janeiro", uf: "RJ" },
    { id: 20, nome: "Rio Grande do Norte", uf: "RN" },
    { id: 21, nome: "Rio Grande do Sul", uf: "RS" },
    { id: 22, nome: "Rondônia", uf: "RO" },
    { id: 23, nome: "Roraima", uf: "RR" },
    { id: 24, nome: "Santa Catarina", uf: "SC" },
    { id: 25, nome: "São Paulo", uf: "SP" },
    { id: 26, nome: "Sergipe", uf: "SE" },
    { id: 27, nome: "Tocantins", uf: "TO" }
    ];
    

      const handleChange = (value: string) => {
        setStateSelect(value)
      }
      
      async function getCitys() {
        setIsLoading(true)

        try {
            const response = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${state}?providers=dados-abertos-br,gov,wikipedia`);
            const data = await response.json()
            setCity(data)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
      }

    return (
        <ModalCenter>
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
                                return <SelectItem key={item.id} value={item.uf}>{item.nome}</SelectItem>
                            })}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-4">
                    <Input placeholder="Filtre pela cidade (Opcional)" className="w-[200px]"/>
                    <Button onClick={getCitys}>Buscar</Button>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <h1 className="font-bold text-5xl">Em desenvolvimento...</h1>
            </div>
            {isLoading && (
                <Loading />
            )}
        </ModalCenter>
        // undraw_code_thinking_re_gka2.svg
    )
}

export default SearchIbge