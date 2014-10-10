/*  Author Details
  ==============
  Author: Ranjith Pandi

  Author URL: http://ranjithpandi.com

  Attribution is must on every page, where this work is used.

  For Attribution removal request. please consider contacting us through http://ranjithpandi.com/#contact
*/

var TicTacToe = function() {

  var winners = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
  var turn = (Math.floor(Math.random() * 9) % 2 == 0)? 'x' : 'o';

  var selectSquare = function($cur) {
    if(!$cur.hasClass('selected')) {
      var newClass = 'selected';
      var curTurn = turn;
      if(turn == 'x') {
        newClass += ' x';
        turn = 'o';
      }else{
        newClass += ' o';
        turn = 'x';
      }
      $cur.addClass(newClass).text(turn);
      checkWinner();
    }
  }

  var checkWinner = function() {
    var len = winners.length;
    var $game = $('.tictactoe div');
    for(var i = 0; i < len; i++) {
      var winner = winners[i];
      var pattern = $game.eq(winner[0]).text() + $game.eq(winner[1]).text() + $game.eq(winner[2]).text();
      if(pattern == "xxx"){
        annouceWinner('x');
      }else if(pattern == "ooo"){
        annouceWinner('o');
      }
    }

    var totalCol = $game.length;
    var selCol = $('.tictactoe .selected').length;
    if(totalCol == selCol){
      annouceWinner('none');
    }
  }

  var annouceWinner = function(who) {
    var win = who;
    if(who == 'none'){
      win = 'Nobody'
    }
    $('.won').html(win +' Wins !!!');
    $('.replay').off().on('click', function(){
      TicTacToe.initGame();
      $('.result').hide();
    });
    $('.result').show();
  }

  return {
    initGame: function() {
      var columns = [];
      for(var c = 0; c < 9; c++) {
        columns.push('<div class="column" id="'+c+'"></div>');
      }
      $(".tictactoe").html(columns.join(''));

      $(".column").on('click', function() {
        selectSquare($(this));
      });
    }
  }
}();