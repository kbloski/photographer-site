import { createApiUrl } from "../../../api/apiUtils";
import { webTokenManger } from "../../../services/tokenManager";

export default function onClickDelete(id: number, callbackSuccess?: ()=> void) {
    fetch(createApiUrl(`/api/v1/album/${id}`), {
        method: "delete",
        headers: {
            authorization: `Bearer ${webTokenManger.getLocalToken()}`,
        },
    }).then((response) => {
        if (!response.ok) throw new Error();
        if( callbackSuccess) callbackSuccess();
    });
}