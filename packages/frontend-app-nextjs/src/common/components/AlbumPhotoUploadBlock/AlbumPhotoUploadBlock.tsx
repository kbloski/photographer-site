import Image from "next/image";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { createApiUrl } from "../../api/apiUtils";
import { webTokenManger } from "../../services/tokenManager";

type AlbumPhotoUploadBlockProps = {
    albumId: number;
};

export function AlbumPhotoUploadBlock({ albumId }: AlbumPhotoUploadBlockProps) {
    const MAX_FILES = 10;
    const MAX_FILE_SIZE = 1024 * 1024 * 3;
    const [files, setFiles] = useState<File[]>([]);
    const [message, setMessage] = useState<string>();


    function checkFileSize(file: File) {
        return file.size < MAX_FILE_SIZE;
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files?.length) return;

        const file = event.target.files[0];
        event.target.value = "";

        if (!checkFileSize(file)) {
            return setMessage("File size is too big")
        };

        setMessage("");
        setFiles((prev) => {
            return [...prev, file];
        });
    }

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log( files )
        const formData = new FormData();

        for (const file of files){
            formData.append('images', file)
        }

        fetch(
            createApiUrl(`/api/v1/photo/add/list/for-album/${albumId}`),
            {
                method: 'POST',
                headers: {
                    'authorization' : `Bearer ${webTokenManger.getLocalToken()}`
                },
                
                body: formData
            }
        ) .then( response => {
            if (!response.ok) throw new Error(response.statusText);

        }).catch(err => {
            setMessage( err.message )
        })

    }

    return (
        <div className="container p-2 bg-light">
            {message && <div className="alert alert-danger">{message}</div>}
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="row">
                    {files.map((file, index) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex" key={index}>
                            <Image
                                className="p-2"
                                src={URL.createObjectURL(file)}
                                alt=""
                                width={0}
                                height={0}
                            />
                        </div>
                    ))}
                    {files.length < MAX_FILES && (
                        <div className="col-12 p-2 justify-content-center d-flex">
                            <label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                ></input>
                            </label>
                        </div>
                    )}
                </div>
                <div>
                    <button type="submit" className="btn btn-success">
                        Dodaj zdjęcia
                    </button>
                </div>
            </form>
        </div>
    );
}
