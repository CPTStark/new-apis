export interface CnpjData {
    cnpj: string
    identificador_matriz_filial: number
    descricao_matriz_filial: string
    razao_social: string
    nome_fantasia: string
    situacao_cadastral: number
    descricao_situacao_cadastral: string
    data_situacao_cadastral: string
    motivo_situacao_cadastral: number
    codigo_natureza_juridica: number
    data_inicio_atividade: string
    cnae_fiscal: number
    cnae_fiscal_descricao: string
    descricao_tipo_de_logradouro: string
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cep: number
    uf: string
    codigo_municipio_ibge: string
    municipio: string
    ddd_telefone_1: string
    descricao_identificador_matriz_filial: string
    qualificacao_do_responsavel: number
    capital_social: number
    porte: number
    descricao_porte: string
    opcao_pelo_simples: boolean
    opcao_pelo_mei: boolean
    qsa: Qsa[]
  }
  
  export interface Qsa {
    identificador_de_socio: number
    nome_socio: string
    cnpj_cpf_do_socio: string
    codigo_qualificacao_socio: number
    percentual_capital_social: number
    data_entrada_sociedade: string
  }

 