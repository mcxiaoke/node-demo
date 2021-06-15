const querystring = require("querystring");
const fs = require("fs");
const os = require("os");
const path = require("path");
const formidable = require("formidable");

function start(request, response) {
  console.log("Request handler 'start' was called.");

  const body =
    "<html>" +
    "<head>" +
    '<meta http-equiv="Content-Type" ' +
    'content="text/html; charset=UTF-8" />' +
    "</head>" +
    "<body>" +
    '<form action="/upload" enctype="multipart/form-data" ' +
    'method="post">' +
    '<input type="file" name="upload">' +
    '<input type="submit" value="Upload file" />' +
    "</form>" +
    "</body>" +
    "</html>";

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(body);
  response.end();
}

function upload(request, response) {
  console.log("Request handler 'upload' was called.", request.method);
  if (request.method != "POST") {
    response.writeHead(400, { "Content-Type": "text/plain" });
    response.write("Bad Request: only POST allowed!");
    response.end();
    return;
  }
  const form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function (error, fields, files) {
    console.log("parsing done", files.upload.path);
    fs.renameSync(files.upload.path, path.join(os.tmpdir(), "test.png"));
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("Received image:<br/>");
    response.write("<img src='/show' height='400' width='300'/>");
    response.end();
  });
}

function show(request, response) {
  console.log("Request handler 'show' was called.");
  fs.readFile(
    path.join(os.tmpdir(), "test.png"),
    "binary",
    function (error, file) {
      if (error) {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.write(error + "\n");
        response.end();
      } else {
        response.writeHead(200, { "Content-Type": "image/png" });
        response.write(file, "binary");
        response.end();
      }
    }
  );
}

exports.start = start;
exports.upload = upload;
exports.show = show;
