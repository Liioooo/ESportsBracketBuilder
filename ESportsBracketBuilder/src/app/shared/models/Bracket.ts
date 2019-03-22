export interface Bracket {
    id: number;
    name: string;
    games: {
        id: number;
        positionInRound: number;
        roundInBracket: number;
        player1Points: number | null;
        player2Points: number | null;
        player1: {
          id: number;
          name: string;
        };
        player2: {
            id: number;
            name: string;
        };
    }[];
}
