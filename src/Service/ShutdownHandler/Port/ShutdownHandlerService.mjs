import { GetShutdownHandlerCommand } from "../Command/GetShutdownHandlerCommand.mjs";
import { ShutdownHandler } from "../../../Adapter/ShutdownHandler/ShutdownHandler.mjs";

export class ShutdownHandlerService {
    /**
     * @returns {ShutdownHandlerService}
     */
    static new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {

    }

    /**
     * @returns {ShutdownHandler}
     */
    getShutdownHandler() {
        return GetShutdownHandlerCommand.new()
            .getShutdownHandler();
    }
}
