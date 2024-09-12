import { sequelize } from "../utils/db";
import { Album } from "./AlbumModel";
import { Message } from "./MessagesModel";
import { Photo } from "./PhotosUser";
import { Service } from "./ServiceModel";
import { UserModel } from "./UserModel";

// Album
UserModel.hasMany(Album, {
    foreignKey: 'user_id'
});
Album.belongsTo(UserModel, {
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

export {
    Album,
    Message,
    Photo,
    Service,
    UserModel
}