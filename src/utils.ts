
const proto = Object.prototype;
const BROWSER = typeof window !== 'undefined';
const NODE = !BROWSER;

/** @private */
const utils = {
    BROWSER,
    NODE,
    type(o: any): string {
        return proto.toString.call(o).match(/\s(\w+)/i)[1].toLowerCase();
    },
    isset(o: any): boolean {
        return o !== null && o !== undefined;
    },
    ensureArray(o: any): any[] {
        return utils.isset(o)
            ? !Array.isArray(o) ? [o] : o
            : [];
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
        /* istanbul ignore if */
        if (BROWSER) { // tested separately
            return setTimeout(cb.apply(null, args), 0);
        }
        return setImmediate(cb, ...args);
    },
    clearImmediate(id: any): void {
        /* istanbul ignore next */
        if (!id) return;
        /* istanbul ignore if */
        if (BROWSER) return clearTimeout(id); // tested separately
        clearImmediate(id);
    },
    /**
     *  Checks whether the given value is a promise.
     *  @private
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
