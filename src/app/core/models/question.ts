export interface IQuestions {
    _id: number
    step: string
    items: IQuestion[]
}

export interface IQuestion {
    _id: number
    title: string
    comment: any
    multiple: boolean
    options: IQuestionOption[]
}

export interface IQuestionOption {
    _id: number
    text: string
    amount?: number
}