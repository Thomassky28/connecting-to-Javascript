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
knex('famous_people')
  .insert({id: '8', first_name: 'Shawshank', last_name:'Redemption', birthdate: '2000-02-12'})
  .returning('*')
  .asCallback((err, rows) => {
console.log(rows);
console.log(err);
knex.destroy();

  })