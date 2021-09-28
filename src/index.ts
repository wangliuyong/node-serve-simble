import * as http from 'http'
import * as path from 'path'
import * as fs from 'fs'

const serve = http.createServer()

serve.on('request', (request, response) => {

  const { url, method, headers } = request
  const publicPath = path
  console.log(url);

  switch (url) {
    case '/index.html':
      fs.readFile(path.resolve(__dirname, 'public/index.html'), (error, data) => {
        if (error) throw error
        response.setHeader('content-type', 'text/html; charset=utf-8')
        response.end(data.toString())
      })
      break;
    case '/style.css':
      fs.readFile(path.resolve(__dirname, 'public/style.css'), (error, data) => {
        if (error) throw error
        response.setHeader('content-type', 'text/css; charset=utf-8')
        response.end(data.toString())
      })
      break;
    case '/main.js':
      fs.readFile(path.resolve(__dirname, 'public/main.js'), (error, data) => {
        if (error) throw error
        response.setHeader('content-type', 'application/javascript; charset=utf-8')
        response.end(data.toString())
      })
      break;
    default:
      response.end()
      break;
  }

  // const chunkArr = []
  // request.on('data', (chunk) => {
  //   chunkArr.push(chunk)
  // })

  // request.on('end', () => {
  //   const data = Buffer.concat(chunkArr).toString()
  //   // console.log(Buffer.concat(chunkArr).toString());
  //   response.statusCode = 200
  //   response.setHeader('name', 'wang')
  //   // response.write(data)
  //   response.end(data)
  // })
})

serve.listen(8000)
