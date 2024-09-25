"use client";

import { AlbumType } from "shared/src/types/AlbumType";
import { createApiUrl } from "../../common/api/apiUtils";
import { useFetch } from "../../common/hooks/useFetch";
import { AlbumCard } from "../../common/components/AlbumCard/AlbumCart";
import { useCheckLogged } from "../../common/hooks/useCheckLogged";
import { AlbumAddModal } from "../../common/components/AlbumAddModal/AlbumAddModal";
import { useEffect, useState } from "react";

export default function AlbumPage() {
    const { logged, user } = useCheckLogged();
    const [albums, setAlbums] = useState<AlbumType[]>([]);
    const fetchAlbums = useFetch(createApiUrl("/api/v1/album/all"), {
        method: "get",
    });

    useEffect(() => {
        const albums = fetchAlbums.data?.albums ?? undefined;
        if (albums) setAlbums(albums);
    }, [fetchAlbums.data]);

    return (
        <div className="container p-3">
            <div className="d-flex">
                <h1>Gallery</h1>
                {logged && user?.role === "admin" && (
                    <AlbumAddModal refreshFetch={fetchAlbums.refresh} />
                )}
            </div>
            <div>
                <div className="row">
                    {fetchAlbums.loading ? (
                        <div className="text-center">
                            <span className="spinner-border"></span>
                            Ładowanie
                        </div>
                    ) : (
                        <>
                            {albums?.length ? (
                                albums.map((album, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="col-12 col-sm-6 col-md-4 col-lg-3 "
                                        >
                                            <AlbumCard
                                                album={album}
                                                refreshFetch={() =>
                                                    fetchAlbums.refresh()
                                                }
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <h1 className="text-center text-secondary">
                                    Brak albumów
                                </h1>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
