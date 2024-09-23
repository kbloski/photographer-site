import { useEffect, useState } from "react";
import { webTokenManger } from "../services/tokenManager";
import { UserType } from 'shared/src/types/UserType';

export const useCheckLogged = () => {
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState<UserType | undefined>(
        webTokenManger.getLocalTokenDecoded().decoded
    );
    
    useEffect(() => {
        const checkAuthStatus = () => {
            const tokenData = webTokenManger.getLocalTokenDecoded()
            if (user?.id || !logged ){
                setLogged(tokenData.valid )
            }
            if (tokenData.decoded?.id !== user?.id) {
                setUser( tokenData.decoded );
                setLogged(tokenData.valid )
            }
            
        };

        const interval = setInterval(checkAuthStatus, 100);

        return () => clearInterval(interval); 
    }, [logged, user]); 
    return { logged, user };
};
