import {admin} from "../config/firebase"
import { Request } from "express"
export interface CustomerRequest extends Request {
    user?: admin.auth.DecodedIdToken
}