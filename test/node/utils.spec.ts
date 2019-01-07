/* tslint:disable:no-empty */

import { utils } from '../../src/utils';

describe('utils (Node/TypeScript)', () => {

    test('type()', () => {
        expect(utils.type(null)).toEqual('null');
        expect(utils.type(undefined)).toEqual('undefined');
        expect(utils.type(true)).toEqual('boolean');
        expect(utils.type([])).toEqual('array');
        expect(utils.type({})).toEqual('object');
        expect(utils.type(1)).toEqual('number');
        expect(utils.type('1')).toEqual('string');
        expect(utils.type(new Date())).toEqual('date');
    });

    test('isset(), ensureArray()', () => {
        expect(utils.isset(null)).toEqual(false);
        expect(utils.isset(undefined)).toEqual(false);
        expect(utils.isset(false)).toEqual(true);
        expect(utils.isset(0)).toEqual(true);

        expect(utils.type(utils.ensureArray(1))).toEqual('array');
        expect(utils.type(utils.ensureArray(''))).toEqual('array');
        expect(utils.ensureArray([])).toEqual([]);
        expect(utils.ensureArray(1)).toEqual([1]);
        expect(utils.ensureArray(null)).toEqual([]);
        expect(utils.ensureArray(undefined)).toEqual([]);
        expect(utils.ensureArray(false)).toEqual([false]);
    });

    test('getNumber(), getBool()', () => {
        expect(utils.getNumber(5, 1, 0)).toEqual(5);
        expect(utils.getNumber(0, 1, 0)).toEqual(1);
        expect(utils.getNumber(null, 1, 3)).toEqual(3);
        expect(utils.getBool(false, true)).toEqual(false);
        expect(utils.getBool(true, false)).toEqual(true);
        expect(utils.getBool(null, true)).toEqual(true);
        expect(utils.getBool(undefined, true)).toEqual(true);
    });

    test('setImmediate()', (done: any) => {
        let ref = utils.setImmediate(() => {
            try {
                expect(ref).toBeDefined();
                utils.clearImmediate(ref);
                ref = undefined;
                expect(ref).toBeUndefined();
            } catch (err) {
                console.log(err.stack || err);
            }
            done();
        }, 500);
    });

    test('isPromise()', (done: any) => {
        expect(utils.isPromise(Promise.resolve(false))).toEqual(true);
        expect(utils.isPromise(getPromise(done))).toEqual(true);
    });

});

function getPromise(cb: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
            cb();
        }, 500);
    });
}
