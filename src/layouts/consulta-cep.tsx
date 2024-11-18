import { ChangeEvent, useState } from "react";
import { CepData } from '../interfaces/cep'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import Loading from "@/components/loading";
import FirstTitle from '@/components/first-title'
import ModalCenter from "@/components/modal-center";

function SearchCep() {
    const [isLoading, setIsLoading] = useState(false);
    const [cepInputValue, setIsCnpjInputValue] = useState('')
    const [dataCep, setIsDataCep] = useState<CepData | null>(null)
    const [modalCep, setIsModalCep] = useState(false)

    function formatCep(value: string) {
        const onlyNumbers = value.replace(/\D/g, '');
        const formattedCep = onlyNumbers.replace(/^(\d{5})(\d)/, '$1-$2');
        return { onlyNumbers, formattedCep };
    }
    

    function getCepInput(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        const { onlyNumbers, formattedCep } = formatCep(inputValue)

        setIsCnpjInputValue(onlyNumbers);

        event.target.value = formattedCep
    }

    async function getCep() {
        if(cepInputValue === '') {
            alert('Digite um CNPJ')
            return
        } 

        setIsLoading(true);

        try {
            const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cepInputValue}`);
            const data = await response.json()
            setIsDataCep(data)
            setIsModalCep(true)
        } catch(err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

   return (
    <>
        <ModalCenter>
            <div>
                <FirstTitle>Código de Endereçamento Postal (CEP)</FirstTitle>
            </div>
            <div className="w-full h-full flex flex-col gap-12">
                <div className="flex items-center justify-center gap-3">
                    <Input onChange={getCepInput} className="w-[24%]" placeholder="Digite um CEP..." minLength={9} maxLength={9} />
                    <Button onClick={getCep}>Buscar</Button>
                </div>
                <div className="w-full h-full">
                    {!modalCep && (
                        <div className="w-full h-full flex items-center justify-center">
                            <img className="w-64" draggable='false' src="undraw_location_tracking_re_n3ok.svg" alt="" />
                        </div>
                    )}
                    {modalCep && (
                        <Card className="w-[400px] m-auto">
                            <CardHeader>
                                <CardTitle>Resultado da consulta CEP:</CardTitle>
                                <CardDescription>{dataCep?.cep}</CardDescription>
                                <div className="border-b-2 border-gray-300"></div>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-3">
                                <div className="bg-gray-100 p-2 rounded-lg">
                                    <p>Estado</p>
                                    <span className="text-sm text-slate-700">{dataCep?.state ?? 'Indefinido'}</span>
                                </div>
                                <div className="bg-gray-100 p-2 rounded-lg">
                                    <p>Cidade</p>
                                    <span className="text-sm text-slate-700">{dataCep?.city ?? 'Indefinido'}</span>
                                </div>
                                <div className="bg-gray-100 p-2 rounded-lg">
                                    <p>Bairro</p>
                                    <span className="text-sm text-slate-700">{dataCep?.neighborhood ?? 'Indefinido'}</span>
                                </div>
                                <div className="bg-gray-100 p-2 rounded-lg">
                                    <p>Rua</p>
                                    <span className="text-sm text-slate-700">{dataCep?.street ?? 'Indefinido'}</span>
                                </div>
                                <div className="bg-gray-100 p-2 rounded-lg">
                                    <p>Coordenadas</p>
                                    <ul className="ml-3">
                                        <li className="flex items-center gap-2">
                                            <p className="text-sm">Longitude:</p>
                                            <span className="text-xs text-slate-700">{dataCep?.location?.coordinates?.longitude ?? 'Indefinido'}</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <p className="text-sm">Latitude:</p>
                                            <span className="text-xs text-slate-700">{dataCep?.location?.coordinates?.latitude ?? 'Indefinido'}</span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </ModalCenter>
        {isLoading && (
            <Loading/>
        )}
    </>
   ) 
}

export default SearchCep