'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Rachel\'s Bot!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name}
Is that OK? %[Yes](postback:yes) %[No](postback:no)`))
                .then(() => 'askhow');
        }
    },
    
    askhow: {
        prompt: (bot) => bot.say('Would you like to see my resume?'),
        receive: (bot, message) => {
            const how = message.text;
            return bot.setProp('how', how)
                .then(() => bot.say(`ok great, Let me get that for you!`))
                .then(() => 'askq');
        }
    },
    
      askq: {
        prompt: (bot) => bot.say('Have you had any thoughts on how you plan to approach your first few weeks in the job?'),
        receive: (bot, message) => {
            const q = message.text;
            return bot.setProp('q', q)
                .then(() => bot.say(`I'd love to talk more about that, if you'd like to carry on please type CONTINUE`))
                .then(() => 'speak');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});

