
import {IUser} from "../../models/user"
import {Request} from "express"
interface AuthRequest extends Request{
    user?: IUser
}
interface TokenRequest<DecodedTokenArray extends Array<string>> extends Request{
    body : {
        verifiedEntries : { [K in DecodedTokenArray[number]]: string },
    }
    query : {
        token : string
    }
}

export {
    AuthRequest,
    TokenRequest
}