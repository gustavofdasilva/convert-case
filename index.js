const PORT = process.env.PORT || 8000
const express = require('express')
const bodyParser = require('body-parser')
const app = express()



app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );
    next();
});

app.get('/',(req,res)=>{
    res.send("Convert Case. Starting using a POST method and passing in body: convert, string")
})

app.post('/',(req,res) => {

    const {convert} = req.body
    const {string} = req.body

    let formattedString='';
    let letterCount = string.length
    let wordCount = string.split(' ').length
    let phraseCount = string.split(/\.|\?|\!|\;|\:/g).length
    let paragraphCount = string.split('\n').length

    switch (convert) {
        case 'phrase':{
            let point = false
            let gotFirst=false
            for(const letter of string) {
                if(string.indexOf(letter) == 0 && !gotFirst) {
                    formattedString+=letter.toUpperCase()
                    gotFirst = true
                } else if(letter == '.' || letter == '?' || letter == '!' || letter == ':' || letter == ';' || letter == '\n') {
                    formattedString+=letter
                    point = true
                } else if(point) {
                    if(letter != " ") {
                        formattedString+=letter.toUpperCase()
                        point = false
                    } else {
                        formattedString+=letter
                    }
                } else {
                    formattedString+=letter
                }
            }

            }break;

        case 'lowercase':
            formattedString = string.toLowerCase()
                console.log(formattedString)
            break;
        
        case 'uppercase':
            formattedString = string.toUpperCase()
                console.log(formattedString)
            break;

        case 'first-uppercase':
            string.split(' ').map((word)=>{
                if(string.split(' ').indexOf(word) == string.split(' ').length-1){
                    formattedString += word.toUpperCase().substring(0,1) + word.substring(1,word.length)
                } else {
                    formattedString += word.toUpperCase().substring(0,1) + word.substring(1,word.length) + " "
                }
            })
                console.log(formattedString)
            break;
    
        case 'alternate-upper':{
            let change = true
                for(const letter of string) {
                    if(letter != ' ') {
                        if(change) {
                            formattedString += letter.toUpperCase()
                            change = false
                        } else {
                            formattedString += letter.toLowerCase()
                            change = true
                        }
                    }

                    if (letter == ' '){
                        formattedString+=' '
                    }
                }

                console.log(formattedString)
            }break;  
            
        case 'alternate-lower':{
            let change = false
                for(const letter of string) { 
                    if(letter != ' ') {
                        if(change) {
                            formattedString += letter.toUpperCase()
                            change = false
                        } else {
                            formattedString += letter.toLowerCase()
                            change = true
                        }
                    }

                    if (letter == ' '){
                        formattedString+=' '
                    }
                }
                console.log(formattedString)
            }break; 
        
        case 'title':
            wordArr = string.split(' ')

            wordArr.map(word=>{
                if(word.length > 1) {
                    formattedString += wordArr.indexOf(word) == wordArr.length-1 ? word.toUpperCase().substring(0,1) + word.substring(1,word.length) : word.toUpperCase().substring(0,1) + word.substring(1,word.length) + ' '
                } else {
                    wordArr.indexOf(word) == wordArr.length-1
                    formattedString += wordArr.indexOf(word) == wordArr.length-1 ? word : word+' '
                }
            })

            console.log(formattedString)

            break; 

        default:
            break;
    }

    res.json({formattedString,letterCount,wordCount,phraseCount,paragraphCount})
})

app.listen(PORT)

