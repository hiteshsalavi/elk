// const _ = require('highland');

// docker-compose exec api curl --cacert ./ca.crt -u elastic:changeme https://es01:9200 - works

const fs = require("fs");
const csv = require("csv-parser");
const elasticsearch = require("@elastic/elasticsearch");
const indexName = "demo_elastic_index";

const start = async () => {

  // console.log(await fs.readFile(process.env.NODE_EXTRA_CA_CERTS))
  console.log(process.env.ELASTIC_HOSTS);

  const client = new elasticsearch.Client({
    node: 'https://es01:9200',
    auth: { username: "elastic", password: "changeme" },
    tls: { requestCert: true, ca: fs.readFileSync('./ca.crt'), rejectUnauthorized: false },
  });

  await client.ping(
    {
      requestTimeout: 3000,
    },
    function (error) {
      if (error) {
        console.trace("elasticsearch cluster is down!");
      } else {
        console.log("Elastic search is running.");
      }
    }
  );
  
  // Will do later
  //   try {
  //     await client.indices.create({index: indexName});
  //     console.log('created index');
  //    } catch (e) {
  //       if (e.status === 400) {
  //         console.log('index already exists');
  //       } else {
  //         throw e;
  //       }
  //     }

  //     // process file
  //     let currentIndex = 0;
  //     const stream = _(
  //       fs.createReadStream('./planet-latest-100k_geonames.tsv').pipe(
  //         csv({
  //           separator: '\t',
  //         })
  //       )
  //     )
  // .map(data => ({
  //       ...data,
  //       alternative_names: data.alternative_names.split(','),
  //       lon_num: parseFloat(data.lon),
  //       lat_num: parseFloat(data.lat),
  //       place_rank_num: parseInt(data.place_rank, 10),
  //       importance_num: parseFloat(data.importance),
  //     }))
  // .map(data => [{
  //   index: {_index: indexName, _type: 'place', _id: data.osm_id},
  //   },
  //   data,
  // ])
  // .batch(100)
  // .each(async entries => {
  //       stream.pause();
  //       const body = entries.reduce((acc, val) => acc.concat(val),[]);
  //     await client.bulk({body});
  //     console.log(`processing indexes from ${currentIndex} to ${currentIndex + 100}`)
  //     currentIndex += 100;
  //     console.log('Created index :', currentIndex);
  //     stream.resume();
  // })
  // .on('end', () => {
  //     console.log('done');
  //     process.exit();
  //    });
};
start();
