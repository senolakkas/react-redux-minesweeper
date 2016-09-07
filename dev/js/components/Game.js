console.log("log companet/game.js 1");
import React, { Component, PropTypes } from 'react'
console.log("log companet/game.js 3");




class Game extends Component {
  constructor(props, context) {
    console.log("log companet/game.js constructor props", props);
    console.log("log companet/game.js constructor context", context);
    super(props, context)
    console.log("log companet/game.js constructor 9");
    this.state = {}
  }

  render() {
    console.log("log companet/game.js 13");
    const { game, actions } = this.props
    console.log("log companet/game.js render game",game);
    console.log("log companet/game.js render actions",actions);
    const { } = this.state
    console.log("log companet/game.js render 19 this.state",this.state);
    return (
      <section className="main">
        <div>
          bombs: {game.bombs},
          selected: {game.sel}
          <table>
            <tbody>
              {game.grid.map((row, x) =>
                <tr key={x}>
                  {row.map((col, y) =>
                    <td key={y}>
                      <span>
                        <button onClick={() => actions.selectSquare(x, y)}>
                          {col.sel ? col.val : '\u00a0\u00a0'}
                        </button>
                      </span>
                    </td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
          won: {game.won ? 'true' : 'false'},
          lost: {game.lost ? alert("BOOM! GAME OVER!") : 'false'}
        </div>
      </section>
    )
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default Game
