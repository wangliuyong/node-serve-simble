import * as http from 'http'
import * as path from 'path'
import * as fs from 'fs'
import * as url from 'url'

const serve = http.createServer()

serve.on('request', (request, response) => {

  const { url: xpath, method, headers } = request
  // 静态服务器只有get
  if (method !== 'GET') {
    response.statusCode = 405
    response.end()
    return
  }
  // 设置缓存策略
  response.setHeader('Cache-Control', 'public,max-age=36000')
  // 解析URL获取参数
  const { pathname, query } = url.parse(xpath)
  let pathName = pathname

  // 处理首页
  if (pathname === '/') {
    pathName = '/index.html'
  }

  fs.readFile(path.resolve(__dirname, `public${pathName}`), (error, data) => {
    if (error) {
      response.statusCode = 404
      response.end()
    } else {
      // response.setHeader('content-type', 'text/html; charset=utf-8')
      response.end(data.toString())
    }
  })

  // switch (pathname) {
  //   case '/index.html':
  //     fs.readFile(path.resolve(__dirname, 'public/index.html'), (error, data) => {
  //       if (error) throw error
  //       response.setHeader('content-type', 'text/html; charset=utf-8')
  //       response.end(data.toString())
  //     })
  //     break;
  //   case '/style.css':
  //     fs.readFile(path.resolve(__dirname, 'public/style.css'), (error, data) => {
  //       if (error) throw error
  //       response.setHeader('content-type', 'text/css; charset=utf-8')
  //       response.end(data.toString())
  //     })
  //     break;
  //   case '/main.js':
  //     fs.readFile(path.resolve(__dirname, 'public/main.js'), (error, data) => {
  //       if (error) throw error
  //       response.setHeader('content-type', 'application/javascript; charset=utf-8')
  //       response.end(data.toString())
  //     })
  //     break;
  //   default:
  //     response.end()
  //     break;
  // }


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
