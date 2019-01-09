const {
    Client,
    Attachment
} = require('discord.js');
// Create a document
var _ = require('lodash');
const {
    NlpClassifier
} = require('node-nlp');
const classifier = new NlpClassifier({
    language: 'en'
});
const {
    SimilarSearch
} = require('node-nlp');
const bot = new Client()
const similar = new SimilarSearch();
//Responses

var state = 0
var responses = {

}

var dia = {

}
// resp end
//Functions 
exports.chat = function () {
function random(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
}
function login(token) {
bot.login(token)
}


function add(arr, expr, resp) {
    arr.forEach(e => {
        classifier.add(e, expr)
    });
    responses[expr] = resp
}
function train() {
classifier.train()
}
function test() {
    console.log('Success!')
    }

function chain(part, name) {
    var intentsOdd = []
    var repliesEven = []
    for (var i = 0; i < part.length; i += 2) { // take every second element
        intentsOdd.push(part[i]);
    }
    for (var i = 1; i < part.length; i += 2) { // take every odd element
        repliesEven.push(part[i]);
    }
    dia[name] = {
        intents: intentsOdd,
        replies: repliesEven
    }
    console.log(dia[name])
}

function listenChain(expr, message) {
    dia[expr].intents.forEach((e, i) => {
        if (similar.getSimilarity(e.toString(), message.toString()) < 25 && i === state) {
            message.channel.send(dia[expr].replies[i])
            console.log(state)
            state++
            console.log(state)
        } else if (state >= dia[expr].intents.length) {
            state = 0
        }

    });
}
}
// func end
