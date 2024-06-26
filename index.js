const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const PORT = process.env.PORT || 3000;

express()
    .get('/', (req, res) => {
        res.send('I am Carrot Rush Bot!');
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`));


const token = '7229765701:AAEmXagRn6Bg0A85X6M57vh0holE4fbJbS8';
const gameName = 'cr001';

const bot = new TelegramBot(token, {polling: true});

const queries = {};

async function main() {
    bot.on('callback_query', query => {
        console.log('callback_query', query);
        if (query.game_short_name !== gameName) {
            bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
        } else {
            queries[query.id] = query;
            let gameurl = "https://gryyny.github.io/carrot-rush-test/?id="+query.id;
            bot.answerCallbackQuery(query.id, {
                url: gameurl
            });
        }
    })
}

main();