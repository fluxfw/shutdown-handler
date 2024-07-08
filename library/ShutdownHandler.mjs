/** @typedef {import("./task.mjs").task} _task */

export class ShutdownHandler {
    /**
     * @type {_task[]}
     */
    #tasks;

    /**
     * @returns {Promise<ShutdownHandler>}
     */
    static async new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {
        this.#tasks = [];

        this.#register();
    }

    /**
     * @param {_task} task
     * @returns {Promise<void>}
     */
    async addTask(task) {
        this.#tasks.push(task);
    }

    /**
     * @param {number | null} exit_code
     * @param {number | null} error_exit_code
     * @returns {Promise<void>}
     */
    async shutdown(exit_code = null, error_exit_code = null) {
        try {
            while (this.#tasks.length > 0) {
                const task = this.#tasks.pop();

                await task();
            }
        } catch (error) {
            console.error(error);

            process.exit(error_exit_code ?? 1);
        }

        process.exit(exit_code ?? 0);
    }

    /**
     * @returns {void}
     */
    #register() {
        for (const name of [
            "uncaughtException",
            "unhandledRejection"
        ]) {
            process.on(name, (...args) => {
                console.error(name, ...args);
            });
        }

        for (const name of [
            "SIGINT",
            "SIGTERM"
        ]) {
            process.on(name, async () => {
                await this.shutdown();
            });
        }
    }
}
