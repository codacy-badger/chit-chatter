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

module.exports.random = function(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
}
module.exports.login = function (token) {
bot.login(token)
}


module.exports.add = function(obj, arr, expr, resp) {

    arr.forEach(e => {
        classifier.add(e, expr)
    });
    obj[expr] = resp
}
module.exports.train = function() {
classifier.train()
}
module.exports.testing = function() {
    console.log('Success!')
    }
module.exports.chain = function(part, name) {
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

module.exports.listenChain = function(expr, message) {
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


module.exports.classify = function(message) {

        const classifications = classifier.getClassifications(`${message}`);
        return classifications.reduce((prev, current) => (prev.value > current.value) ? prev : current)
   
}
// func end
