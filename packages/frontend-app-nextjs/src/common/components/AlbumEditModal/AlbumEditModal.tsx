import { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { AlbumType } from "shared/src/types/AlbumType";
import { AlbumSchema } from "shared/src/schemas/AlbumSchema";
import { useFetch } from "../../hooks/useFetch";
import { createApiUrl } from "../../api/apiUtils";
import { webTokenManger } from "../../services/tokenManager";
import { ZodError } from "zod";
import { generateZodErrorString } from "../../utils/zodErrorUtils";
import { manualDropModalBootstrap } from "../../helpers/bootstrapHelper";

type AlbumEditModalProps = {
    albumId: number;
    fetchRefresh?: ()=> void
};

export const AlbumEditModal: NextPage<AlbumEditModalProps> = ({ albumId, fetchRefresh }) => {
    const [modalId, setModalId] = useState<string>();
    const [albumData, setAlbumData] = useState<Partial<AlbumType>>({});
    const [validMessage, setValidMessage] = useState<string>();
    const fetchAlbum = useFetch(createApiUrl(`/api/v1/album/${albumId}`), {
        method: "GET",
    });

    useEffect(() => {
        const id = `modalAlbumUpdate${Math.round(Math.random() * 1000)}`;
        setModalId(id);
    }, []);

    useEffect(() => {
        const album = fetchAlbum?.data?.album;
        if (album) {
            setAlbumData( {
                name: album.name,
                description: album.description
            });
        }
    }, [fetchAlbum.loading, fetchAlbum.data]);

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const value = event.target.value;

        setAlbumData((prev) => {
            const newAlbumData: Record<string, unknown> = { ...prev };
            newAlbumData[name] = value;

            try{ 
                AlbumSchema.partial().parse(newAlbumData)
                setValidMessage(undefined)
            } catch (err){
                setValidMessage( generateZodErrorString(err as ZodError))
            }

            return newAlbumData;
        });
    }

    function onSubmit(event: React.FormEvent) {
        event.preventDefault();

        fetch(
            createApiUrl(`/api/v1/album/${albumId}`),
            {
                method: 'PATCH',
                headers: {
                    'authorization' : `Bearer ${webTokenManger.getLocalToken()}`,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify( albumData )
            }
        ).then( response => {
            if (!response.ok) throw new Error( response.statusText );

            if (fetchRefresh) fetchRefresh();

            const modalElement = document.getElementById( String(modalId) );
            if (modalElement) manualDropModalBootstrap( modalElement )
        }
        ).catch( err => setValidMessage( err.message ) )
    }

    return (
        <>
            <div>
                <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalId}`}
                    onChange={fetchAlbum.refresh}
                >
                    Edytuj Album
                </button>
            </div>

            <div className="modal fade" id={modalId} data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content p-2">
                        <div className="modal-header">
                            <h1>Edit album #{albumId}</h1>
                            <button
                                className="btn btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">

                            <div className={"alert " + ( !validMessage ? "alert-success" : "alert-danger")}>
                                {validMessage ?? 'Success Validation'}
                            </div>


                            <form onSubmit={onSubmit}>
                                <div>
                                    <label
                                        htmlFor="nameControl"
                                        className="form-label"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="nameControl"
                                        name="name"
                                        className="form-control"
                                        onChange={onChange}
                                        value={albumData.name ?? ''}
                                    ></input>
                                </div>
                                <div>
                                    <label
                                        htmlFor="descriptionControl"
                                        className="form-label"
                                    >
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        id="descriptionControl"
                                        name="description"
                                        className="form-control"
                                        onChange={onChange}
                                        value={albumData.description ?? ''}
                                    ></input>
                                </div>
                                <div className="d-flex justify-content-end p-2">
                                    <button
                                        className="btn btn-warning"
                                        type="submit"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
