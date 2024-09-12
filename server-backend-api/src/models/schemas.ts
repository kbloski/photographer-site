import { sequelize } from "../utils/db";
import { Album } from "./AlbumModel";
import { Message } from "./MessagesModel";
import { Photo } from "./PhotoModel";
import { Service } from "./ServiceModel";
import { User } from "./UserModel";

// AlbumModel
User.hasMany(Album, {
    foreignKey: 'user_id'
});
Album.belongsTo(User, {
    foreignKey: 'user_id'
})

// AlbumModel
Album.hasMany(Photo, {
    foreignKey: 'album_id'
});
Photo.belongsTo(Album, {
    foreignKey: 'album_id'
})

sequelize.sync();

export function cc(){
    console.log( 'schemas')
}

export {
    Album,
    Message,
    Photo,
    Service,
    User
}