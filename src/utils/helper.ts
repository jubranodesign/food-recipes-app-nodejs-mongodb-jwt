
import { Response, NextFunction } from "express";
import ConfigResponse from "../models/ConfigResponse";


class helperUtil {

    static getErrorMessage(error: unknown): string {
        if (error instanceof Error) return error.message;
        return String(error);
    }

    static async processResponse(config: ConfigResponse, res: Response, next: NextFunction) {
        try {
            if (config.body === undefined && config.id === undefined) {
                res.status(200).send(await config.callback());
            } else if (config.id !== undefined) {
                res.status(200).send(await config.callback(config.id));
            } else if (config.body !== undefined) {
                res.status(200).send(await config.callback(config.body));
            }
            next();
        } catch (error) {
            next(error)
        }
    }

}

export default helperUtil;