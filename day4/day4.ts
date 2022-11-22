import {MD5} from 'crypto-js';

let key: string = "yzbqklnj";

let hash = MD5(key).toString();
let i = 1;
let ans = '';
let query: string = key + i;
let found1 = false;
let found2 = false;

while (!found1 || !found2) {
    i++;
    if (hash.substring(0, 5) == '00000' && !found1) {
        ans = query;
        console.log("Secret key: "+ key + " + int: " + i + " results in the hashed value: " + hash);
        console.log("Smallest integer trailing secret key is: " + ans.substring(key.length) + " when hash produces '00000'");
        found1 = true;
    }
    if (hash.substring(0, 6) == '000000' && !found2) {
        ans = query;
        console.log("Secret key: "+ key + " + int: " + i + " results in the hashed value: " + hash);
        console.log("Smallest integer trailing secret key is: " + ans.substring(key.length) + " when hash produces '000000'");
        found2 = true;
    }

    query = key + i;
    hash = MD5(query).toString();
}



