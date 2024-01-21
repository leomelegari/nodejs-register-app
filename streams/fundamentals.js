// Ler/executar pequenas partes de músicas, videos, etc mesmo que não esteja carregado totalmente

// Exemplo simples:
// - Importação de clientes via CSV
// - Esse arquivo tenha 1gb de tamanho e mais de 1 milhão de linhas
// - Enviado através de uma rota POST /upload import.csv
// - Enquanto está sendo feito o upload do arquivo, ele já vai inserindo no banco de dados as linhas já processadas
// - Caso não tivesse streaming, ele primeiro carregaria os 1gb e depois inseriria no banco de dados

// - Readable Streams

// Streams => 

// process.stdin -> tudo que recebe como entrada, ele encaminha para uma saída (stdout). 
// Então quando você descomenta a linha 17, executa esse arquivo (node .\streams\fundamentals.js) e digita algo no terminal, 
// ele vai repetir o que vc escreveu
// process.stdin.pipe(process.stdout)

// Apenas reforçando que praticamente não se usa isso no dia a dia, pois os req e res do node já fazem isso por si só


// ### Streams ###

import { Readable, Writable, Transform } from "node:stream"

// Stream de leitura
class OneToHundredStream extends Readable {
    index = 1

    // método do Readable
    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                // push é um método do Readable para inserir as informaç~eos que estão sendo lidas
                this.push(null)
            } else {
                const buff = Buffer.from(String(i))
                this.push(buff)
            }
        }, 500)
    }
}

// Stream de transformação
class InverseNumberStream extends Transform {
    // método do Transform
    // chunk => é o valor enviado no push do Readable
    // encoding => como essa informação está codificada (no nosso caso, Buffer)
    // callback => function que a stream de escrita precisa chamar quando ela terminou o que precisava fazer
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        // primeiro param: erro (caso não tenha erro, será null)
        // segundo param: a tranformação
        callback(null, Buffer.from(String(transformed)))
    }
}

// Stream de escrita
class MultiplyByTenStream extends Writable {
    // método do Writable
    // chunk => é o valor enviado no push do Readable
    // encoding => como essa informação está codificada (no nosso caso, Buffer)
    // callback => function que a stream de escrita precisa chamar quando ela terminou o que precisava fazer

    // A stream de escrita nunca transforma os dados em outro, ela apenas o processa
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}



new OneToHundredStream() // leio os dados
    .pipe(new InverseNumberStream()) // transformo os dados (middleware stream +-)
    .pipe(new MultiplyByTenStream()) // escrevo os dados