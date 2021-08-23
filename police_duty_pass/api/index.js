const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();


const _PORT = process.env.PORT || 3000;


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);





// Route Imports
const auth = require('./routes/auth')
const venueDetails = require('./routes/venue_details')
const generatePass = require('./routes/generatePass')

// CORS
app.use(cors({
        origin: '*'
    }))
    // app.options('*', cors())
app.use(express.static(__dirname + '/images'));

app.get('/', (req, res, next) => {
    res.json({ status: true, message: "Police ID Pass generation API" })
})

// Auth Route
app.use('/api/auth', auth)

// Get Venue Details
app.use('/api/venue', venueDetails)

// Insert pass details
app.use('/api/generatePass', generatePass)


app.listen(_PORT, () => {
    console.log(`Server is listening on PORT : ${_PORT}`);
})