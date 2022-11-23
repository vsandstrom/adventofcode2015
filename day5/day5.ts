
import {readFileSync} from "fs";
let data: String = readFileSync("./input.txt", 'utf8') || '';

console.log("||---------------------|| DAY 5 ||---------------------||");

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

const checkBad = (word: string) => {
    for (const b of bad) {
        if (word.includes(b)) {
            return false;
        }

    }

    return true;
}

const checkAlternating: Function = (word: string) => {
    let i = 0;
    for (let char of word.split('')){
        if (char == word[i+2]) {
            return checkDuplicatePairs(word);
        }
        i++;
        if (i > word.length - 2) {
            return false;
        }
    }
}

const checkDuplicatePairs: Function = (word: string) => {
    for (let i = 0; i < word.length -1; i++) {
        let cursor = word.substring(i, i + 2);
        let beg = word.substring(0, i);
        let end = word.substring(i+2);

        if (beg.includes(cursor) || end.includes(cursor)){
            return true;
        }
    }
    return false;
}

const rule_set1: Function = (word: string) => {
    if (checkDouble(word) && checkVowels(word) && checkBad(word)) {
        return true;
    }
    return false;
}

const rule_set2 : Function = (word: string) => {
    if (checkAlternating(word) ) {
        return true;
    }
    return false;
        // alternating repeating letters
}


// console.log(words[2]);
let nice_1 = 0;
let nice_2 = 0;

for (let word of words) {

    if ( rule_set1(word) ){
        nice_1++;
    }

    // create set of all substrings
    if ( rule_set2(word)) {
        nice_2++;
    }

}

console.log("Total words: " + words.length);

console.log("There are " + nice_1 + " from the first set of rules");
console.log("There are " + nice_2 + " from the second set of rules");

// assert(checkAlternating("qjhvhtzxzqqjkmpb") ==  true, "qjhvhtzxzqqjkmpb is nice");
// assert(rule_set2("uurcxstgmygtbstg") ==  false, "uurcxstgmygtbstg is naughty");

console.log("||-----------------------------------------------------||");
