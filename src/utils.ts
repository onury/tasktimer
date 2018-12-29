
const proto = Object.prototype;
const BROWSER = typeof window !== 'undefined';
const NODE = !BROWSER;

const utils = {
    BROWSER,
    NODE,
    type(object: any): string {
        return proto.toString.call(object).match(/\s(\w+)/i)[1].toLowerCase();
    },
    getNumber(value: number, minimum: number, defaultValue: number): number {
        return typeof value === 'number'
            ? (value < minimum ? minimum : value)
            : defaultValue;
    },
    getBool(value: boolean, defaultValue: boolean): boolean {
        return typeof value !== 'boolean'
            ? defaultValue
            : value;
    },
    setImmediate(cb: (...args: any[]) => void, ...args: any[]): any {
        if (BROWSER) {
            return setTimeout(cb.apply(null, args), 0);
        }
        return setImmediate(cb, ...args);
    },
    clearImmediate(id: any): void {
        if (!id) return;
        if (BROWSER) return clearTimeout(id);
        clearImmediate(id);
    },
    immediate(cb: (...args: any[]) => void, ...args: any[]): any {
        const id = utils.setImmediate(() => {
            cb.apply(null, args);
            utils.clearImmediate(id);
        });
    },
    /**
     *  Checks whether the given value is a promise.
     *  @param {any} value - Value to be checked.
     *  @return {boolean}
     */
    isPromise(value: any): boolean {
        return value
            && utils.type(value) === 'promise'
            && typeof value.then === 'function';
    }
};

export { utils };
