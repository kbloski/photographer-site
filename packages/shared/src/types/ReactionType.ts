export enum ReactionEmotions {
    LIKE = 1,
    LOVE = 2,
    WOW = 3,
    HAHA = 4,
}

export type ReactionType = {
    id?: number;
    reaction:
        | ReactionEmotions.LIKE
        | ReactionEmotions.LOVE
        | ReactionEmotions.WOW
        | ReactionEmotions.HAHA;
    user_id?: number;
    photo_id?: number;
    album_id?: number;
};
