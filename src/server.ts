import express from "express";

import "./database";

import { routes } from "./routes";


const app = express();
const port = 3333;

interface ErrorWithStatus extends Error {
    status?: number
}
    

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

app.use((request, response, next) => {
    let erro = new Error('Rota não encontrada') as ErrorWithStatus;
    erro.status = 404;
    next(erro)
})

app.use((error, request, response, next) => {
    response.status(error.status || 500)
    return response.send({
        erro: {
            mensagem: error.message
        }
    })
})



app.listen(port, () => console.log('servidor rodando na porta', port));