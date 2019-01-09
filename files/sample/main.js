const {
    Client,
    Attachment
} = require('discord.js');
const bot = new Client();
const chat = require('')
//Responses

var state = 0
var responses = {

}

var dia = {

}
// resp end


//Classify
chat.add(['hi!', 'heya!', 'hello!', 'hi guys!'], 'greet', ['Hello!', 'Hey!', "We've been waiting for you!", 'Great to see you!'])
chat.add(['bye', 'goodbye', 'cu', 'see you', 'bye everyone', 'see u', 'c you'], 'bye', ['See you!', 'Bye!', "We'll be waiting for you!", 'Bye-bye!'])
chat.add(['doing well?', 'you alright?', 'hru', 'how are you?', 'howdy', 'how are you doing?'], 'how are you', ['Great!', "I'm great!", "Doing well!", 'Awesome!'])
chat.add(['good night', 'feeling sleepy', 'going to sleep', 'goodnight', 'sleepy', "i'm sleepy"], 'sleepy', ['Goodnight', "I'm sleepy too", "Goodnight guys!", 'See you in the morning!'])
chat.add(['old', 'how old are you?', 'age', 'you old?', 'you are old?', 'are you old?', 'so, you are 14?', "so, what is you age?"], 'age')
chat.train()
chat.chain(['how old are you?', "I'm too young, idk what's my age", "so, what is you age?", "Idk, really"], 'age')

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
            chat.listenChain(max.label, message)

        }
    })
} catch {
    return
}
bot.login('Your bot token');