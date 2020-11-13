<<<<<<< HEAD
module.exports= {
    name: "judge",
    description: "It will judge your meme",
    execute(message, args, filename){
        message.channel.send( {files :[{attachment: filename}]} );
    }
=======
module.exports= {
    name: "judge",
    description: "It will judge your meme",
    execute(message, args, filename){
        message.channel.send( {files :[{attachment: filename}]} );
    }
>>>>>>> 9b1192156637b394997750a196818647976d5d97
}