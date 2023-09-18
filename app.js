const http = require('http')
const url = require('url')
const server = http.createServer(function(req, res) {
  const parsedUrl = url.parse(req.url)
  console.log(parsedUrl);
  // const val = JSON.parse(decodeURIComponent(parsedUrl.query).split('=')[1])
  // console.log(val);
})

server.listen(8889)