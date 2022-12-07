import { strict as assert } from 'node:assert';
import gsi from "../src/lib.mjs";

const lib = gsi();

describe('Location Helper', function () {
    let ts = new Date().getTime();

    it('Get Postleitzahl for City Name Mauer', async function () {
        const result = await lib.getZIP('69256');
        assert.equal(result, '69256');
        return;
    });
   
    it('Get Postleitzahl for Address Gerhard Weiser Ring 29, Mauer', async function () {
        const result = await lib.getZIP('Gerhard Weiser Ring 29, Mauer');
        assert.equal(result, '69256');
        return;
    });
});