import { strict as assert } from 'node:assert';
import gsi from "../src/lib.mjs";

const lib = gsi();

describe('Green Power Index - Prediction', function () {
    this.timeout(10000);
    let ts = new Date().getTime();

    it('Retrieve GreenPower Index of 69168 Wiesloch', async function () {
        const prediction = await lib.prediction('69168');
        assert.equal(prediction.location.zip, '69168');
        ts = prediction._updated;
        return;
    });
    it('Validate Caching works', async function () {
        const prediction = await lib.prediction('69168');
        assert.equal(prediction.location.zip, '69168');
        assert.equal(ts,prediction._updated);
        return;
    }); 
    it('Validate Cache invalidation', async function () {
        const prediction = await lib.prediction('69502');
        assert.equal(prediction.location.zip, '69502');
        assert.notEqual(ts,prediction._updated);
        return;
    }); 
    it('Consitency of Data - items in forecast', async function () {
        const prediction = await lib.prediction('69502');
        assert.equal(prediction.forecast.length >= 35, true);
        return;
    }); 
    it('Consitency of Data - nearest entry', async function () {
        const prediction = await lib.prediction('69502');
        assert.equal(prediction.forecast[0].timeStamp > new Date().getTime()-7200000, true);
        return;
    }); 
    it('Consitency of Data - forecast future', async function () {
        const prediction = await lib.prediction('69502');
        assert.equal(prediction.forecast[prediction.forecast.length-1].timeStamp > new Date().getTime()+(36*3600000), true);
        return;
    }); 
    it('Check query with Cityname Hemsbach works', async function () {
        const prediction = await lib.prediction('Hemsbach');
        assert.equal(prediction.location.zip, '69502');
        return;
    }); 
});