declare const utils: {
    BROWSER: boolean;
    NODE: boolean;
    type(o: any): string;
    isset(o: any): boolean;
    ensureArray(o: any): any[];
    getNumber(value: number, minimum: number, defaultValue: number): number;
    getBool(value: boolean, defaultValue: boolean): boolean;
    setImmediate(cb: (...args: any[]) => void, ...args: any[]): any;
    clearImmediate(id: any): void;
    /**
     *  Checks whether the given value is a promise.
     *  @param {any} value - Value to be checked.
     *  @return {boolean}
     */
    isPromise(value: any): boolean;
};
export { utils };
