import { http, port } from "./http"
import "./websocket/client";

http.listen(port, () => console.log("Server is running on port", port));