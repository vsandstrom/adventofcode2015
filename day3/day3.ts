import {readFileSync} from "fs";
let data: String = readFileSync("./input.txt", 'utf8') || '';

// coordinate map to see if we have been there before


let route: Array<String> = data.split('');
let visited: Set<String> = new Set();
let northSouth = 0;
let westEast = 0;

// count the starting house
let houses = 1;

visited.add(`${0}:${0}`);

route.forEach((dir) => {
    if (dir == '^') {
        northSouth++;
    } else if (dir == '<') {
        westEast--;
    } else if (dir == '>') {
        westEast++;
    } else if (dir == 'v') {
        northSouth--;
    }

    if (!visited.has(`${northSouth}:${westEast}`)) {
        houses++;
        visited.add(`${northSouth}:${westEast}`);
    } 
})

console.log("Santa visits " + houses + " houses");
