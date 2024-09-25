export enum Emotions {
    LIKE = 1,
    LOVE = 2,
    WOW = 3,
    HAHA = 4,
}

export const EmotionsObject = {
    'LIKE' : 1,
    'LOVE' : 2,
    'WOW'  : 3,
    'HAHA' : 4
} as const;

export type ReactionType = {
    id?: number;
    reaction:
        | Emotions.LIKE
        | Emotions.LOVE
        | Emotions.WOW
        | Emotions.HAHA;
    user_id?: number;
    photo_id?: number;
    album_id?: number;
};
