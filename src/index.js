const express = require('express')
const mysql = require('mysql2')
const app = express()

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const connection = mysql.createConnection(config)


function initScript() {

}

app.get('/', (req, res) => {

  const sql = 'INSERT INTO people(name) values ("marcos")';
  connection.query(sql)

  const select = "SELECT * FROM people"
  connection.query(select, function(err, result) {
    if (err) {
      res.json({
        'msg': err
      })

      return;
    }

    const peoples = result.reduce((acc, item) => {
      return acc + `<li>${item.id}-${item.name}</li>`
    }, "")

    const html = `
      <h1>Full Cycle Rocks!</h1>
      <ul>
        ${peoples}
      </ul>
    `
    res.send(html)
    return;
  })


  return;

})

app.listen(5000, () => {
  console.log('server listening in :5000')
})