import { Request, Response, NextFunction } from "express";


export default function serverErrorHandler<TReq extends Request, TRes extends Response>(fn : (req : TReq, res : TRes, next? : NextFunction) => Promise<void>) {
    return (req: TReq, res: TRes, next: NextFunction) => {
        fn(req, res, next)
        .catch(error => {
            console.log("Internal server error : ", error.message);
            res.status(500).json({
                "error" : "Internal server error: " + error.message 
            });
        });
    };
}

