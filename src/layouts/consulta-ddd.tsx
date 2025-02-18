import FirstTitle from "@/components/first-title";
import Loading from "@/components/loading";
// import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import type { dddData } from "@/interfaces/ddd";
import { useState } from "react";

const ddds = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, // São Paulo
    21, 22, 24, // Rio de Janeiro
    27, 28, // Espírito Santo
    31, 32, 33, 34, 35, 37, 38, // Minas Gerais
    41, 42, 43, 44, 45, 46, // Paraná
    47, 48, 49, // Santa Catarina
    51, 53, 54, 55, // Rio Grande do Sul
    61, // Distrito Federal
    62, 64, // Goiás
    63, // Tocantins
    65, 66, // Mato Grosso
    67, // Mato Grosso do Sul
    68, // Acre
    69, // Rondônia
    71, 73, 74, 75, 77, // Bahia
    79, // Sergipe
    81, 87, // Pernambuco
    82, // Alagoas
    83, // Paraíba
    84, // Rio Grande do Norte
    85, 88, // Ceará
    86, 89, // Piauí
    91, 93, 94, // Pará
    92, 97, // Amazonas
    95, // Roraima
    96, // Amapá
    98, 99 // Maranhão
  ];

function ConsultaDdd() {
    const [isLoading, setIsLoading] = useState(false);
    const [ddd, setDdd] = useState('')
    const [dataDdd , setDataDdd] = useState<dddData[] | null>(null)
    const [modalOpen, setIsModalOpen] = useState(false)

    async function getDdd() {
        if(ddd === '') {
            toast({description: 'Selecione um DDD'})
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${Number(ddd)}`)
            const data = await response.json()
            setDataDdd(data)
            console.log(data)

            setIsModalOpen(true)
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
                <FirstTitle>Discagem Direta à Distância (DDD)</FirstTitle>
            </div>
            <div className="w-full flex items-center justify-center gap-4">
                <div className="flex items-center justify-center w-[20%]">
                    <Label className="w-60">Selecione o DDD:</Label>
                    <Select onValueChange={setDdd}>
                        <SelectTrigger>
                            <SelectValue placeholder="DDD" />
                        </SelectTrigger>
                        <SelectContent>
                            {ddds.map((item) => {
                                return <SelectItem key={item} value={String(item)}>{item}</SelectItem>
                            })}
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={getDdd}>Buscar</Button>
            </div>
            <div className="flex items-center justify-center">
                {modalOpen && (
                    <div className="p-2 border border-gray-200 overflow-y-scroll max-h-[30rem]">
                        <Table className="max-h-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Cidades</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dataDdd?.map((item) => (
                                    <TableRow key={item?.state}>
                                        <TableCell>{item?.state}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
            {!modalOpen && (
                <div className="w-full h-full flex items-center justify-center">
                    <img className="w-72" draggable="false" src="undraw_contact-us_kcoa.svg" alt="" />
                </div>
            )}
            {
                modalOpen && (
                    <Card>
                        <CardHeader>
                            <CardTitle>DDD</CardTitle>
                        </CardHeader>
                        <CardContent>
                            teste
                        </CardContent>
                    </Card>
                )
            }
            {isLoading && (
                <Loading />
            )}
            <Toaster/> 
        </>
    )
}

export default ConsultaDdd