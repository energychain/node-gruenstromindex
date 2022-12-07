# node-gruenstromindex
Green Power Index ( [GrünstromIndex](https://gruenstromindex.de/) ) for Node/Javascript

## Installation

via NPM (as module):
```
npm i gruenstromindex
```

via NPM (as Shell Script):
```
npm i -g gruenstromindex
```

via GIT:
```
git clone https://github.com/energychain/node-gruenstromindex
npm i
```

via Script Tag:
```
    <script src="https://unpkg.com/gruenstromindex/public/js/main.js"></script>
```
## Usage

### Command-Line (CLI)
```
gruenstromindex <Postleitzahl>
```

### Node JS / ESM
```javascript
#!/usr/bin/env node

import gsi from "gruenstromindex";

const lib = gsi.gsi();

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
```

### Widget Development
```
cd node-gruenstromindex
npm run dev
```

Point Browser to: http://localhost:9090/

## Maintainer / Imprint
<addr>
<a href="https://stromdao.de/">STROMDAO GmbH</a><br/>
Gerhard Weiser Ring 29  <br/>
69256 Mauer  <br/>
Germany <br/>
  <br/>
+49 6226 968 009 0  <br/>
  <br/>
kontakt@stromdao.com  <br/>
  <br/>
Handelsregister: HRB 728691 (Amtsgericht Mannheim)
</addr>


## LICENSE
[Apache-2.0](./LICENSE)
