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
    [{val: X, sel: false}, {val: 2, sel: false}, {val: 1, sel: false}, {val: 0, sel: false}],
    [{val: 2, sel: false}, {val: X, sel: false}, {val: 1, sel: false}, {val: 0, sel: false}],
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
  alert("game(INITIAL, action); 1");
  reducersGame.game(INITIAL1, reducersGame.action);
  alert("game(INITIAL, action); 2");


  return INITIAL
}

function Game(grid_x, grid_y, mine_count) {

  var _between = function(v,a,b) { return (v>=a) && (v<=b); };

  var createGrid = function(x, y) {
    var grid = [];

    for (var n=0; n<x; n++) {
      grid[n] = [];
      for (var m=0; m<y; m++) {
        grid[n][m] = 0;
      }
    }
    alert(grid);
    return grid;
  };

  var generateMines = function(grid, grid_x, grid_y, mine_count) {
    var mine_value = -(mine_count * 2), mine_x, mine_y;
    var m, n;

    for (var k=0; k<mine_count; k++) {
      while (true) {
        mine_x = Math.floor(Math.random()*grid_x);
        mine_y = Math.floor(Math.random()*grid_y);

        // TODO : add more randomness and strategies here

        if (0 <= grid[mine_x][mine_y]) {
          break;
        }
      }
      for (n=-1; n<2; n++) {
        for (m=-1; m<2; m++) {
          if (0 == n && 0 == m) {
            grid[mine_x][mine_y] = mine_value;
          } else if (_between(mine_x+n,0,grid_x-1) && _between(mine_y+m,0,grid_y-1)) {
            grid[mine_x + n][mine_y + m]++;
          }
        }
      }
    }

    return grid;
  };


  var _isMine = function(el) {
    return (0 > parseInt(el.text()));
  };
  var _isEmpty = function(el) {
    return (0 == parseInt(el.text()));
  };

  var doWinning = function() {
    _finishGame();

    // show mines!
    gridElement.find('.mine').addClass('found');

    alert("Hurray!!! You have found all the mines!");
  };

  var doGameOver = function() {
    _finishGame();

    alert("BOOM!! Game over!");
  };

  var _finishGame = function() {
    gridElement.find('.hidden').removeClass('hidden')
        .end()
        .find('div').unbind('click');
  };

  var _isWinning = function() {
    // count how many unmined hidden cell there is...
    return (0 == gridElement.find('.hidden:not(.mine)').size());
  };

  var _show_neighbour_count = 0;
  var doOpenNeighbours = function(el, callback) {
    if (!_isEmpty(el)) return;

    var pos = el.data("grid_position");
    var n = pos[0], m = pos[1];

    var _d = function(e) {
      _show_neighbour_count++;
      return function() {
        doOpenNeighbours(e, callback);
        if (--_show_neighbour_count == 0) callback();
      };
    };

    for (var x=-1; x<2; x++) {
      for (var y=-1; y<2; y++) {
        if (_between(x+n,0,grid_x-1) && _between(y+m,0,grid_y-1)
            && grid[x+n][y+m].hasClass('hidden')
            && !_isMine(grid[x+n][y+m])
        ) {
          setTimeout(_d(grid[x+n][y+m].removeClass('hidden')), 50);
        }
      }
    }
  };



  var grid = generateMines(createGrid(grid_x, grid_y),
      grid_x, grid_y, mine_count);


  // create UI
  var gridElement = $('#grid').empty();
  var row, cell;
  for (var m=0; m<grid_y; m++) {
    row = $('<div></div>').css('clear', 'both');
    for (var n=0; n<grid_x; n++) {
      cell = $('<div></div>').addClass('cell').text(grid[n][m])
          .data("grid_position", [n,m]);
      if (0 > grid[n][m]) {
        cell.addClass('mine');
      } else if (0 == grid[n][m]) {
        cell.addClass('empty');
      }
      row.append(cell);
      // replace grid[n][m] with cell element!
      grid[n][m] = cell;
    }
    gridElement.append(row);
  }

  // apply events
  gridElement.find('.cell').addClass('hidden').click(function() {
    var that = $(this);

    var _f = function() {
      that.removeClass('hidden');
      if (_isWinning()) doWinning();
    };

    if (_isMine(that)) {
      doGameOver();
    } else {
      if (_isEmpty(that)) {
        doOpenNeighbours(that, _f);
      } else {
        _f();
      }
    }
  });

  // public functions
  this.isActive = function() { return !_isWinning(); };

  return this;
};



