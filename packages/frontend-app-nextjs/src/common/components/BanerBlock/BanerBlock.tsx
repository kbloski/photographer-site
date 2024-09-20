"use client";
import Image from "next/image";
// import style from "./baner.module.scss";
import { ImageType } from "../../types/ImageType";
import { useEffect, useState } from "react";

type BanerImageType = ImageType & {
    title?: string;
    description?: string;
};

type BannerProps = {
    images: BanerImageType[];
};

export function Baner({ images }: BannerProps) {
    const [carouselId, setCarouselId] = useState<string>("");
    useEffect(() => {
        const carouselId =
            "carousel" + String(Math.round(Math.random() * 1000));
        setCarouselId(carouselId);
    }, []);

    return (
        <div className="container p-2">
            <div
                id={carouselId}
                className="carousel slide"
                data-bs-ride="carousel"
            >
                <div className="carousel-indicators">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target={`#${carouselId}`}
                            data-bs-slide-to={`${index}`}
                            aria-current="true"
                            aria-label="slide 1"
                            className={index === 0 ? "active" : ""}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {images.map((value, index) => (
                        <div
                            key={index}
                            className={
                                index === 0
                                    ? "carousel-item active"
                                    : "carousel-item"
                            }
                        >
                            <Image
                                src={value.src}
                                alt="baner"
                                sizes="(min-width: 800px) 300px, 680px"
                                width={0}
                                height={0}
                            />
                            <div className="carousel-caption d-none d-sm-block">
                                <h1> {value.title} </h1>
                                <p> {value.description} </p>
                            </div>
                        </div>
                    ))}
                </div>
                <a
                    className="carousel-control-prev"
                    href={`#${carouselId}`}
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </a>
                <a
                    className="carousel-control-next"
                    href={`#${carouselId}`}
                    data-bs-slide='next'
                >
                    <span className="carousel-control-next-icon"
                        aria-hidden='true'
                    ></span>
                    <span className="visually-hidden">Next</span>
                </a>
            </div>
        </div>
    );
}
