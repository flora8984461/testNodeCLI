#!/usr/bin/env node
const fs = require('fs');

const myArgs = process.argv[2];
const myArgs2 = process.argv[3];
const myArgs3 = process.argv[4];

let data = fs.readFileSync('bin/data.json')
dataContent = JSON.parse(data)

switch (myArgs) {
case 'add':
    var newDataArg = {[myArgs2]: myArgs3}
    var index = dataContent.indexOf(dataContent.find(ele => ele[myArgs2] === myArgs3))
        if(index != -1){
          console.log("already exists")
        }
        if(index == -1){
            dataContent.push(newDataArg)
            fs.writeFileSync('bin/data.json', JSON.stringify(dataContent))
            console.log(dataContent)  
        }
    break;

case 'remove':
    var index = dataContent.indexOf(myArgs3)
    if(index != -1){
        dataContent.splice( dataContent.indexOf(myArgs3), 1 );
        console.log(dataContent)
        fs.writeFileSync('bin/data.json', JSON.stringify(dataContent))
    }
    if(index == -1){
        console.log("does not exist!")
    }
    break;

case 'get':
    if(myArgs2 == "" || myArgs2 == undefined){
      console.log(dataContent)
    }else{
      var getKey = myArgs2;
      console.log(dataContent.find(element => element[getKey])) 
    }
    break;

default:
    console.log("please enter your command ksv add/remove/get")
    break;
}
