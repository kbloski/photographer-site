import { EmotionsObject } from "packages/shared/src/types/ReactionType";
import { createApiUrl } from "../../../api/apiUtils";
import { webTokenManger } from "../../../services/tokenManager";

type sendReactionProps = {
    reaction: number;
    albumId?: number;
    photoId?: Number;
    callbackSuccess?: () => void
}

export default function sendReaction(
    { reaction, albumId, photoId, callbackSuccess} : sendReactionProps
        
) {
    if (!Object.values( EmotionsObject ).includes( reaction as any)){
        console.error( 'Bad reaction type')
        return;
    } 

    fetch(createApiUrl(`/api/v1/reaction?albumId=${albumId ?? ''}&photoId=${photoId ?? ''}`), {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            'authorization' : `Bearer ${webTokenManger.getLocalToken()}`,
        },
        body: JSON.stringify({ reaction }),
    })
    .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        if (callbackSuccess) callbackSuccess();
    })
    .catch((err) => console.error(err.message));
}