/** @typedef {import("../ShutdownHandler/ShutdownHandler.mjs").ShutdownHandler} ShutdownHandler */
/** @typedef {import("../../Service/ShutdownHandler/Port/ShutdownHandlerService.mjs").ShutdownHandlerService} ShutdownHandlerService */

export class ShutdownHandlerApi {
    /**
     * @type {ShutdownHandlerService | null}
     */
    #shutdown_handler_service = null;

    /**
     * @returns {ShutdownHandlerApi}
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
     * @returns {Promise<void>}
     */
    async init() {
        this.#shutdown_handler_service ??= await this.#getShutdownHandlerService();
    }

    /**
     * @returns {ShutdownHandler}
     */
    getShutdownHandler() {
        return this.#shutdown_handler_service.getShutdownHandler();
    }

    /**
     * @returns {Promise<ShutdownHandlerService>}
     */
    async #getShutdownHandlerService() {
        return (await import("../../Service/ShutdownHandler/Port/ShutdownHandlerService.mjs")).ShutdownHandlerService.new();
    }
}
