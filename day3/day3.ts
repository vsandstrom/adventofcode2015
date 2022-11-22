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

    let santa = `${northSouth}:${westEast}`;

    if (!visited.has(santa)) {
        houses++;
        visited.add(santa);
    } 
})

console.log("Santa visits "+ houses + " on his own");

let roboNS = 0;
let roboWE = 0;
northSouth = 0;
westEast = 0;
let roboHouses = 1;
let roboVisited: Set<String> = new Set();
roboVisited.add(`${0}:${0}`);

route.forEach((dir, i) =>{
    if (dir == '^') {
        (i%2 == 0) ? northSouth++ : roboNS++;
    } else if (dir == '<') {
        (i%2 == 0) ? westEast-- : roboWE--;
    } else if (dir == '>') {
        (i%2 == 0) ? westEast++ : roboWE++;
    } else if (dir == 'v') {
        (i%2 == 0) ? northSouth-- : roboNS--;
    }
    
    let query = (i%2==0) ? `${northSouth}:${westEast}` :`${roboNS}:${roboWE}`;

    if (!roboVisited.has(query)) {
        roboHouses++;
        roboVisited.add(query);
    } 

})

console.log("Santa visits "+ roboHouses + " with help from robo");
