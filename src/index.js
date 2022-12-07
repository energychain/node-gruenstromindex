import $ from 'jquery'
import gsi from "./lib.mjs";

const lib = gsi();

// Next Line registers globaly to window - which might not be a good idea
window.GruenstromIndex = lib;

const renderGSI = async function() {
    const r = await lib.prediction($('#fldZip').val());
    console.log(r);
    let html = '<table class="table table-condensed">';
    html += '<tr><th>Zeit</th><th>GrünstromIndex</th><th>CO2/kWh</th></tr>';
    for(let i=0;i<r.forecast.length;i++) {
        html += '<tr>';
        html += '<td>'+new Date(r.forecast[i].timeStamp).toLocaleString() + '</td>';
        html += '<td>'+r.forecast[i].gsi+'</td>';
        html += '<td>'+r.forecast[i].co2_g_standard+'</td>';
        html += '</tr>';
    } 
    html += '</table>';
    $('#result').html(html);
}

$('#zipInput').on('submit',function(e) {
    e.preventDefault();
    renderGSI();
    return false;
});