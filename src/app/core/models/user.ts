import { ICompany } from "./company";

export interface IUser {
    id?: string
    fullname: string
    password: string
    email: string
    accept?: boolean
    company?: ICompany[]
}
