const server = require("./server");
const routes = require("./routes");
const handlers = require("./handlers");

const handle = {};
handle["/"] = handlers.start;
handle["/start"] = handlers.start;
handle["/upload"] = handlers.upload;

server.start(routes.route, handle);
