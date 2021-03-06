##  Chit-chatter
[![](https://img.shields.io/github/languages/code-size/badges/shields.svg)](https://github.com/Valentin1503/chit-chatter)
[![](https://img.shields.io/github/license/:user/:repo.svg)](https://github.com/Valentin1503/chit-chatter)
Here's a link :point_right: : [NPM package](https://www.npmjs.com/package/chit-chatter)
###### Installation
To install the package run:

```
npm i chit-chatter
```
or 
```
npm install chit-chatter
```

## Usage
> Never delete responses object and dia object in the sample bot code if you decide to use it, it can't work without it!

*This repository already got a sample bot in it which you can use after entering your bot's token into :point_down:*

```JavaScript
bot.login('Your token here')
```
at the end of the main.js file.


**In order to add a simple _response_:** call (use)

```JavaScript
add(array, expression, array)
```
function in main.js(if you are modifying the sample bot)
or into your code(if you are building your own) using this **_parameters_**:
array of possible user messages that the bot will react to (**array**),
expression which will be set to this kind of messages(**string**),
array of possible responses(**array**)
 

**In order to add a  _dialog_:** call (use)

```JavaScript
chain(array, expression)
```
function in main.js(if you are modifying the sample bot)
or into your code(if you are building your own) using **_parameters_** listed here :point_down:
:
array of messages in format user-bot-user-bot and so on...(**array**),
expression which will be set to this kind of messages(**string**),
**_But_ _remember_:**
You will also need to call add() method with all the messages you use in your dialog and mark it's expression the same way **_but_** don't add last parameter (responses)

##For those who use it as a package

There are also 

```JavaScript
random(array)
```
to pick a random element of an array(it's needed when replying with one of the responses)

**and**
```JavaScript
listenChain(expression, message)
```
to handle the dialogues(it sends the messages itself!).