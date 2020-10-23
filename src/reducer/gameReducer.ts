import { Action } from "redux";
import { SET_MARKER } from "../actions/boardActions";
import { Board, CellInfo, Marker, Player } from "../types";
import { clone } from "ramda";
import {
    getMarkerFor, getNextPlayer,
    hasThreeDiagonal,
    hasThreeInColumn,
    hasThreeInRow,
    isGameFinished,
    isUnmarked
} from '../utils/gameUtils';

export const INITIAL_STATE: GameState = {
    gameFinished: false,
    currentPlayer: Player.heart,
    boardData: [
        [
            {filledWith: Marker.unmarked, row: 0, column: 0},
            {filledWith: Marker.unmarked, row: 0, column: 1},
            {filledWith: Marker.unmarked, row: 0, column: 2},
        ],
        [
            {filledWith: Marker.unmarked, row: 1, column: 0},
            {filledWith: Marker.unmarked, row: 1, column: 1},
            {filledWith: Marker.unmarked, row: 1, column: 2},
        ],
        [
            {filledWith: Marker.unmarked, row: 2, column: 0},
            {filledWith: Marker.unmarked, row: 2, column: 1},
            {filledWith: Marker.unmarked, row: 2, column: 2},
        ],
    ],
};

export interface GameState {
    currentPlayer: Player;
    boardData: Board;
    gameFinished: boolean;
}

export interface CellClickedAction extends Action {
    row: number;
    cell: number;
}

const updateGame = (
    currentState: GameState,
    clickedCell: CellClickedAction
): GameState => {
    if(currentState.gameFinished){
        return currentState;
    }
    const cell = currentState.boardData[clickedCell.row][clickedCell.cell];
    if (isUnmarked(cell)) {
        currentState.boardData[clickedCell.row][clickedCell.cell].filledWith = getMarkerFor(currentState.currentPlayer);
    }
    currentState.gameFinished = isGameFinished(currentState.boardData, currentState.currentPlayer);
    currentState.currentPlayer = getNextPlayer(currentState.currentPlayer);
    return currentState;
};

const gameReducer = (state = INITIAL_STATE, action: CellClickedAction) => {
    switch (action.type) {
        case SET_MARKER:
            const currentState = clone(state);
            return {
                ...updateGame(currentState, action),
            };
        default:
            return state;
    }
};

export default gameReducer;
