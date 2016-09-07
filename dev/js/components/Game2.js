console.log("log companet/game.js 1");
import React, { Component, PropTypes } from 'react'
import * as GameActions from '../actions/game'

console.log("log companet/game.js 3");

var UncontrolledInput = React.createClass({
    startNewGame: function() {
        alert("demo");
        //let grid_x = Number.parseInt(React.findDOMNode(this.refs.grid_x).value);
        let grid_x = Number.parseInt(this.refs.grid_x.value);
        let grid_y = Number.parseInt(this.refs.grid_y.value);
        let mine_count = Number.parseInt(this.refs.mine_count.value);
        alert(grid_x);
        alert(grid_y);
        alert(mine_count);

        var game2=GameActions.startNewGame(grid_x, grid_y, mine_count);
        alert("game2 startNewGame");
        alert(game2);
    },
    render: function() {
        return (
            <div>
                <label htmlFor="txtGrid_x">Grid width     :</label>
                <input ref="grid_x" defaultValue="12" /><br/>
                <label htmlFor="txtGrid_y">Grid height    :</label>
                <input ref="grid_y" defaultValue="12" /><br/>
                <label htmlFor="txtMines">Number of mines :</label>
                <input ref="mine_count" defaultValue="10" /><br/>
                <button onClick={this.startNewGame}>New Game</button><br/>
            </div>
        );
    }
});


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
                                            <td>
                                              <span key={y}>
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
                    lost: {game.lost ? 'Game over' : 'false'}
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
