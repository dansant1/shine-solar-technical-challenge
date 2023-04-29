//@ts-nocheck
import {
    Response,
} from 'express'
import { SERVICE, GLOBAL, errors } from './constants'


export const manageError = (res: Response, error: any, statusCode?: number): Response<any, Record<string, any>> => {
    const errorDetail = error?.response?.data
    if (errorDetail) {
        console.log('Error=', errorDetail)
        return res
            .status(statusCode || 500)
            .json({
                code: errorDetail.code, message: errorDetail.message,
                ...((errorDetail?.errors) ? { errors: errorDetail.errors } : ''),
                ...((error.codeEncrypted) ? { codeEncrypted: error.codeEncrypted } : '')
            })
    }
    console.log('Error=', error)
    return res
        .status(statusCode || 500)
        .json({
            code: (error.code) ? error.code : `${SERVICE}-${GLOBAL.ERROR}`,
            message: error.message,
        })

}

export class GenericError extends Error {
    code: string
    constructor(code: string) {
        super(errors[code].message)
        this.code = code
    }
}

export function throwError(code: string) {
    throw new GenericError(code)
}