// src/types.d.ts or any appropriate file
export interface PlayerDataRow {
    date: string;
    matchNo: number;
    player: string;
    surface:string;
}

export interface PlayerData {
    playerDataRows:PlayerDataRow[];
}