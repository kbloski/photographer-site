"use client";

import { redirect } from "next/navigation";
import { NextPage } from "next/types";
import { createApiUrl } from "packages/frontend-app-nextjs/src/common/api/apiUtils";
import { AlbumEditModal } from "packages/frontend-app-nextjs/src/common/components/AlbumEditModal/AlbumEditModal";
import { AlbumPhotoUploadBlock } from "packages/frontend-app-nextjs/src/common/components/AlbumPhotoUploadBlock/AlbumPhotoUploadBlock";
import { useCheckLogged } from "packages/frontend-app-nextjs/src/common/hooks/useCheckLogged";
import { useFetch } from "packages/frontend-app-nextjs/src/common/hooks/useFetch";
import { useEffect, useState } from "react";
import { AlbumType } from "shared/src/types/AlbumType";
import { PhotoType } from "shared/src/types/PhotoType";

type AlbumPageProps = {
    params: {
        albumId: string;
    };
};

const AlbumPage: NextPage<AlbumPageProps> = ({ params }) => {
    const { logged, user } = useCheckLogged();
    const { albumId } = params;
    const [album, setAlbum] = useState<AlbumType>();
    const [photos, setPhotos] = useState<Omit<PhotoType, "url">[]>();

    const fetchAlbum = useFetch(createApiUrl(`/api/v1/album/${albumId}`), {
        method: "get",
    });
    const fetchPhotos = useFetch(
        createApiUrl(`/api/v1/photo/list/for-album/${albumId}`),
        { method: "get" }
    );

    useEffect(() => {
        const photos = fetchPhotos?.data?.albumPhotos;
        setPhotos(photos);
    }, [fetchPhotos.loading, fetchPhotos.data]);

    useEffect(() => {
        const album = fetchAlbum.data?.album;
        if (!fetchAlbum.loading) {
            setAlbum(album);

            if (!album) redirect("/album");
        }
    }, [fetchAlbum.data, fetchAlbum.loading]);

    return (
        <div className="container p-2">
            <div className="card">
                <div className="card-body">
                    {fetchAlbum.loading ? (
                        <h1 className="text-center">
                            <span className="spinner-border text-secondary">
                                <h1 className="visually-hidden">Ładowanie</h1>
                            </span>
                        </h1>
                    ) : (
                        <>
                            <h3 className="card-title  text-center">
                                Album #{album?.id}: &quot;{album?.name}&quot;
                            </h3>
                            {album?.description && (
                                <div className="row">
                                    <h4 className="card-title">Description:</h4>
                                    <p className="card-text p-4">
                                        {album.description}
                                    </p>
                                </div>
                            )}
                            {   logged && user?.role === 'admin' &&
                                <AlbumEditModal albumId={Number(albumId)} fetchRefresh={fetchAlbum.refresh}/>
                            }
                        </>
                    )}
                </div>
            </div>
            { logged && user?.role === 'admin' && <AlbumPhotoUploadBlock albumId={ Number(albumId)} />}
            <div>
                {fetchPhotos.loading ? (
                    <h1>Ładowanie</h1>
                ) : photos?.length ? (
                    <>
                        <h1>Zdjęcia</h1>
                        {photos?.map((photo) => (
                            <div key={photo.id}>Moje zdjęcia</div>
                        ))}
                    </>
                ) : (
                    <h1 className="text-secondary p-2">
                        Album nie posiada żadnych zdjęć
                    </h1>
                )}
            </div>
        </div>
    );
};

export default AlbumPage;
