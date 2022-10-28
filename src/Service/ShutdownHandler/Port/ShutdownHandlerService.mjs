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
     * @returns {Promise<ShutdownHandler>}
     */
    async getShutdownHandler() {
        return (await import("../Command/GetShutdownHandlerCommand.mjs")).GetShutdownHandlerCommand.new()
            .getShutdownHandler();
    }
}
