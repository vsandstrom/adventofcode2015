import {readFileSync} from "fs";
let data: string = readFileSync("./input.txt", 'utf8') || '';

console.log("||---------------------|| DAY 6 ||---------------------||");

enum Action {
    TURN,
    TOGGLE,
}

interface Coord {
    lat: number;
    long: number;
}

enum OnOff {
    OFF = 0,
    ON = 1
}

interface Instruction {
    index: number;
    action: Action.TURN | Action.TOGGLE;
    onOff: OnOff.ON | OnOff.OFF | null;
    begin: Coord;
    end: Coord;
}

let xmas = [];

for (let i = 0; i < 1000; i++){
    xmas[i] = [];
    for (let j = 0; j < 1000; j++){
        xmas[i][j]=0;
    }
}



// zero the array - all lights are off
// for (let i = 0; i< 1000; ++i) {
//     for (let j = 0; j < 1000; ++j) {
//         xmas[i][j] = 0;
//     }
// }


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
            onOff: (temp[1] == "on") ? 1 : 0,
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

// all instructions should be here, does it matter which order?
// console.log( parsed.length == instruction.length);

const turn: Function = (inst: Instruction, array: Array<Array<number>>) => {
    let latOffset = inst.begin.lat, longOffset = inst.begin.long;

    let latLen = Math.abs(inst.end.lat - latOffset);
    let longLen = Math.abs(inst.end.long - longOffset);

    for (let i = latOffset; i < (latOffset + latLen + 1); i++) {
        for (let j = longOffset; j < (longOffset + longLen + 1); j++) {
            array[i][j] = inst.onOff;
        }
    }
    
    return array;
}

const toggle: Function = (inst: Instruction, array: Array<Array<number>>) => {
    let latOffset = inst.begin.lat, longOffset = inst.begin.long;

    let latLen = Math.abs(inst.end.lat - latOffset);
    let longLen = Math.abs(inst.end.long - longOffset);

    for (let i = latOffset; i < (latOffset + latLen + 1); i++) {
        for (let j = longOffset; j < (longOffset + longLen + 1); j++) {
            array[i][j] = (array[i][j] == 0) ? 1 : 0;
        }
    }
    return array;
}

const calc: Function = (array: Array<Array<number>>, parsed: Array<Instruction>) => {
    for (let i = 0; i < parsed.length; i++) {
        if (parsed[i].action == Action.TURN) {
            array = turn(parsed[i], array);
        } else if (parsed[i].action == Action.TOGGLE) {
            array = toggle(parsed[i], array);
        }
        else {
            continue;
        }
    }

    let count = 0;
    for (let i = 0; i < array.length; i++) {
        count += array[i].reduce((acc, curr) => {
            return  acc + curr;
        }, 0)
    }
    return count;
}


console.log("The number of lit lights are: " + calc(xmas, parsed));


// make sure each begin coord is always less than end coord
// parsed.forEach((obj) => {
//     if (obj.begin.x > obj.end.x || obj.begin.y > obj.end.y){
//         console.log( false );
//     }
// })


console.log("||-----------------------------------------------------||");
