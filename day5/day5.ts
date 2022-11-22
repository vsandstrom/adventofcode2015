import {readFileSync} from "fs";
let data: String = readFileSync("./input.txt", 'utf8') || '';
let words: Array<String> = data.split(/\r?\n/);

let bad = ["ab", "cd", "pq", "xy"];
let vowels = new Set(['a', 'o', 'i', 'u', 'e']);

// 

const checkVowels: Function = (word: string) => {
    const chars = word.split('');
    let count = 0;

    chars.map(char => {
        if (vowels.has(char)) {
            count++;
        }
    });

    return (count >=3) ? true : false;
}

const checkDouble: Function = (word: string) => {
    for (let i = 0; i < word.length - 1; i++){
        let sub = word.substring(i);
        
        if (sub[0] == sub[1]){
            return true;
        }

    }
    return false;
}

const checkBad = (word: String) => {
    for (const b of bad) {
        if (word.includes(b)) {
            return false;
        }

    }

    return true;
}


// console.log(words[2]);
let nice = 0;
let naughty = 0;

for (let word of words) {

    if ( checkDouble(word) && checkVowels(word) && checkBad(word)){
        nice++;
    }
    // } else {
    //     naughty++;
    // }

}

console.log(nice)

