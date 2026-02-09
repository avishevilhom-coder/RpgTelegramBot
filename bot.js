    const TelegramBot = require('node-telegram-bot-api');
    require('dotenv').config();
    const token = process.env.TOKEN;
    const bot = new TelegramBot(token , {polling: true});

    console.log("Бот работает");
    bot.on('polling_error', console.log);
    const userState = {};

уср

    
    bot.on('message', (msg) =>{
        const chatId = msg.chat.id;
        const text = msg.text;
        console.log("Пришло сообщение " , text);

        
    switch(true){
case text === '/start':
    userState[chatId] = 'main_menu'
    bot.sendMessage(chatId, `Приветствую тебя в игре РПГ Ташкет сити!
            
    Главное меню:
    1 - Новая игра
    2 - Загрузить игру`);
    break;
case '1' && userState[chatId] === 'main_menu':
        userState[chatId] = 'vibor_klass';
    bot.sendMessage(chatId,`Добро пожаловать в РПГ стратегию:
Давай выберем кем ты будешь 
1 - Воин
2 - Лучник
3 - Маг` )
    break;
case (text === '1' && userState[chatId] === 'vibor_klass' ):   
        bot.sendMessage(chatId,`Хороший выбор:
Воин имеет свои статы:
Здоровь: 120
Урон: 10
Броня: 5
Мана: 30
Мана кост: 10
Урон магией: 15`);  
            break;
case (text === '2' && userState[chatId] === 'vibor_klass' ):   
      bot.sendMessage(chatId,`Хороший выбор:
Лучник имеет свои статы:
Здоровь: 80
Урон: 12
Броня: 2
Мана: 40
Мана кост: 10
Урон магией: 15`);
  break;
case (text === '3' && userState[chatId] === 'vibor_klass' ):  
bot.sendMessage(chatId,`Хороший выбор:
Маг имеет свои статы:
Здоровь: 60
Урон: 14
Броня: 1
Мана: 50
Мана кост: 15
Урон магией: 18`);
break;
default:
    console.log("Введите от 1  до 3");
    break;
        }

        
});