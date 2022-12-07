#!/usr/bin/env node

import gsi from "./src/lib.mjs";

const lib = gsi();

const app = async function(plz) {
   const prediction = await lib.prediction(plz);
   let table = [];
   for(let i=0;i<prediction.forecast.length;i++) {
    const row = {
        date: new Date(prediction.forecast[i].timeStamp).toLocaleString(),
        gsi: prediction.forecast[i].gsi,
        co2: prediction.forecast[i].co2_g_standard
    };
    table.push(row);
   }
   console.table(table); 
}

if(process.argv.length < 3) {
    console.error("usage: gruenstromindex <Postleitzahl>");
} else {
    app(process.argv[2]);
}
