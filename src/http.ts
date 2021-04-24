
import express from "express";
import { createServer } from "http";
import { Server, Socket} from "socket.io"
import { routes } from "./routes";
import path from "path";

import "./database";

const app = express();
const port = 3333;


app.use(express.static(path.join(__dirname, "..","public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html");
})

app.get("/pages/admin", (request, response) => {
    return response.render("html/admin.html");
})

const http = createServer(app); // Criando protocolo http
const io = new Server(http); // Criando protocolo WS


io.on("connection", (socket: Socket) => {
    console.log("Se conectou", socket.id)
})
interface ErrorWithStatus extends Error {
    status?: number
}
    

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

app.use((request, response, next) => {
    let erro = new Error("Route not found") as ErrorWithStatus;
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

export { http, io, port};