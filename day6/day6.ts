import {readFileSync} from "fs";
import {calc as lightsCalc} from "./lights";
import {calc as brightCalc} from "./brightness";

import {Instruction, Action, OnOff} from "./utils";
let data: string = readFileSync("./input.txt", 'utf8') || '';

console.log("||---------------------|| DAY 6 ||---------------------||");

let xmasLights = [];
let xmasBrightness = [];

for (let i = 0; i < 1000; i++){
    xmasLights[i] = [];
    xmasBrightness[i] = [];
    for (let j = 0; j < 1000; j++){
        xmasLights[i][j]=0;
        xmasBrightness[i][j]=0;
    }
}

const parseCoord: Function = (word: string) => {
    let temp = word.split(',');
    return {lat: parseInt(temp[0]), long: parseInt(temp[1])};

} 


let instruction: Array<string> = data.split(/\r?\n/);
instruction.pop();

let parsed: Array<Instruction> = instruction.map((line: string, i: number) => {
    let temp: Array<string> = line.split(' ');

    if (temp.length == 5) {
        let inst: Instruction = {
            index: i,
            action: Action.TURN,
            onOff: (temp[1] == "on") ? OnOff.ON : OnOff.OFF,
            begin: parseCoord(temp[2]),
            end: parseCoord(temp[4])
        };
        return inst;
    } else {
        let inst: Instruction = {
            index: i,
            action: Action.TOGGLE,
            onOff: null,
            begin: parseCoord(temp[1]),
            end: parseCoord(temp[3]) 
        };
        return inst;
    }
});

console.log("The number of lit lights are: " + lightsCalc(xmasLights, parsed));
console.log("The total brightness of lit lights are: " + brightCalc(xmasBrightness, parsed));

console.log("||-----------------------------------------------------||");
