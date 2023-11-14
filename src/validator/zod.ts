import { type Request, type Response, type NextFunction } from 'express'

const ValidateZod = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(
                req.body
            )
            next()
        } catch (e: any) {
            const errorMessage: string[] = [];
            e.errors.map((err: any) => {
                errorMessage.push(`errorField: ${err.path.join('.')} Message: ${err.message}`)
            })
            return res.status(400).json({ status: false, message: errorMessage })
        }
    }
}

export default ValidateZod
