let express = require('express');
let cors = require('cors');
let dbAgendamento = require(`${__dirname}/libs/db-agendamento.js`);
let uploadBaseDadosSqlite = require(`${__dirname}/libs/multer-base-dados-sqlite.js`);

let app = express();
app.use(cors());

var upload = uploadBaseDadosSqlite.single('file');
app.post('/upload', async (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      res.send({ erro: err });
    }
    res.send({ upload: true, files: req.files });
  })  
});

app.get('/clientes', async (req, res) => {
  const rows = await dbAgendamento.all("select * from cliente");
  res.json({
    "message":"success",
    "data":rows
  });
});

app.get('/', async (req, res) => {
  res.send({Status:"ONLINE"});
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});