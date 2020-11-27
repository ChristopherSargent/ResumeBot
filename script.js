'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Christopher Sargent\'s Personal Bot!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Very cool! It is very nice to meet you ${name}`))
                .then(() => 'askhow');
        }
    },
    
    askhow: {
        prompt: (bot) => bot.say('Would you like to see Christopher\'s Linkedin profile?'),
        receive: (bot, message) => {
            const how = message.text;
            return bot.setProp('how', how)
                .then(() => bot.say('https://www.linkedin.com/pub/christopher-sargent/1b/530/391'))
                .then(() => 'askq');
        }
    },
    
      askq: {
        prompt: (bot) => bot.say('Would you like to see Christopher\'s resume?'),
        receive: (bot, message) => {
            const q = message.text;
            return bot.setProp('q', q)
                .then(() => bot.say('https://github.com/ChristopherSargent/ResumeBot/edit/master/img/CAS-Resume-2020-Rev1.2.pdf'))
                .then(() => 'speak');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my boss didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});

