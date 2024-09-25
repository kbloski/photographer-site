export enum ReactionEmotions {
    LIKE = 1,
    LOVE = 2,
    WOW = 3,
    HAHA = 4,
}

export function getReactionEnumValues(){
    const values = Object.values(ReactionEmotions).filter( v => typeof v === 'number');
    return values;
}

export function getReactionEnumKeys(){
    const values = Object.values(ReactionEmotions).filter( v => typeof v === 'string');
    return values;
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
