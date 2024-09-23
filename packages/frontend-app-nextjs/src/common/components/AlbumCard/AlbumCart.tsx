"use client";

import style from "./albumCart.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AlbumType } from "shared/src/types/AlbumType";
import { PhotoType } from "shared/src/types/PhotoType";
import Link from "next/link";
import { useFetch } from "../../hooks/useFetch";
import { createApiUrl } from "../../api/apiUtils";
import { useCheckLogged } from "../../hooks/useCheckLogged";
import { webTokenManger } from "../../services/tokenManager";
import { getRandomIndexFromArr } from "../../helpers/getRandomElement";

type AlbumCardPros = {
    refreshFetch?: () => void;
    album: AlbumType;
};

export function AlbumCard({ album, refreshFetch }: AlbumCardPros) {
    const [ cardId, setCardId] = useState<string>();
    const { logged, user } = useCheckLogged();
    const [ srcImg, setSrcImg] = useState<string>();
    const fetchImages = useFetch(
        createApiUrl(`/api/v1/photo/list/for-album/${album.id}`),
        {
            method: "get"
        }
    );

    const prepareDescription = ( description : string, length : number = 20) =>{
        const newDescription = description.slice(0, length );
        return newDescription;
    }

    useEffect( ()=>{
        const id = `albumCardItem${album.id}`;
        setCardId( id );
    }, [album.id])

    useEffect(() => {
        if (!fetchImages.loading) {
            const photoArr: PhotoType[] | null = fetchImages?.data.albumPhotos;

            if (photoArr?.length) {
                const photoId = getRandomIndexFromArr(photoArr);
                setSrcImg(createApiUrl(`/api/v1/photo/${photoId}`));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchImages.loading]);

    function onClickDelete(id: number) {
        fetch(createApiUrl(`/api/v1/album/${id}`), {
            method: "delete",
            headers: {
                authorization: `Bearer ${webTokenManger.getLocalToken()}`,
            },
        }).then((response) => {
            if (!response.ok) throw new Error();

            if (refreshFetch) refreshFetch();
        });
    }

    return (
        <div id={cardId} className="container p-3 ">
            {logged && user?.role === "admin" && (
                <button
                    className={"badge bg-danger"}
                    onClick={() => onClickDelete(album.id)}
                >
                    Delete
                </button>
            )}
            <Link href={`album/${album.id}`} className={style.link}>
                <div className={"card " + style["album-list-item"]}>
                    <div className={style["album-list-item-photo"]}>
                        <Image
                            className={["card-img-top"].join(" ")}
                            src={
                                srcImg ?? "/images/album/defaultAlubmPhoto.png"
                            }
                            alt="Album"
                            sizes="(min-width 512px)"
                            height={0}
                            width={0}
                        />
                    </div>
                    <h3 className="card-title text-center p-1 pt-3">
                        {album.name}
                    </h3>
                    <div>
                        <p className="card-content text-center p-2">{
                            album.description &&
                            prepareDescription( album.description ) + '...'
                        }  </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
