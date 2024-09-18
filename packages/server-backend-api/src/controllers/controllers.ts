import { AlbumController } from "./AlbumController";
import { MessageController } from "./MessageController";
import { PhotoController } from "./PhotoController";
import { ReactionController } from "./ReactionController";
import { ServiceController } from "./ServiceController";
import { UserController } from "./UserController";

const userController = new UserController();
const albumController = new AlbumController();
const messageController = new MessageController();
const photoController = new PhotoController();
const serviceController = new ServiceController();
const reactionController = new ReactionController();

export {
    userController,
    albumController,
    messageController,
    photoController,
    serviceController,
    reactionController
};
