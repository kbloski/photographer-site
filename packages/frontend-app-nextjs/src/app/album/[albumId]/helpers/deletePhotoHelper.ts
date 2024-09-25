import { createApiUrl } from "packages/frontend-app-nextjs/src/common/api/apiUtils";
import { webTokenManger } from "packages/frontend-app-nextjs/src/common/services/tokenManager";

export function deletePhoto(id: number, callbackFinally?: () => void) {
    fetch(createApiUrl(`/api/v1/photo/${id}`), {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${webTokenManger.getLocalToken()}`,
        },
    })
        .then((response) => {
            if (!response.ok) throw new Error(response.statusText);
            // fetchPhotos.refresh();
        })
        .finally( () => { 
            if (callbackFinally) callbackFinally();
        } )
}