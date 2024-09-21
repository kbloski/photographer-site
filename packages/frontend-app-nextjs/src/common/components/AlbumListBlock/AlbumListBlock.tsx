"use client";

import { AlbumListItem } from "./styled/AlbumListItem";
import Link from "next/link";
import { useFetch } from "../../hooks/useFetch";
import { createApiUrl } from "../../api/apiUtils";
import { AlbumType } from "shared/src/types/AlbumType";

export function AlbumListBlock() {
    const fetchAlbum = useFetch(createApiUrl("/api/v1/album/all"), "get");

    const albums: AlbumType[] = fetchAlbum.data?.albums ?? undefined;

    return (
        <div className="container p-3">
            <div className="d-flex">
                <h2 className="flex-grow-1">Chosen from my albums</h2>
                <Link href="#">
                    <h2>View more...</h2>
                </Link>
            </div>
            <div className="row d-block d-sm-flex">
                { !fetchAlbum.loading ? (
                    albums ?
                        albums.map((album, index) => {
                            if (index > 3) return;
                            return (
                                <div
                                    className={
                                        index < 3 
                                            ? "col-12 col-sm-4 col-lg-3"
                                            : "d-none col-12 col-sm-0 d-lg-block col-lg-3 "
                                    }
                                    key={album.id}
                                >
                                    <AlbumListItem album={album} />
                                </div>
                            );
                        }) 
                    : <div>
                        <h1 className="text-secondary p-4">Brak albumów</h1>
                    </div>
                ) : 
                    <div>
                        <h1>
                            <span className="spinner-border"></span>
                            Ładowanie albumów
                        </h1>
                </div>
                
                
                }
            </div>
        </div>
    );
}
