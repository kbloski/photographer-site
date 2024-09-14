import jwt, {SignOptions} from 'jsonwebtoken';
import { UserType } from '../types/UserType';

class WebTokenManager{
    private SECRET_KEY = process.env.JWT_SECRET as string;
    constructor(){
        if (!this.SECRET_KEY) throw new Error("ERROR TOKEN KEY");

    }

    createWebtoken (
        payloadData : UserType,
        optionst: SignOptions = {
            expiresIn: '1d'
        }
    ) : string {
        const token = jwt.sign(payloadData, this.SECRET_KEY , optionst);
        return token;
    }

    verifyWebToken(token : string){
        if (!token) return { valid: false};

        try {
            const decoded : string | jwt.JwtPayload = jwt.verify( token, this.SECRET_KEY);
            return { valid: true, decoded };
        } catch (err : jwt.VerifyErrors | any ){
            return { valid: false, error: 'Invalid token', details: err?.message }
        }
    }
}

export const webTokenManager = new WebTokenManager();