import { AlbumController } from "./AlbumController";
import { MessageController } from "./MessageController";
import { PhotoController } from "./PhotoController";
import { ServiceController } from "./ServiceController";
import { UserController } from "./UserController";

const userController = new UserController();
const albumController = new AlbumController();
const messageController = new MessageController();
const photoController = new PhotoController();
const serviceController = new ServiceController();

export {
    userController,
    albumController,
    messageController,
    photoController,
    serviceController
}