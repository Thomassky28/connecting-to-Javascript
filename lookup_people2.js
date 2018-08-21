// let knex = require("knex")
const settings = require("./settings");
let knex = require ('knex')({
  client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
 }
});

// client.connect()
var args = process.argv.slice(2)
var peopleName = args[0]



knex('famous_people')
  .where({'first_name': peopleName })
  .then(function(res) {
    console.log("Searching ...")
    console.log(`Found ${res.length} person(s) by the name '${peopleName}': `);
    for (var i = 0; i < res.length; i ++)
        {
        console.log(`- ${i+1}: ${res[i].first_name} ${res[i].last_name}, born ${res[i].birthdate}`)
        };
    return true
  })
  .then(function () {
    return knex.destroy();
  })


// knex('famous_people').select().asCallback(function(err, res) {
//    if (err) {
//      console.error(err)
//      return
//    }
//    client.query(`
//     select *
//       from famous_people as f
//       where f.first_name = $1::text`, [peopleName], callback)
//    return
//  })


// // ----------------------------------------------------------------

// function tracksByName(peopleName, callback) {

//    client.query(`
//     select *
//       from famous_people as f
//       where f.first_name = $1::text`, [peopleName], callback)

// }

// tracksByName(peopleName, (err,res) => {
//         if (err) {
//           console.log(err)
//         } else {
//           console.log("Searching ...")
//           console.log(`Found ${res.rows.length} person(s) by the name '${peopleName}': `)
//           for (var i = 0; i < res.rows.length; i ++) {
//           console.log(`- ${i+1}: ${res.rows[i].first_name} ${res.rows[i].last_name}, born ${res.rows[i].birthdate}` )
//          }
//         }
//         client.end()
//       })