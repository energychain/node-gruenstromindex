exports.gsi = function(options) {
    const axios = require('axios');

    const cache = {

    };

    const _fetch_prediction = async function(zip) {
        return  await axios.get("https://api.corrently.io/v2.0/gsi/prediction?zip="+zip);
    }    
    
    const getZIP = async function(query) {
         return (await axios.get("https://api.corrently.io/v2.0/postleitzahl/query?q="+query)).data.zip;
    }

    const prediction = async function(zip) {
        if((zip.length !== 5) || (isNaN(zip))) {
            zip = await getZIP(zip);
        }
        if((typeof cache.prediction == 'undefined') || (cache.prediction == null) || (typeof cache.prediction._updated == 'undefined') || (cache.prediction._updated < new Date().getTime()-900000) || (cache.prediction.location.zip !== zip)) {
            cache.prediction = (await _fetch_prediction(zip)).data;
            cache.prediction._updated = new Date().getTime();
        }

        return cache.prediction;
    }

    return {
        prediction:prediction,
        getZIP:getZIP
    };

}