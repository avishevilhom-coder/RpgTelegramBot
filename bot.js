    import fs from 'fs';
    import promptSync from 'prompt-sync';
    const prompt = promptSync();
    import TelegramBot from 'node-telegram-bot-api';
    import 'dotenv/config';
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
case (text === '1' && userState[chatId] === 'main_menu'):
        userState[chatId] = 'vibor_klass';
    bot.sendMessage(chatId,`Добро пожаловать в РПГ стратегию:
Давай выберем кем ты будешь 
1 - Воин
2 - Лучник
3 - Маг` )
    break;

    
case (text === '2' && userState[chatId] === 'main_menu'):
    loadGame(msg,text,player);
break;

case (text === '1' && userState[chatId] === 'vibor_klass' ): 
userState[chatId] = 'new_game_next_etap';
//userState[chatId] = 'save_game';  
  //userState[chatId] = 'load_game'; 
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
                    player.mana= 30;
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
    userState[chatId] = 'new_game_next_etap';  
      bot.sendMessage(chatId,`Хороший выбор:
Лучник имеет свои статы:
Здоровь: 80
Урон: 12
Броня: 2
Мана: 40
Мана кост: 10
Урон магией: 15`);
                    player.className = "Лучник";
                    player.hp= 80;
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
userState[chatId] = 'new_game_next_etap';

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

case (userState[chatId] === 'new_game_next_etap'):
    nextStap(msg, text, player);
    break;



default:
    bot.sendMessage(chatId, 'Введите от 1 - 3 (нажмите /start');
    break;
        }

async function Stati(msg, text, player){
    
   
    const inventoryList = player.inventory.map(item => item.name).join (' ,');
    await bot.sendMessage(chatId, `Хорошо ты создал ${player.className}a Теперь посмотрим его статы
   Здоровье = ${player.hp}
   Урон = ${player.damage}
   Броня = ${player.armor}
   Мана = ${player.mana}
   Оружие = ${player.damage}
   Лвл = ${player.lvl}
   МанаКост = ${player.manacost}
   Атака магией = ${player.magickattack}
   Инвентарь = ${inventoryList}`);
   showMenuNextStep(chatId);
}








function saveGame(msg, text, player){
    /*
const inventoryList = player.inventory.map(item => item.name).join (' ,');
const playerData = `Класс = ${player.className} 
Здоровье = ${player.hp}
Урон = ${player.damage}
Броня = ${player.armor}
Мана = ${player.mana}
Оружие = ${player.damage}
Лвл = ${player.lvl}
МанаКост = ${player.manacost}
Атака магией = ${player.magickattack}
Инвентарь = ${inventoryList}`
    */
    fs.writeFile('save.txt',JSON.stringify(player) , function(error){
        if(error){
            console.log("Ошибка");
            bot.sendMessage("Ошибка сохранении перезапустите бота (/start)");
        }
    })
    console.log("Сохранение прошло успешно в консоль");
        bot.sendMessage(chatId, 'Сохранение прошло успешно');
        players[chatId] = player;
}

function loadGame(msg, text, player){
    
    if(fs.existsSync("save.txt")){
            try{
            const fileChtenie = fs.readFileSync("save.txt", "utf8");
            const loadPlayer = JSON.parse(fileChtenie);
            console.log("Загрузка прошла успешно в консоли ввывод ")
            const inventoryList = player.inventory.map(item => item.name).join (' ,');
            bot.sendMessage(chatId, 'Загрузка прошла успешно');
            bot.sendMessage(chatId, `Твой загрузочный персонаж ${player.className} Вспомни что у него было
   Здоровье = ${player.hp}
   Урон = ${player.damage}
   Броня = ${player.armor}
   Мана = ${player.mana}
   Оружие = ${player.damage}
   Лвл = ${player.lvl}
   МанаКост = ${player.manacost}
   Атака магией = ${player.magickattack}
   Инвентарь = ${inventoryList}`);
player = loadPlayer;
            }catch(error){
                console.log("Ошибка загрузки в консоль ")
                bot.sendMessage(chatId, "Ошибка загрузки");
            }
            
    }else{
        bot.sendMessage(chatId, 'Сохранений нету');
    }
}


function showMenuNextStep(chatId){
bot.sendMessage(chatId, `Хорошо ты выбрал себе класс и ознакомился с ним 
Что ты будешь делать теперь у нас?
1 - Пойти в ташкент сити молл
2 - Пойти в мэджик сити парк
3 - Сохранится 
4 - Загрузится `);

}
function nextStap(msg,text,player){
    const chatId = msg.chat.id;
 
switch(true){
    case (text === '1' && userState[chatId] === 'new_game_next_etap'):
        bot.sendMessage(chatId, 'Удачи тебе в ташкент сити моле');
    break;
    case (text === '2' && userState[chatId] === 'new_game_next_etap'):
        bot.sendMessage(chatId,'Удачи тебе в мэджик сити парке');
    break;
    case (text === '3'):
        bot.sendMessage(chatId,'Сохранение пошлоооо');
        saveGame(msg, text, player);
    break;
    case(text === '4'):
        bot.sendMessage(chatId,' Загрузка пошлаааааааа');
    break;
    default:
        bot.sendMessage(chatId, "от 1 до 4");
    break;
}
}

});
