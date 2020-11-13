module.exports= {
    name: "judge",
    description: "It will judge your meme",
    execute(message, args, filename){
        message.channel.send( {files :[{attachment: filename}]} );
    }
}