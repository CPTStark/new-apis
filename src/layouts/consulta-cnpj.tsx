import { ChangeEvent, useState } from "react";
// import { useEffect } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Loading from "@/components/loading";
import { CnpjData } from '../interfaces/cnpj'
import FirstTitle from "@/components/first-title";
import ModalCenter from "@/components/modal-center";

function SearchCnpj() {
    const [isLoading, setIsLoading] = useState(false)
    const [cnpjInputValue, setIsCnpjInputValue] = useState('')
    const [dadosCnpj, setIsDadosCnpj] = useState<CnpjData | null>(null)
    const [modalCnpj, setIsModalCnpj] = useState(false)

    function formatCnpj(value: string) {
        const onlyNumbers = value.replace(/\D/g, '');
    
        const formattedCnpj = onlyNumbers
          .replace(/^(\d{2})(\d)/, '$1.$2')
          .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
          .replace(/\.(\d{3})(\d)/, '.$1/$2')
          .replace(/(\d{4})(\d)/, '$1-$2');
    
        return { onlyNumbers, formattedCnpj };
      }
    
      function getCnpjInput(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        const { onlyNumbers, formattedCnpj } = formatCnpj(inputValue);
    
        setIsCnpjInputValue(onlyNumbers);
    
        event.target.value = formattedCnpj;
      }

    async function getCnpj() {
        if(cnpjInputValue === '') {
            alert('Digite um CNPJ')
            return
        } 

        setIsModalCnpj(false);
        setIsLoading(true);

        try {
            const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjInputValue}`);
            const data = await response.json()
            setIsDadosCnpj(data)
            setIsModalCnpj(true)
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
                    <FirstTitle>Cadastro Nacional da Pessoa Jurídica (CNPJ)</FirstTitle>
                </div>
                <div className="w-full h-full flex flex-col gap-12">
                    <div className="flex items-center justify-center gap-3">
                        <Input onChange={getCnpjInput} className="w-[24%]" placeholder="Digite um CNPJ..." minLength={18} maxLength={18} />
                        <Button onClick={getCnpj}>Buscar</Button>
                    </div>
                    <div className="w-full h-full relative">
                    {!modalCnpj && (
                        <div className="w-full h-full flex items-center justify-center">
                            <img className="w-64" draggable="false" src="undraw_mobile_search_jxq5.svg" alt="" />
                        </div>
                    )}
                        {
                            modalCnpj && dadosCnpj && (
                                <div className="w-full flex items-center justify-center">
                                    <Card className="w-96">
                                        <CardHeader>
                                            <CardTitle>{dadosCnpj.razao_social}</CardTitle>
                                            <CardDescription>Dados da busca do CNPJ</CardDescription>
                                            <div className="border-b-2 border-gray-300"></div>
                                        </CardHeader>
                                        <CardContent className="flex flex-col gap-3">
                                            <div className="bg-gray-100 p-2 rounded-lg">
                                                <p>CNPJ</p>
                                                <span className="text-sm text-slate-700">{dadosCnpj.cnpj ?? 'Indefinido'}</span>
                                            </div>
                                            <div className="bg-gray-100 p-2 rounded-lg">
                                                <p>Situação Cadastral</p>
                                                <span className="text-sm text-slate-700">{dadosCnpj.descricao_situacao_cadastral ?? 'Indefinido'}</span>
                                            </div>
                                            <div className="bg-gray-100 p-2 rounded-lg">
                                                <p>UF</p>
                                                <span className="text-sm text-slate-700">{dadosCnpj.uf ?? 'Indefinido'}</span>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex items-center justify-center">
                                            <Dialog>
                                                <DialogTrigger className="w-full">
                                                    <Button className="w-full">Visualizar dados completos</Button>
                                                </DialogTrigger>
                                                <DialogContent className="w-full">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-2xl">Dados Completos (CNPJ)</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="w-full h-full grid grid-cols-2 gap-6">
                                                        <div className="border-r-2 border-gray-100">
                                                            <h2 className="text-xl text-black font-semibold">Dados empresariais</h2>
                                                            <div className="mt-4 flex flex-col gap-3">
                                                                <div>
                                                                    <p className="text-zinc-950 font-semibold">CNPJ:</p>
                                                                    <span className="text-xs">{dadosCnpj.cnpj ?? 'Indefinido'}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-zinc-950 font-semibold">Fantasia:</p>
                                                                    <span className="text-xs">{dadosCnpj.nome_fantasia ?? 'Indefinido'}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-zinc-950 font-semibold">Razão Social:</p>
                                                                    <span className="text-xs">{dadosCnpj.razao_social ?? 'Indefinido'}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-zinc-950 font-semibold">Nome responsável</p>
                                                                    <span className="text-xs">{dadosCnpj.qsa[0].nome_socio ?? 'Indefinido'}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-zinc-950 font-semibold">Telefone</p>
                                                                    <span className="text-xs">{dadosCnpj.ddd_telefone_1 ?? 'Indefinido'}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-zinc-950 font-semibold">Porte</p>
                                                                    <span className="text-xs">{dadosCnpj.porte ?? 'Indefinido'}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-zinc-950 font-semibold">Situação Cadastral</p>
                                                                    <span className="text-xs">{dadosCnpj.descricao_situacao_cadastral ?? 'Indefinido'}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-zinc-950 font-semibold">Identificador</p>
                                                                    <span className="text-xs">{dadosCnpj.descricao_identificador_matriz_filial ?? 'Indefinido'}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h2 className="text-xl text-black font-semibold">Endereço</h2>
                                                            <div className="mt-4 flex flex-col gap-3">
                                                                <div>
                                                                    <p className="text-zinc-950 font-semibold">CEP:</p>
                                                                    <span className="text-xs">{dadosCnpj.cep ?? 'Indefinido'}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-zinc-950 font-semibold">Estado:</p>
                                                                    <span className="text-xs">{dadosCnpj.uf ?? 'Indefinido'}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-zinc-950 font-semibold">Município:</p>
                                                                    <span className="text-xs">{dadosCnpj.municipio ?? 'Indefinido'}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-zinc-950 font-semibold">Código IBGE Munícipio:</p>
                                                                    <span className="text-xs">{dadosCnpj.codigo_municipio_ibge ?? 'Indefinido'}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-zinc-950 font-semibold">Bairro:</p>
                                                                    <span className="text-xs">{dadosCnpj.bairro ?? 'Indefinido'}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-zinc-950 font-semibold">Logradouro:</p>
                                                                    <span className="text-xs">{dadosCnpj.logradouro ?? 'Indefinido'}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-zinc-950 font-semibold">Número:</p>
                                                                    <span className="text-xs">{dadosCnpj.numero ?? 'Indefinido'}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </CardFooter>
                                    </Card>
                                </div>
                            )
                        }
                    </div>
                </div>
            </ModalCenter>
        {isLoading && (
            <Loading />
        )}
        </>
    )
}

export default SearchCnpj