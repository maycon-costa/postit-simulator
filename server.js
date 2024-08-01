const express = require('express'); // importa o módulo Express, que é framework para apps web e APIs com Node.
const mysql = require('mysql2'); // importa o módulo MySQL12 que conecta e faz a interação com o banco de dados MySQL.
const bodyParser = require('body-parser'); // importa o módulo body-parser, que ajuda a analisar corpos de requisição JSON.
const cors = require('cors'); //  importa o módulo que permite o Cross-Origin Resourcer Sharing, que facilita a requisições de outros domínios.

const app = express(); // cria uma instância do app Express.
const port = 3020; // define a porta que servidor irá rodar.

app.use(bodyParser.json()); // configura o aplicativo para usar o body-parser para interpretar corpos de requisição como JSON.
app.use(cors()); // configura o aplicativo para permitir solicitações de diferentes origens (CORS).

// configuração de conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost', // o endereço do servidor MySQL.
    user: 'Maycon', // nome de usuário.
    password: 'B@ekho1003', // senha.
    database: 'taskdb', // nome do banco.
    connectTimeout: 10000 // tempo máximo em milissegundos que o MySQL tentará se conectar antes de desistir.
});
// tenta estabelecer uma conexão com o banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err); // exibe uma mensagem de erro se não conseguir conectar.
        return;
    }
    console.log('Conectado ao banco de dados MySQL'); // exibe uma mensagem se a conexão for bem-sucedida.
});

// rota POST para salvar uma nova tarefa no banco de dados
app.post('/save_task', (req, res) => {
    console.log('Recebido no servidor:', req.body); // loga os dados recebidos no corpo da requisição.
    const { title, task_description, due_date } = req.body; // desestrutura os campos necessários do corpo da requisição.

    // define a query SQL para inserir uma nova tarefa
    const query = 'INSERT INTO tasks (title, task_description, due_date) VALUES (?, ?, ?)';
    
    // executa a query SQL, substituindo os placeholders pelos valores reais
    db.query(query, [title, task_description, due_date], (err, result) => {
        if (err) {
            console.error('Erro ao inserir tarefa no banco de dados:', err); // loga o erro se ocorrer ao executar a query.
            return res.status(500).json({ success: false, message: 'Erro ao salvar a tarefa' }); // retorna uma resposta de erro.
        }
        console.log('Tarefa inserida com sucesso:', result); // mostra uma confirmação de que a tarefa foi inserida.
        res.status(200).json({ success: true, message: 'Tarefa salva com sucesso' }); // retorna uma resposta de sucesso.
    });
});

// inicia o servidor para escutar na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`); // mostra que o servidor está rodando e em qual porta.
});

