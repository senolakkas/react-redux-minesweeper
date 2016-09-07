console.log("log reducers/game.js 1");
import {SELECT_SQUARE} from '../constants/ActionTypes'
import * as actions from '../actions/game'
console.log("log reducers/game.js 4");
const X = '*'
console.log("log reducers/game.js 6");






let INITIAL = {
  grid: [
    [{val: X, sel: false}, {val: 2, sel: false}, {val: 1, sel: false}, {val: 0, sel: false}],
    [{val: 2, sel: false}, {val: X, sel: false}, {val: 1, sel: false}, {val: 0, sel: false}],
    [{val: 1, sel: false}, {val: 1, sel: false}, {val: 1, sel: false}, {val: 0, sel: false}],
    [{val: 1, sel: false}, {val: 1, sel: false}, {val: 1, sel: false}, {val: 0, sel: false}],
    [{val: 0, sel: false}, {val: 0, sel: false}, {val: 0, sel: false}, {val: 0, sel: false}]
  ],
  sel: 0,
  won: false,
  lost: false,
  bombs: 2,
  total: 16
}
console.log("log reducers/game.js 21");
export default function game(state=INITIAL, action) {
  alert("log reducers/game.js 23");


  switch (action.type) {
    case SELECT_SQUARE:

      if(state.won || state.lost) {
        return state
      }

      let sel = 0

      let grid = Array.from(state.grid)

      function doit(action) {

        if(!grid[action.x] || !grid[action.x][action.y]) {
          return
        }

        let square = grid[action.x][action.y]

        let oldSel = square.sel

        square.sel = true

        if(!oldSel && square.val === 0) {
          [-1, 0, 1].forEach(x => {
            [-1, 0, 1].forEach(y => {
              doit({x: action.x + x, y: action.y + y})
            })
          })
        }
      }

      doit(action)

      grid.forEach(row => {
        row.forEach(col => {
          sel = sel + (col.sel ? 1 : 0)
        })
      })

      let won = sel + state.bombs === state.total

      let lost = grid[action.x][action.y].val === X

      return {
        ...state,
        sel: sel,
        won: won,
        lost: lost,
        grid: grid
      }
    default:
      return state
  }
}
console.log("log reducers/game.js 83");
