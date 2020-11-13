const fs = require('fs');
const main = require('./main')

class Logger {
    get_date() {
        let date = new Date()

        // getting the date
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()

        // getting the time
        let seconds = date.getSeconds()
        let minutes = date.getMinutes()
        let hours = date.getHours()
        if (seconds < 10) seconds = '0' + seconds.toString();
        if (minutes < 10) minutes = '0' + minutes.toString();
        if (hours < 10) hours = '0' + hours.toString();

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
    }
    print(text, type) {
        let date_now = this.get_date()
        let message = date_now + ' ' + `[${type.toUpperCase()}]` + ' ' + text
        console.log(message)

        if (main.fileExists('./logs.txt')) {
            let read = fs.readFileSync('./logs.txt')
            let buffer = message + '\n' + read
            fs.writeFileSync('./logs.txt', buffer)
        } else {
            fs.writeFileSync('./logs.txt', message)
        }
    }
};

module.exports.Logger = Logger;
