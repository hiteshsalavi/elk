const axios = require('axios');
const https = require('https')
const fs = require('fs/promises')

// import axios from 'axios'
// import https from 'https'
// import fs from 'fs/promises'

const start = async () => {
    const caCert = await fs.readFile('./ca.crt');
    
    response = await axios.get(process.env.ELASTIC_HOSTS, {
        // TODO: Find fix to avoid rejectUnauthorized
        httpsAgent: new https.Agent({cert: caCert, rejectUnauthorized: false}),
        auth: {username: 'elastic', password: 'changeme'}
    });
    console.log(response.data);
};

start();