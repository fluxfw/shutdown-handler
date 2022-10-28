/** @typedef {import("../../../Adapter/ShutdownHandler/ShutdownHandler.mjs").ShutdownHandler} ShutdownHandler */

export class GetShutdownHandlerCommand {
    /**
     * @returns {GetShutdownHandlerCommand}
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
        const shutdown_handler = (await import("../../../Adapter/ShutdownHandler/ShutdownHandler.mjs")).ShutdownHandler.new();

        this.#register(
            shutdown_handler
        );

        return shutdown_handler;
    }

    /**
     * @param {ShutdownHandler} shutdown_handler
     * @returns {void}
     */
    #register(shutdown_handler) {
        /**
         * @param {...*} args
         * @returns {void}
         */
        const uncaughtException = (...args) => {
            console.error("uncaughtException", ...args);
        };
        process.on("uncaughtException", uncaughtException);

        /**
         * @param {...*} args
         * @returns {void}
         */
        const unhandledRejection = (...args) => {
            console.error("unhandledRejection", ...args);
        };
        process.on("unhandledRejection", unhandledRejection);

        /**
         * @returns {Promise<void>}
         */
        const shutdown = async () => {
            await shutdown_handler.shutdown();
        };
        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);
    }
}
