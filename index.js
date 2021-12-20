//Dependencies
const Groom = require("groom")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <input> <delimiter> <output_name>")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid delimiter.")
    process.exit()
}

if(!Self_Args[2]){
    console.log("Invalid output_name.")
    process.exit()
}

if(!Fs.existsSync(Self_Args[0])){
    console.log("input is invalid.")
    process.exit()
}

console.log("Reading the input data.")
const input_data = Fs.readFileSync(Self_Args[0], "utf8").split("\n")

if(!input_data.length){
    console.log("input data is empty.")
    process.exit()
}

var emails = []
var passwords = []

console.log("Filtering, please wait.")
for( i in input_data ){
    try{
        emails.push(input_data[i].split(Self_Args[1])[0])
        passwords.push(input_data[i].split(Self_Args[1])[1])
    }catch{
        console.log("input is not email & password/the delimiter is invalid.")
        process.exit()
    }
}

emails = Groom(emails)
passwords = Groom(passwords)

if(!passwords.length){
    console.log("input is not email & password/the delimiter is invalid.")
    process.exit()
}

console.log("Saving the results.")
Fs.writeFileSync(`output/${Self_Args[2]}_emails.txt`, emails.join("\n"), "utf8")
Fs.writeFileSync(`output/${Self_Args[2]}_passwords.txt`, passwords.join("\n"), "utf8")
console.log("Results has been saved to output.")