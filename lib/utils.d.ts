declare const utils: {
    BROWSER: boolean;
    NODE: boolean;
    type(object: any): string;
    getNumber(value: number, minimum: number, defaultValue: number): number;
    getBool(value: boolean, defaultValue: boolean): boolean;
    setImmediate(cb: (...args: any[]) => void, ...args: any[]): any;
    clearImmediate(id: any): void;
    immediate(cb: (...args: any[]) => void, ...args: any[]): any;
    /**
     *  Checks whether the given value is a promise.
     *  @param {any} value - Value to be checked.
     *  @return {boolean}
     */
    isPromise(value: any): boolean;
};
export { utils };
