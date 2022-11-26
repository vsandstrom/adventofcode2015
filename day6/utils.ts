export interface Coord {
    lat: number;
    long: number;
}

export enum Action {
    TURN,
    TOGGLE,
}

export interface Instruction {
    index: number;
    action: Action.TURN | Action.TOGGLE;
    onOff: OnOff.ON | OnOff.OFF | null;
    begin: Coord;
    end: Coord;
}
export enum OnOff {
    OFF = 0,
    ON = 1
}
