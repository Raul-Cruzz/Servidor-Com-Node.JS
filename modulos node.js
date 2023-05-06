

const express = require('express') // usando os módulos do framework

function sum(firstNumber, SeccondNumber) {
    return firstNumber + SeccondNumber
}

function multi(firstNumber, SeccondNumber) {
    return firstNumber * SeccondNumber
}

const person = {
    name: "Raul",
    age: 29
}

// exportando o objeto para que seja acessado de outra página


module.exports = {sum, multi, person}

//no escopo global o this se referencia ao module.exports

this.person = person // exportando um objeto com o this