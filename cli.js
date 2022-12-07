const lib = require("./src/lib.cjs");

const app = async function() {
    const gsi = lib.gsi();

    console.log(await gsi.prediction('69256'));
}

app();