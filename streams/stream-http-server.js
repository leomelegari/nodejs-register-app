import http from "node:http"
import { Transform } from "node:stream"

class InverseNumberStream extends Transform {
    // método do Transform
    // chunk => é o valor enviado no push do Readable
    // encoding => como essa informação está codificada (no nosso caso, Buffer)
    // callback => function que a stream de escrita precisa chamar quando ela terminou o que precisava fazer
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)
        // primeiro param: erro (caso não tenha erro, será null)
        // segundo param: a tranformação
        callback(null, Buffer.from(String(transformed)))
    }
}

// req => readable stream
// res => writable stream

const server = http.createServer(async (req, res) => {

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log("fullStreamContent ", fullStreamContent);

    return res.end(fullStreamContent)

    // return req
    //     .pipe(new InverseNumberStream())
    //     .pipe(res)
})

server.listen(3334)