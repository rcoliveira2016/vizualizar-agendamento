let sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
require('dotenv/config');

const nomeArquivoSqlite = process.env.NOME_ARQUIVO_SQLITE;
const pastaArquivoSqlite = process.env.PASTA_ARQUIVO_SQLITE;

const dbDefult = {
    naoIniciado:true
};

module.exports = {
    db: dbDefult,
    abrir: async function(){
        console.log(`${pastaArquivoSqlite}/${nomeArquivoSqlite}`);
        console.log(__dirname);
        this.db = await sqlite.open({ filename: `${pastaArquivoSqlite}/${nomeArquivoSqlite}`, driver: sqlite3.Database });
    },
    fechar: async function(){
        if(this.db.naoIniciado) return;

        await this.db.close()
    },
    all: async function (sql, params) {
        try {
            await this.abrir();
            return await this.db.all(sql);
        } catch (error) {
            return {erro:error.toString()}
        }
        finally{
            await this.fechar();            
        }
        
    }
};