import { sequelize } from "../utils/db";
import { Album } from "./AlbumModel";
import { Message } from "./MessagesModel";
import { Photo } from "./PhotosUser";
import { Service } from "./ServiceModel";
import { User } from "./UserModel";

// Album
User.hasMany(Album, {
    foreignKey: 'user_id'
});
Album.belongsTo(User, {
    foreignKey: 'user_id'
})

// Album
Album.hasMany(Album, {
    foreignKey: 'album_id'
});
Photo.belongsTo(Album, {
    foreignKey: 'album_id'
})

sequelize.sync();

console.log('123')

export {
    Album,
    Message,
    Photo,
    Service,
    User
}