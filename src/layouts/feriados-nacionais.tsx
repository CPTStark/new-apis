import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { TableBody, TableCell, TableHead } from '@/components/ui/table'
import { Button } from "@/components/ui/button"
import Loading from "@/components/loading"
import { Holidays } from "@/interfaces/holidays"
import { Table, TableHeader, TableRow } from "@/components/ui/table"
import FirstTitle from "@/components/first-title"
import ModalCenter from "@/components/modal-center"

function NationalHolidays() {
    const [isLoading, setIsLoading] = useState(false);
    const [tableHolidays, setIsTableHolidays] = useState(false)
    const [selectedYear, setSelectedYear] = useState('2024');
    const [dataHolidays, setDataHolidays] = useState<Holidays[] | null>(null)

    const years = []

    for(let year = 2000; year <= 2050; year++) {
        years.push(year)
    }

    const yearValues = years.map((year) => year.toString())

    const handleChange = (value: string) => {
        setSelectedYear(value);
    };

    async function getHolidays() {
        setIsTableHolidays(false);
        setIsLoading(true);

        try {
            const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${selectedYear}`)
            const data = await response.json();
            setDataHolidays(data);
            
            setIsTableHolidays(true)

        } catch(err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <>
            <ModalCenter>
                <div>
                    <FirstTitle>Feriados Nacionais</FirstTitle>
                </div> 
                <div className="flex items-center justify-center gap-6">
                    <div className="w-72">
                        <Select defaultValue={'2024'} onValueChange={handleChange}>
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                {yearValues.map((year) => {
                                    return <SelectItem key={year} value={year}>{year}</SelectItem>
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button variant={'ghost'} onClick={() => getHolidays()}>Filtrar</Button>
                </div>
                <div className="w-full h-full">
                    {!tableHolidays && (
                        <div className="w-full h-full flex justify-center items-center">
                            <img className="w-64" src="undraw_online_calendar_re_wk3t.svg" alt="" />
                        </div>
                    )}
                    {tableHolidays && (
                        <div className="w-full h-full">
                            <div className="w-[75%] m-auto h-auto p-4 border border-gray-300 rounded-md">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Data</TableHead>
                                            <TableHead>Feriado</TableHead>
                                            <TableHead>Tipo</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {dataHolidays?.map((data) => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{data?.date.split('-').reverse().join('-')}</TableCell>
                                                    <TableCell>{data?.name}</TableCell>
                                                    {data?.type === 'national' ? <TableCell>Nacional</TableCell> : 'Indefinido'}
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                </div>
            </ModalCenter>
            {isLoading && (
                <Loading/>
            )}
        </>
    ) 
}

export default NationalHolidays