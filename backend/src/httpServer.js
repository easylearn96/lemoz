import { createServer } from "http";

export let httpserver;

export const createhttpServer = (app) => {
    httpserver = createServer(app)
    return httpserver
}

export const getHttpServer = () => {
    if(!httpserver){
        throw new Error("Http server not found")
    }
    return httpserver
}
