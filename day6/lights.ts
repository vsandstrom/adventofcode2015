import {Instruction, Action} from "./utils";

const toggle: Function = (inst: Instruction, array: Array<Array<number>>) => {
        let latOffset = inst.begin.lat, longOffset = inst.begin.long;

        let latLen = inst.end.lat - latOffset;
        let longLen = inst.end.long - longOffset;

        for (let i = latOffset; i < (latOffset + latLen + 1); i++) {
            for (let j = longOffset; j < (longOffset + longLen + 1); j++) {
                array[i][j] = (array[i][j] == 0) ? 1 : 0;
            }
        }
        return array;
    }

const turn: Function = (inst: Instruction, array: Array<Array<number>>) => {
        let latOffset = inst.begin.lat, longOffset = inst.begin.long;

        let latLen = inst.end.lat - latOffset;
        let longLen = inst.end.long - longOffset;

        for (let i = latOffset; i < (latOffset + latLen + 1); i++) {
            for (let j = longOffset; j < (longOffset + longLen + 1); j++) {
                array[i][j] = inst.onOff;
            }
        }
        
        return array;
    }


export const calc: Function = (array: Array<Array<number>>, parsed: Array<Instruction>) => {
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

