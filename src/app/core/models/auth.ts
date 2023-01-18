import { ICompany, ICompanyResponse } from "./company"
import { IUser } from "./user"

export interface IAuth {
    email: string
    password: string
    code?: string
}

export interface IAuthResponse {
    token: string
    user: IUser
    company: ICompanyResponse | null
}
