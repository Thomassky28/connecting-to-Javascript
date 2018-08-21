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

var args = process.argv.slice(2)
var first_nameame1 = args[0]
var last_name1 = args[1]
var birthdate1 = args[2]


knex('famous_people')
  .insert({
    first_name: first_nameame1,
    last_name: last_name1,
    birthdate: birthdate1
  })
  .returning('*')
  .asCallback((err, rows) => {
console.log(rows);
console.log(err);
knex.destroy();

  })