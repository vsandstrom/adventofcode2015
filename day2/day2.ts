import {readFileSync} from "fs";

let data: String = readFileSync("./input.txt", 'utf8')//  || '';
let dimensions: Array<String> = data.split(/\r?\n/);
// remove trailing line break
dimensions.pop();

let paper = 0;
let ribbon = 0;

dimensions.map((obj) => {
    let temp: Array<number> = obj.split('x').map(num => parseInt(num));

    temp.sort((a:number, b:number) => a-b);

    let smallest = temp[0] * temp[1];
    let middlest = temp[0] * temp[2];
    let largest = temp[1] * temp[2];

    paper += (smallest * 2) + smallest;
    paper += middlest * 2;
    paper += largest * 2;

    ribbon += ((temp[0] * 2) + (temp[1] * 2));
    ribbon += temp[0] * temp[1] * temp[2];

    
})

console.log("Amount of paper: " + paper);
console.log("Amount of ribbon: " + ribbon);


