/** @typedef {import("./shutdownTask.mjs").shutdownTask} shutdownTask */

export class ShutdownHandler {
    /**
     * @type {shutdownTask[]}
     */
    #shutdown_tasks;

    /**
     * @returns {ShutdownHandler}
     */
    static new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {
        this.#shutdown_tasks = [];
    }

    /**
     * @param {shutdownTask} shutdown_task
     * @returns {void}
     */
    addShutdownTask(shutdown_task) {
        this.#shutdown_tasks.push(shutdown_task);
    }

    /**
     * @param {number | null} exit_code
     * @param {number | null} error_exit_code
     * @returns {Promise<void>}
     */
    async shutdown(exit_code = null, error_exit_code = null) {
        try {
            while (this.#shutdown_tasks.length > 0) {
                const shutdown_task = this.#shutdown_tasks.pop();

                await shutdown_task();
            }
        } catch (error) {
            console.error(error);

            process.exit(error_exit_code ?? 1);
        }

        process.exit(exit_code ?? 0);
    }
}
