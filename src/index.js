const express = require('express')
const body = require('body-parser')
const cors = require('cors')
const axios = require('axios').default
const config = require('./config')
const log = require('./log')(config)

const app = express()

app.use(body.urlencoded({
    extended: true
}))
app.use(body.json())
app.use(cors())

log.info("Location service started. Loaded configuration", {configuration: config});


function format_address(data) {
    if(!('status' in data) || data.status !== 'OK') {
        throw new Error("Error returned from geocoding")
    }
    if(!('results' in data) || data.results.length < 1) {
        throw new Error("No results from geocoding")
    }
    formatted_result = "";
    for(let i of data.results[0].address_components) {
        if(!(i.types.includes('country')) && !(i.types.includes('postal_code'))) {
            formatted_result = i.long_name.concat(formatted_result);
        }
    }
    return formatted_result
}

app.get('/', (req, res) => {
    log.info("Received request", {parameters: {
        longitude: req.query.longitude,
        latitude: req.query.latitude
    }})
    longitude = req.query.longitude;
    latitude = req.query.latitude;
    const path = (
        `https://maps.googleapis.com/maps/api/geocode/json?` +
        `latlng=${latitude},${longitude}&key=${config.apikey}` +
        `&language=ja&region=JP&result_type=sublocality_level_2`
    )
    axios.get(path).then( (response) => {
        log.info(response.data)
        res.send({ result: format_address(response.data) })
    }).catch( (error) => {
        log.error("error", error)
        throw error
    })
})

app.listen(config.port, () => log.info(`irsjpy location service listening on port ${config.port}`))
