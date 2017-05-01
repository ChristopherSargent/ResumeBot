'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Rachel Walker\'s Personal Bot!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Very cool! I'll call you ${name}`))
                .then(() => 'askhow');
        }
    },
    
    askhow: {
        prompt: (bot) => bot.say('Would you like to see Rachel\'s Linkedin profile?'),
        receive: (bot, message) => {
            const how = message.text;
            return bot.setProp('how', how)
                .then(() => bot.say('https://www.linkedin.com/in/rachel-walker-111787a1'))
                .then(() => 'askq');
        }
    },
    
      askq: {
        prompt: (bot) => bot.say('Would you like to see Rachel\'s resume?'),
        receive: (bot, message) => {
            const q = message.text;
            return bot.setProp('q', q)
                .then(() => bot.say(`ftp://68.10.140.89/pub/R-WalkerResume.pdf`))
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

