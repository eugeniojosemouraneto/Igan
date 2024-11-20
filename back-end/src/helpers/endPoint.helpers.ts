import { FastifyReply } from "fastify"

export function logEndPoint(endPoint: string, structuralFunctionCode:string, statusCode: number, message: string | [] | unknown)  {
    console.log(`end-point: [ ${endPoint} ]\nend-point: [ ${structuralFunctionCode} ]\nstatus code: [ ${statusCode} ]\nmessage: [ ${message} ]`)
}

export function ErrorEndPoint(repliy: FastifyReply, endPoint:string, structuralFunctionCode:string, statusCode: number, message: string, _error: Error | unknown | string = "Undetermined error") {
    console.log(`end-point: [ ${endPoint} ]\nend-point: [ ${structuralFunctionCode} ]\nstatus code: [ ${statusCode} ]\nmessage: [ ${message} ]\nerror: [${_error}]`)
    return repliy
            .status(statusCode)
            .send({
                statusCode: statusCode,
                menssage: message,
                error: _error
            })
}