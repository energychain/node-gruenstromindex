import { strict as assert } from 'node:assert';
import gsi from "../src/lib.cjs";

const lib = gsi.gsi();

describe('Green Power Index - Prediction', function () {
    let ts = new Date().getTime();

    it('Retrieve GreenPower Index of 69256 Mauer', async function () {
        const prediction = await lib.prediction('69256');
        assert.equal(prediction.location.zip, '69256');
        ts = prediction._updated;
        return;
    });
    it('Validate Caching works', async function () {
        const prediction = await lib.prediction('69256');
        assert.equal(prediction.location.zip, '69256');
        assert.equal(ts,prediction._updated);
        return;
    }); 
    it('Validate Cache invalidation', async function () {
        const prediction = await lib.prediction('69502');
        assert.equal(prediction.location.zip, '69502');
        assert.notEqual(ts,prediction._updated);
        return;
    }); 
    it('Consitency of Data', async function () {
        const prediction = await lib.prediction('69502');
      
        assert.equal(prediction.forecast.length >= 35, true);
        assert.equal(prediction.forecast[0].timeStamp > new Date().getTime()-7200000, true);
        assert.equal(prediction.forecast[prediction.forecast.length-1].timeStamp > new Date().getTime()+(36*3600000), true);
        return;
    }); 
    it('Check query with Cityname Hemsbach works', async function () {
        const prediction = await lib.prediction('Hemsbach');
        assert.equal(prediction.location.zip, '69502');
        return;
    }); 
});