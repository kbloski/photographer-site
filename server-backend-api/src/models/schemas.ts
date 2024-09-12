import { sequelize } from "../utils/db";
import { AlbumModel } from "./AlbumModel";
import { Message } from "./MessagesModel";
import { PhotoModel } from "./PhotoModel";
import { ServiceModel } from "./ServiceModel";
import { UserModel } from "./UserModel";

// AlbumModel
UserModel.hasMany(AlbumModel, {
    foreignKey: 'user_id'
});
AlbumModel.belongsTo(UserModel, {
    foreignKey: 'user_id'
})

// AlbumModel
AlbumModel.hasMany(AlbumModel, {
    foreignKey: 'album_id'
});
PhotoModel.belongsTo(AlbumModel, {
    foreignKey: 'album_id'
})

sequelize.sync();

export {
    AlbumModel,
    Message,
    PhotoModel,
    ServiceModel,
    UserModel
}