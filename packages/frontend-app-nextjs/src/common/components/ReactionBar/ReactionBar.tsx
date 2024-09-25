"use client";

import style from "./reaction.module.scss";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { createApiUrl } from "../../api/apiUtils";
import { webTokenManger } from "../../services/tokenManager";
import sendReaction from "./helpers/sendReaction";
import { Emotions, EmotionsObject, ReactionType } from "packages/shared/src/types/ReactionType";

type ReactionBarProps = {
    albumId?: number;
    photoId?: number;
};

export function ReactionBar({ albumId, photoId }: ReactionBarProps) {
    const [reactions, setReactions] = useState<Record<string, string>>({});
    const [existReaction, setExistReaction] = useState<Partial<ReactionType>>({});

    const fetchReactions = useFetch(
        createApiUrl(
            `/api/v1/reaction/all?albumId=${albumId}&photoId=${photoId ?? ""}`
        ),
        { method: "GET" }
    );
    const fetchExistReaction = useFetch(
        createApiUrl(`/api/v1/reaction?albumId=${albumId ?? ""}`),
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${webTokenManger.getLocalToken()}`,
            },
        }
    );

    useEffect(() => {
        const reactinos = fetchReactions?.data?.reactions;
        if (reactinos) setReactions(reactinos);
    }, [fetchReactions.loading]);

    useEffect(() => {
        const existUserReaction = fetchExistReaction?.data?.reaction;
        if (existUserReaction) setExistReaction(existUserReaction);
    }, [fetchExistReaction.data]);

    return (
        <div className="d-flex justify-content-center bg-light p-2">
            {
                Object.entries( EmotionsObject ).map( ([emotionKey, emotionValue]) =>
                    <button 
                        key={ emotionKey }
                        className={
                            [   
                                'row',
                                style.reaction,
                                emotionValue === existReaction.reaction ? 'bg-success text-white' : ' '
                            ].join(' ')
                        }
                        onClick={ () => sendReaction({
                            reaction: emotionValue,
                            albumId,
                            callbackSuccess: () => {
                                fetchReactions.refresh()
                                fetchExistReaction.refresh()
                            }
                        })}
                    >   
                        {
                            emotionValue == Emotions.HAHA && <h5>😄</h5>    ||
                            emotionValue == Emotions.LIKE && <h5>👍</h5>    ||
                            emotionValue == Emotions.LOVE && <h5>❤️</h5>    ||
                            emotionValue == Emotions.WOW && <h5>😯</h5>
                        }
                        <div>
                            { reactions[emotionValue] }
                        </div>
                    </button>
                )
            }
        </div>
    );
}
