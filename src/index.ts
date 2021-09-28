import * as http from 'http'

const serve = http.createServer()

serve.on('request', (request, response) => {
  // console.log('request.headers',request.headers);
  // console.log('request.method',request.method);
  const chunkArr = []
  request.on('data', (chunk) => {
    chunkArr.push(chunk)
  })

  request.on('end', () => {
    const data = Buffer.concat(chunkArr).toString()
    // console.log(Buffer.concat(chunkArr).toString());
    response.statusCode = 200
    response.end(data)
  })
})

serve.listen(8000)
