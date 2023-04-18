// Criando um servidor

// Configurações do servidor, declaração do framework e ferramentas
const express = require('express')
const app = express()
const port = 3000
const uuid = require('uuid')
const bodyParser = require('body-parser')
const { request } = require('express')
app.use(bodyParser.json())

const users = []

// Estrutura de um Middleware => interceptar as requisições para verificar os dados e alterar os dados tambem

const checkUserId = (request, response, next ) => {
    const { id } = request.params

    //verificando se o item é igual ao id 
    const index = users.findIndex(user => user.id === id)

    if (index < 0){
        return response.status(404).json({ message: "User not found" })
    }

        request.userIndex = index
        request.userId = id

        next()

}

// Rota para buscar as informações no back-end

app.get('/users', (request, response) => {

    return response.json(users)
})

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})

// Rota para criar as informações no Back-end

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

// Rota para atualizar as informações do usuário, vamos busca=lo através do id, realizando uma pesquisa específica

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }

    //criando a rota de atualização dos usuários
    users[index] = updateUser

    return response.json(updateUser)
})

// Rota Delete para deletar os usuários

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})