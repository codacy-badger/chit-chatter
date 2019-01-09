const {
    Client,
    Attachment
} = require('discord.js');
const bot = new Client();
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

const similar = new SimilarSearch();
//Responses

var state = 0
var responses = {

}

var dia = {

}
// resp end
//Functions 
function random(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

function add(arr, expr, resp) {
    arr.forEach(e => {
        classifier.add(e, expr)
    });
    responses[expr] = resp
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

// func end
//Classify
add(['hi!', 'heya!', 'hello!', 'hi guys!'], 'greet', ['Hello!', 'Hey!', "We've been waiting for you!", 'Great to see you!'])
add(['bye', 'goodbye', 'cu', 'see you', 'bye everyone', 'see u', 'c you'], 'bye', ['See you!', 'Bye!', "We'll be waiting for you!", 'Bye-bye!'])
add(['doing well?', 'you alright?', 'hru', 'how are you?', 'howdy', 'how are you doing?'], 'how are you', ['Great!', "I'm great!", "Doing well!", 'Awesome!'])
add(['good night', 'feeling sleepy', 'going to sleep', 'goodnight', 'sleepy', "i'm sleepy"], 'sleepy', ['Goodnight', "I'm sleepy too", "Goodnight guys!", 'See you in the morning!'])
add(['old', 'how old are you?', 'age', 'you old?', 'you are old?', 'are you old?', 'so, you are 14?', "so, what is you age?"], 'age')
classifier.train();
chain(['how old are you?', "I'm too young, idk what's my age", "so, what is you age?", "Idk, really"], 'age')

try {
    // clasf end
    //Greet new members
    bot.on('guildMemberAdd', member => {
        member.guild.channel.send("Welcome, type help for bot info!");
    });
    // greet new end
    // When launched
    bot.on('ready', async () => {
        console.log('Bot is running!');

        bot.user.setActivity('some music', {
            type: 'LISTENING'
        });
    })
    // launch end
    bot.on('message', async message => {
        if (message.author.bot) return;
        if (message.channel.type === 'dm') return;
        // Variables
        let messageArr = message.content.split(" ");
        let cmd = messageArr[0];
        let args = messageArr.slice(1)
        messageArr = messageArr.map(function (value) {
            return value.toLowerCase();
        })
        // var end
        const classifications = classifier.getClassifications(`${message}`);
        const max = classifications.reduce((prev, current) => (prev.value > current.value) ? prev : current)
        if (!message.mentions.members.first()) {
            console.log(max)
            lastMark = max
            var ref = responses[max.label]
            var response = random(ref)
            if (max.value >= 0.8) {
                message.channel.send(`${response}`)
            }
        } else if (message.mentions.members.first().user.username === bot.user.username) {
            listenChain(max.label, message)

        }
    })
} catch {
    return
}
bot.login('Your ENV token');