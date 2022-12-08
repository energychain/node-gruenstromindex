import  axios  from 'axios';

export default function(options) {
      
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
            const r = (await _fetch_prediction(zip)).data;
            if(typeof r.err !== 'undefined') {
                let err = 'Unable to fetch GSI.';
                if(typeof r.message !== 'undefined') {
                    err += ' '+r.message.err;
                }
                throw err;
            }
            cache.prediction = r;
            cache.prediction._updated = new Date().getTime();
        }
        
        return cache.prediction;
    }

    return {
        prediction:prediction,
        getZIP:getZIP
    };

}