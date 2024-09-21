'use client'

import style from './albumCart.module.scss';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { AlbumType } from 'shared/src/types/AlbumType';
import { PhotoType } from 'shared/src/types/PhotoType';
import Link from 'next/link';
import { useFetch } from '../../hooks/useFetch';
import { createApiUrl } from '../../api/apiUtils';

type AlbumCardPros = {
    album: AlbumType ;
}

export function AlbumCard( { album } : AlbumCardPros ) {
    const [srcImg, setSrcImg] = useState<string>();
    const fetchImages = useFetch(
        createApiUrl(`/api/v1/photo/list/for-album/${ album.id }`),
        'get'
    )
    
    useEffect( ()=>{
        if (!fetchImages.loading){
            const photoArr : PhotoType[] | null = fetchImages?.data.
            albumPhotos;

            if (photoArr?.length ){
                const photoId = photoArr[0].id;
                setSrcImg(
                    createApiUrl(`/api/v1/photo/${photoId}`)
                )
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ fetchImages.loading]);

    return (
        <Link href={`album/${album.id}`} className={style.link}>
            <div className="container p-3 ">
                <div className={"card "+style['album-list-item']}>
                    <div className={style['album-list-item-photo']}>
                        <Image
                            className={ [
                                    "card-img-top"
                                ].join(' ') 
                            }
                            src={
                                srcImg ??
                                "/images/album/defaultAlubmPhoto.png"
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
                    <p className='card-content'>
                        {album.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
