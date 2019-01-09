##  Chit-chatter
[![](https://img.shields.io/github/languages/code-size/badges/shields.svg)](https://github.com/Valentin1503/chit-chatter)
[![](https://img.shields.io/github/license/:user/:repo.svg)](https://github.com/Valentin1503/chit-chatter)
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
> Never delete (and don't forget to add to your code) responses object and dia object , it can't work without it!
> First require chit-chatter 
```js
const chat = require('chit-chatter')
```
*This repository already got a sample bot in it which you can use after entering your bot's token into :point_down:*

```JavaScript
chat.login('Your token here')
```
at the end of the main.js file.


**In order to add a simple _response_:** call (use)

```JavaScript
chat.add(array, expression, array)

```
function in main.js(if you are modifying the sample bot)
or into your code(if you are building your own) using this **_parameters_**:
array of possible user messages that the bot will react to (**array**),
expression which will be set to this kind of messages(**string**),
array of possible responses(**array**)

> then

```js
chat.train()
```
**In order to add a  _dialog_:** call (use)

```JavaScript
chat.chain(array, expression)
```
function in main.js(if you are modifying the sample bot)
or into your code(if you are building your own) using **_parameters_** listed here:
array of messages in format user-bot-user-bot and so on...(**array**),
expression which will be set to this kind of messages(**string**),
**_But_ _remember_:**
You will also need to call add() method with all the messages you use in your dialog and mark it's expression the same way **_but_** don't add last parameter (responses)


There are also 

```JavaScript
chat.random(array)
```
to pick a random element of an array(it's needed when replying with one of the responses)

```JavaScript
chat.testing()
```
to check if it works(if it does it will lof 'Success!' to the console)

**and**
```JavaScript
chat.listenChain(expression, message)
```
to handle the dialogues(it sends the messages itself!).