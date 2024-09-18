import { Reaction } from "../models/Reactions";
import { AbstractCrudController } from "./AbstrctCrudController";

export class ReactionController extends AbstractCrudController<Reaction> {
    constructor(){
        super(Reaction);
    }
}