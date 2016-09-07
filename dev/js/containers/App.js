import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Game from '../components/Game'
import Game2 from '../components/Game2'
import * as GameActions from '../actions/game'

console.log("log containers/app.js 7");



var UncontrolledInput = React.createClass({
    startNewGame: function() {
        alert("demo");
        //let grid_x = Number.parseInt(React.findDOMNode(this.refs.grid_x).value);
        let grid_x = Number.parseInt(this.refs.grid_x.value);
        let grid_y = Number.parseInt(this.refs.grid_y.value);
        let mine_count = Number.parseInt(this.refs.mine_count.value);

        alert("game2 startNewGame 21");
        GameActions.startNewGame(grid_x, grid_y, mine_count);
        alert("game2 startNewGame 23");
        //alert(game2);
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

class App extends Component {
  render() {
    const { game, actions } = this.props



    console.log("log containers/app.js render() game :",game);
    console.log("log containers/app.js render() actions :",actions);
    return (
      <div>
        <h1>React Redux Minesweeper</h1>

        <Game game={game} actions={actions} />
          <UncontrolledInput />

        <Game2 game={game} actions={actions} />
          <Game2 game={{
              grid: [
                  [{val: "*", sel: false}, {val: 2, sel: false}, {val: 1, sel: false}, {val: 0, sel: false}],
                  [{val: 2, sel: false}, {val: "*", sel: false}, {val: 1, sel: false}, {val: 0, sel: false}],
                  [{val: 1, sel: false}, {val: 1, sel: false}, {val: 1, sel: false}, {val: 0, sel: false}],
                  [{val: 1, sel: false}, {val: 1, sel: false}, {val: 1, sel: false}, {val: 0, sel: false}],
                  [{val: 0, sel: false}, {val: 0, sel: false}, {val: 0, sel: false}, {val: 0, sel: false}]
              ],
              sel: 0,
              won: false,
              lost: false,
              bombs: 2,
              total: 16
          }} actions={actions} />



      </div>
    )
  }
}
console.log("log containers/app.js 23");
App.propTypes = {
  game: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}
console.log("log containers/app.js 28");
function mapStateToProps(state) {
  console.log("log containers/app.js mapStateToProps(state) state:",state);
  return {
    game: state.game
  }
}
console.log("log containers/app.js 35");
function mapDispatchToProps(dispatch) {
  console.log("log containers/app.js mapDispatchToProps(dispatch) dispatch: ",dispatch);
  return {
    actions: bindActionCreators(GameActions, dispatch)
  }
}
console.log("log containers/app.js 42");
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
console.log("log containers/app.js 47");
