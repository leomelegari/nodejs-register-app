// Padrão de importação CommonJS -> usando require / pouco utilizado atualmente
// const http = require('http')

// Para usarmos o padrão "import/export", precisamos passar o type: module no nosso package.json, pode ser logo abaixo do nome da aplicação
import http from 'http'
import { randomUUID } from 'crypto'

// Métodos HTTP
// - GET: buscar info do backend
// - POST: criar algo no backend
// - PUT: editar/atualizar um recurso no backend (atualiza todo o objeto ou quase todo)
// - PATCH: atualizar uma info única ou específica de um recurso no backend (atualização de algo em específico, não todo o objeto)
// - DELETE: deletar algo no backend

// Stateful - Stateless
// - Stateful -> vai ter alguma informação guardada em memória, ou seja, a aplicação depende da memória, das informações 
// salvas em memória para que continue funcionando
// - Stateless -> Não salva nada em memória. Geralmente salva em dispositivos externos como: banco de dados, arquivos de texto, etc

// JSON -> Javascript Object Notation

// Cabeçalhos (Requisições, Respostas) -> Metadados

// HTTP status code (https://http.cat/):
// - Informational responses (100 – 199)
// - Successful responses (200 – 299)
// - Redirection messages (300 – 399)
// - Client error responses (400 – 499)
// - Server error responses (500 – 599)

const users = []

// Criação da primeira server/rota da aplicação
const server = http.createServer((req, res) => {

    const { method, url } = req

    // early return
    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    // early return
    if (method === 'POST' && url === '/users') {
        users.push(
            {
                id: randomUUID(),
                name: 'Leozin',
                email: 'leozin.com'
            },
            {
                id: randomUUID(),
                name: 'Marquin',
                email: 'marquin.com'
            }
        )
        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)
