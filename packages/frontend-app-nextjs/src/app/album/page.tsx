"use client";

import { AlbumType } from "shared/src/types/AlbumType";
import { createApiUrl } from "../../common/api/apiUtils";
import { useFetch } from "../../common/hooks/useFetch";
import { AlbumCard } from "../../common/components/AlbumCard/AlbumCart";

export default function AlbumPage() {
    const fetchAlbums = useFetch(createApiUrl("/api/v1/album/all"), "get");

    const albums: AlbumType[] = fetchAlbums.data?.albums ?? undefined;
    console.log(fetchAlbums);

    return (
        <>
            <h1>Gallery</h1>
            <div className="row">
                {albums
                    ? albums.map((album, index) => {
                          return (
                              <div 
                              key={index}
                              className="col-12 col-sm-6 col-md-4 col-lg-3 "
                              >
                                  <AlbumCard album={album} />
                              </div>
                          );
                      })
                    : null}
            </div>
        </>
    );
}
