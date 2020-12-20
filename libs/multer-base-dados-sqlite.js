let multer = require('multer');
let path = require('path');
const fs = require('fs')
require('dotenv/config');

const nomeArquivoSqlite = process.env.NOME_ARQUIVO_SQLITE;
const pastaArquivoSqlite = process.env.PASTA_ARQUIVO_SQLITE;
const caminho = `${pastaArquivoSqlite}/${nomeArquivoSqlite}`;

let storageBaseDadosSqlite = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, pastaArquivoSqlite)
    },
    filename: function (req, file, cb) {
        try {
            console.log(caminho);
            console.log(__dirname);
            if (fs.existsSync(caminho)) {
                fs.unlinkSync(caminho)
            }
        } catch(err) {
            console.error(err)
        }        
        cb(null, nomeArquivoSqlite)
    }
  })
   
let uploadBaseDadosSqlite = multer({ 
    storage: storageBaseDadosSqlite,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.db') {
            return callback(null, false)
        }
        callback(null, true)
    },
})

module.exports = uploadBaseDadosSqlite;
  