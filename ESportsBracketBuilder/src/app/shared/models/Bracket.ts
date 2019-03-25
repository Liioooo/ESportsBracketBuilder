import {Game} from '@shared/models/Game';

export interface Bracket {
    id: number;
    name: string;
    games: Game[];
}
