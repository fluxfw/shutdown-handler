import { GetShutdownHandlerCommand } from "../Command/GetShutdownHandlerCommand.mjs";

/** @typedef {import("../../../Adapter/ShutdownHandler/ShutdownHandler.mjs").ShutdownHandler} ShutdownHandler */

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
