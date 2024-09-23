"use client";

import { AlbumType } from "shared/src/types/AlbumType";
import { createApiUrl } from "../../common/api/apiUtils";
import { useFetch } from "../../common/hooks/useFetch";
import { AlbumCard } from "../../common/components/AlbumCard/AlbumCart";
import { useCheckLogged } from "../../common/hooks/useCheckLogged";
import Link from "next/link";
import { AlbumAddModal } from "../../common/components/AlbumAddModal/AlbumAddModal";

export default function AlbumPage() {
    const { logged, user } = useCheckLogged();
    const fetchAlbums = useFetch(createApiUrl("/api/v1/album/all"), "get");

    const albums: AlbumType[] = fetchAlbums.data?.albums ?? undefined;

    return (
        <div className="container p-3">
            <div className="d-flex">
                <h1>Gallery</h1>
                {logged && user?.role === "admin" && <AlbumAddModal />}
            </div>
            <div>
                <div className="row">
                    {fetchAlbums.loading ? (
                        <div className="text-center">
                            <span className="spinner-border"></span>
                            Ładowanie
                        </div>
                    ) : albums ? (
                        albums.map((album, index) => {
                            return (
                                <div
                                    key={index}
                                    className="col-12 col-sm-6 col-md-4 col-lg-3 "
                                >
                                    <AlbumCard album={album} />
                                </div>
                            );
                        })
                    ) : (
                        <h1 className="text-center text-secondary">
                            Brak albumów
                        </h1>
                    )}
                </div>
            </div>
        </div>
    );
}
