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

    }

    /**
     * @returns {Promise<ShutdownHandler>}
     */
    async getShutdownHandler() {
        return (await this.#getShutdownHandlerService()).getShutdownHandler();
    }

    /**
     * @returns {Promise<ShutdownHandlerService>}
     */
    async #getShutdownHandlerService() {
        this.#shutdown_handler_service ??= (await import("../../Service/ShutdownHandler/Port/ShutdownHandlerService.mjs")).ShutdownHandlerService.new();

        return this.#shutdown_handler_service;
    }
}
