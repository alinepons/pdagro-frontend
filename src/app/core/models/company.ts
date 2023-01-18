export interface ICompany {
    id?: string
    user?: string
    name: string
    cnpj: string
    info: any
}

export interface ICompanyResponse {
    id: string
    user: string
    name: string
    cnpj: string
    info: any
}