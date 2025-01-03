// custom server for next.js and socket.io

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const initializeSocket = require("./lib/backendSocket");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    // Initialize WebSocket server
    const io = initializeSocket(server);

    server.listen(3000, () => {
        console.log("> Ready on http://localhost:3000");
    });
});
