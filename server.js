let express = require('express');
let cors = require('cors');
let multer = require('multer');
let path = require('path');
let sqlite3 = require('sqlite3')

const nomeArquivoSqlite = "agendamento.db";
const pastaArquivoSqlite = "./data/sqlite/";

var storageBaseDadosSqlite = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pastaArquivoSqlite)
  },
  filename: function (req, file, cb) {
    cb(null, nomeArquivoSqlite)
  }
})
 
var uploadBaseDadosSqlite = multer({ 
  storage: storageBaseDadosSqlite,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.db') {
        return callback(null, false)
    }
    callback(null, true)
  },
})

let app = express();
app.use(cors());

app.post('/upload', uploadBaseDadosSqlite.array('file'), async (req, res) => {
  res.send({ upload: true, files: req.files });
});

app.get('/clientes', async (req, res) => {
  let db = new sqlite3.Database(`${pastaArquivoSqlite}/${nomeArquivoSqlite}`, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      res.send({erro:err});
      console.error(err.message);
    }
    var sql = "select * from cliente"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
  });  
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});