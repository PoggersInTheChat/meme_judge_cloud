const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '%';

const fs = require('fs')

const files = ['./content/classic.mp4','./content/illegal.mp4','./content/death.mp4','./content/idk.mp4','./content/doom.mp4','./content/scatman.mp4','./content/nah.mp4','./content/death2.mp4','./content/up.mp4','./content/failed.mp4','./content/noread.mp4', './content/support.mp4', './content/shitmeme.mp4','./content/notfunny.mp4','./content/nofind.mp4', './content/destroyed.mp4']

const {Logger} = require('./logger');

const logger = new Logger;

var filesNum = files.length

const pogID = "771313683866451978"

const memeID = "547355234352234514"

const embedTest = new Discord.MessageEmbed()
    .setTitle("Questo è un test")
    .setDescription("poggers")
    .attachFiles(['./content/bruh.png'])
    .setImage('attachment://bruh.png')
    .setColor('f90505');


function random() {
    let Rand = Math.round(Math.random() * files.length);
    return Rand
};

const fileExists = (file) => {
    return new Promise((resolve, reject) => {
        fs.access(file, fs.constants.F_OK, (err) => {
            err ? reject(false) : resolve(true)
        });
    })
}
module.exports.fileExists = fileExists;

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));



for(const file of commandFiles){
    const command = require(`./Commands/${file}`);

    client.commands.set(command.name, command)
}

client.once('ready', () => {
    logger.print("The Judge is online", 'log')
    logger.print("In case of unsupported characters, look up the \"logs.txt\" file", 'log')
    logger.print(`There are currently ${filesNum} videos avalible`, 'log')
});

client.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    if(message.channel.id != pogID && message.channel.id != memeID) {
        logger.print(`unauthorized channel, user ${message.author.username} tried to initialize the bot at #${message.channel.name}`, 'err');                                         
        return;                                                                     
    }

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();

    switch (command) {
        default:
            message.channel.send("What?");
            logger.print(`WARNING: unknown command at #${message.channel.name}: user ${message.author.username} typed "${message.cleanContent.replace(prefix, "")}"`, 'err');
            break;
        /*case "join.voice":
                if (message.member.voice.channel){
                    let connection = await message.member.voice.channel.join();
                    let dispatcher = connection.play('./content/bruh.mp3')
                    dispatcher.on('start', () =>{
                        logger.print(`bruh.mp3 has started`, 'log')
                    })
                    dispatcher.on('finish', () =>{
                        connection.disconnect();
                        logger.print(`bruh.mp3 has finished`, 'log')
                    })
                }else{
                message.channel.send("you aren't in a voice channel")
                }
            break;*/
        case "judge.num":
            let admin_role = '547512716764643359';
            let owner_role = '615215753829810205';
            let roles = message.member.roles.cache;
            if(!roles.get(admin_role) && !roles.get(owner_role)){
                message.channel.send("missing permission")
                logger.print(`${message.author.username} has missing permission for "${command}"`, "log")
            }else{
                let numberString = message.cleanContent.replace(`%${command}`, "");
                let number = parseInt(numberString, 10);
                let specificFileName = files[number - 1];
                if(number > filesNum || number <= 0){
                    message.channel.send(`wrong number, there are currently ${filesNum} files, (1-${filesNum})`)
                    logger.print(`${message.author.username} required the wrong file number (${number})`, 'err')
                }else{
                message.channel.send( {files :[{attachment: specificFileName}]} );
                logger.print(`user ${message.author.username} asked for file N° "${number}" (${specificFileName})`, 'log')
                }
            };
            break;
        case "send.to.owner" :
            message.channel.send("your message has been sent")
            logger.print(`${message.author.username} said :"${message.cleanContent.replace(`${prefix}${command}`, "")}"`, 'mes');
            break;
        case "help":
           client.commands.get('help').execute(message, args);
           logger.print(`${message.author.username} asked for help at #${message.channel.name}`, 'log');
           break;
         case "judge":
            let Rand = random();
            let filename = files[Rand];   
            client.commands.get('judge').execute(message, args, filename);
            logger.print(`${message.author.username} requested a judgement at #${message.channel.name}, the result is "${filename.replace("./content/", "")}", file N° ${Rand}`, 'log');
            break;
        case "bruh":
            message.channel.send("bruh", {files :[{attachment: "./content/bruh.png"}]} );
            logger.print(`${message.author.username} asked for a bruh moment at #${message.channel.name}`, 'log');
            break;
        case "embed.test":
            message.channel.send(embedTest);
            logger.print(`${message.author.username} did a test at #${message.channel.name}`, 'log');
            break;
    }
})

client.login('NzcxMzA5MDc2MzIyNzEzNjAx.X5qPjg.flu5DyGSoHzGYcZQOwFbIjFvdSs');