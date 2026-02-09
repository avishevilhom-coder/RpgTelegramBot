    const TelegramBot = require('node-telegram-bot-api');
    require('dotenv').config();
    const token = process.env.TOKEN;
    const bot = new TelegramBot(token , {polling: true});

    console.log("Бот работает");
    bot.on('polling_error', console.log);
    const userState = {};
    const players = {}; 

    
    bot.on('message', (msg) =>{
        const chatId = msg.chat.id;
        const text = msg.text;
        console.log("Пришло сообщение " , text);
        let player = players[chatId] || {}; 
        
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
                    player.className = "Воин";
                    player.hp= 120;
                    player.damage= 10;
                    player.armor= 5;
                    player.mana= 3;
                    player.weapon= "Секира";
                    player.lvl= 1;
                    player.manacost= 10;
                    player.magickattack = 15;
                    player.inventory = [
                        {name: "Зелье лечение", effect: "Лечение" , type: "Зелье" , value: 20 },
                        {name: "Секира" ,type: "weapon", damage: 10} 
                    ];

Stati(msg, text, player); 
players[chatId] = player;
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
                    player.className = "Лучник";
                    player.hp= 90;
                    player.damage= 12;
                    player.armor= 2;
                    player.mana= 40;
                    player.weapon= "Лук";
                    player.lvl= 1;
                    player.manacost= 10;
                    player.magickattack = 15;
                    player.inventory = [
                        {name: "Зелье лечение", effect: "Лечение" , type: "Зелье" , value: 20 },
                        {name: "Лук" ,type: "weapon", damage: 12} 
                    ];
  Stati(msg, text, player); 
  players[chatId] = player;                 
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
                    player.className = "Маг";
                    player.hp= 60;
                    player.damage= 14;
                    player.armor= 1;
                    player.mana= 50;
                    player.weapon= "ЖезлоАлександра 1";
                    player.lvl= 1;
                    player.manacost= 15;
                    player.magickattack = 18;
                    player.inventory = [
                        {name: "Зелье лечение", effect: "Лечение" , type: "Зелье" , value: 20 },
                        {name: "ЖезлоАлександра 1" ,type: "weapon", damage: 14} 
                    ];


Stati(msg, text , player);
players[chatId] = player;
break;
default:
    bot.sendMessage(chatId, 'Введите от 1 - 3 (нажмите /start');
    break;
        }

function Stati(msg, text, player){
const inventoryList = player.inventory.map(item => item.name).join (' ,');
bot.sendMessage(chatId, `Хорошо ты создал ${player.className} Теперь посмотрим его статы
   Здоровье = ${player.hp}
   Урон = ${player.damage}
   Броня = ${player.armor}
   Мана = ${player.mana}
   Оружие = ${player.damage}
   Лвл = ${player.lvl}
   МанаКост = ${player.manacost}
   Атака магией = ${player.magickattack}
   Инвентарь = ${inventoryList}`);
};

});
