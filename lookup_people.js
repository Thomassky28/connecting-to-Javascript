const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect()
var args = process.argv.slice(2)
var peopleName = args[0]

function tracksByName(peopleName, callback) {

   client.query(`
    select *
      from famous_people as f
      where f.first_name = $1::text`, [peopleName], callback)

}

tracksByName(peopleName, (err,res) => {
        if (err) {
          console.log(err)
        } else {
          console.log("Searching ...")
          console.log(`Found ${res.rows.length} person(s) by the name '${peopleName}': `)
          for (var i = 0; i < res.rows.length; i ++) {
          console.log(`- ${i+1}: ${res.rows[i].first_name} ${res.rows[i].last_name}, born ${res.rows[i].birthdate}` )
         }
        }
        client.end()
      })


// console.log(data)