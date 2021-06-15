const http = require("http");
const url = require("url");

function start(route, handle) {
  function onRequest(req, res) {
    const pathname = url.parse(req.url).pathname;
    // console.log("Request received:", pathname);
    route(handle, pathname, res);
    // res.writeHead(200, ["Content-Type", "text/plain"]);
    // res.write("Hello World!");
    // res.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server started at http://localhost:8888");
}

exports.start = start;
