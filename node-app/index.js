const express = require('express')
const morgan = require('morgan');
const { ecsFormat } = require('@elastic/ecs-morgan-format');
const { Client } = require('@elastic/elasticsearch')

const app = express()

const esNode = process.env.ELASTIC_HOSTS;
const client = new Client({ node: esNode });

app.use(morgan(ecsFormat()));

const port = process.env.PORT

console.log(process.env.LOGSTASH_URL)

app.get('/', (req, res) => {
    client.info().then(console.log, console.log)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})