import { ChangeEvent, useState } from "react";
import { AlbumSchema } from "shared/src/schemas/AlbumSchema";
import { generateZodErrorString } from "../../utils/zodErrorUtils";
import {  ZodError } from "zod";
import { createApiUrl } from "../../api/apiUtils";
import { webTokenManger } from "../../services/tokenManager";
import { manualDropModalBootstrap } from "../../helpers/bootstrapHelper";

type AlbumAddModalProps = {
    refreshFetch?: () => void
}

export function AlbumAddModal( { refreshFetch } : AlbumAddModalProps) {
    const [modalId, setModalId] = useState<string>();
    const [albumData, setAlbumData] = useState({});
    const [errorMessage, setErrorMsg] = useState<string>();

    useState(() => {
        const modalId = `modalAlbum${Math.round(Math.random() * 1000)}`;
        setModalId(modalId);
    });

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const value = event.target.value;
        setAlbumData((prev) => {
            setErrorMsg('')
            const newData: Record<string, string> = { ...prev };
            newData[name] = value;

            try {
                AlbumSchema.parse( newData );
            } catch (err) {
                setErrorMsg( generateZodErrorString(err as ZodError) );
            }

            return newData;
        });
    }

    function onSubmit( event : React.FormEvent){
        event.preventDefault();

        fetch(
            createApiUrl('/api/v1/album/add'),
            {
                method: 'post',
                headers: {
                    'Content-Type' : 'application/json',
                    'authorization' : `Bearer ${webTokenManger.getLocalToken()}`
                },
                body: JSON.stringify( albumData )
            }
        ).then(
            response => {
                if (!response.ok) throw new Error();
                if (refreshFetch) refreshFetch();

                const modalElement = document.getElementById( String(modalId ))
                if (modalElement) manualDropModalBootstrap( modalElement );
            }
        ).catch( 
           () => setErrorMsg( errorMessage )
        )
       
    }

    return (
        <>
            <div>
                <button
                    className="btn btn-success ms-4"
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalId}`}
                >
                    +Add Album
                </button>
            </div>

            <div className="modal fade" id={modalId} data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content p-2">
                        <div className="modal-header">
                            <h5>Formularz dodania albumu</h5>
                            <button
                                className="btn btn-danger btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className={
                                    "alert " +
                                    (errorMessage ? "alert-danger" : "d-none")
                                }>
                            {errorMessage}
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <label
                                    htmlFor="nameControl"
                                    className="form-label"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="nameControl"
                                    className="form-control "
                                    required
                                    onChange={onChange}
                                />
                                <label
                                    htmlFor="descriptionControl"
                                    className="form-label"
                                >
                                    Description
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    id="descriptionControl"
                                    className="form-control"
                                    onChange={onChange}
                                />
                                <div className="d-flex justify-content-end pt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
