import { createReadStream } from 'fs';
import TelegramBot from 'node-telegram-bot-api';

const TOKEN = process.env.TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', (...args) => console.log({ args }));

bot.onText(/^\/start/, msg => {
    const { chat, from, entities, message_id } = msg;

    console.log({ msg, entities });

const text = `
Welcome *${from.username}*!!!

*bold text*
_italic text_
[inline URL](http://www.example.com/)
[${from.username}](tg://user?id=${from.id})
\`inline fixed-width code\`
\`\`\`block_language
pre-formatted fixed-width code block
\`\`\`
`;

    bot.sendMessage(chat.id, text, { parse_mode: 'Markdown', reply_to_message_id: message_id });
});
    
bot.onText(/^\/image/, msg => {
    const imageStream = createReadStream('/home/jesusgoku/Downloads/temp/kindle.jpg');
    bot.sendPhoto(msg.chat.id, imageStream);
});

bot.onText(/^\/location/, msg => {
    const opts = {
        reply_markup: JSON.stringify({
        keyboard: [
            [{text: 'Location', request_location: true}],
            [{text: 'Contact', request_contact: true}],
            [{text: '/image'}],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
        }),
    };
    bot.sendMessage(msg.chat.id, 'Contact and Location request', opts);
});
  
bot.on('location', ({ location }) => {
    const { latitude, longitude } = location;
    console.log({ latitude, longitude });
});
  