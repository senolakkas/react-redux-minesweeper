console.log("log actions/game.js");
import * as types from '../constants/ActionTypes'
import reducersGame from '../reducers/game'

export function selectSquare(x, y) {
  console.log("log actions/game.js selectSquare(x,y) 5 =>");
  return { type: types.SELECT_SQUARE, x, y }
}

export function startNewGame(grid_x, grid_y, mine_count) {
  alert(grid_x );
  alert(grid_y);
  alert(mine_count);

  const X = '*'

  var gridd=[
    [{val: 2, sel: false}, {val: X, sel: false}, {val: 1, sel: false}, {val: 0, sel: false}],
    [{val: X, sel: false}, {val: 2, sel: false}, {val: 1, sel: false}, {val: 0, sel: false}],
    [{val: 1, sel: false}, {val: 1, sel: false}, {val: 1, sel: false}, {val: 0, sel: false}],
    [{val: 1, sel: false}, {val: 1, sel: false}, {val: 1, sel: false}, {val: 0, sel: false}],
    [{val: 0, sel: false}, {val: 0, sel: false}, {val: 0, sel: false}, {val: 0, sel: false}]
  ]
  const INITIAL1 = {
    grid: gridd,
    sel: 0,
    won: false,
    lost: false,
    bombs: 2,
    total: 16
  }
  alert("INITIAL=INITIAL1;");
  INITIAL=INITIAL1; /// ??

  alert("game(INITIAL, action); 1");
  reducersGame.game(INITIAL1, reducersGame.action); // ????
  alert("game(INITIAL, action); 2");


  return {
    game: INITIAL1
  }
}



