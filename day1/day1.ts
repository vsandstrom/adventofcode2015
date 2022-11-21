import {readFileSync} from "fs";
let data: String = readFileSync("./input.txt", 'utf8') || '';

let arr: Array<String> = data.split('');

let floor = 0;
let found: boolean = false;

arr.forEach((obj: String, i: number) => {
    if (obj == '(') {
        floor++;
    } else {
        floor--;
    }
    if (floor === -1 && !found) {
        // instructions start at 1, not at 0. 
        console.log("Entering basement: " + (i+1));
        found = true;
    }
})

console.log("Ends up on floor " + floor + " at the end");

