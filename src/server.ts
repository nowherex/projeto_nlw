import express from "express";

const app = express();
const port = 3000;

interface ErrorWithStatus extends Error {
    status?: number
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use((req, res, next) => {
//     const erro = new Error ('Rota não encontrada');
//     erro.status = 404;
//     next(erro)
// })

// app.use((error, req, res, next) => {
//     res.status(error.status || 500)
//     return res.send({
//         erro: {
//             mensagem: error.message
//         }
//     })
// })


app.get("/", (req, res) => {
    res.json({
        message: 'Olá from project'
    })
})


app.post("/users", (req, res) => {
    let user = req.body.user;
    res.json({
        message: `usuario ${user} criado com sucesso.`
    })
})


app.listen(port, () => console.log('servidor rodando na porta', port));