module.exports= {
    name: "help",
    description: "help command",
    execute(message, args){
        message.channel.send("scrivi '%judge' per giudicare la tua meme");
    }
}