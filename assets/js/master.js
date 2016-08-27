$(document).ready(function() {


var AANG = {
    n: "aang",
    HP: 100,
    AP: 8,
    CAP: 20
};

var TOPH = {
    n: "toph",
    HP: 100,
    AP: 6,
    CAP: 5
};

var ZOKU = {
    n: "zoku",
    HP: 180,
    AP: 7,
    CAP: 25,
};

var KATARA = {
    n: "katara",
    HP: 150,
    AP: 7,
    CAP: 10,
};

var characters = {aang: AANG,toph: TOPH,zoku: ZOKU,katara: KATARA};
var enemies_left = 3;
var user_choice;
var character_chosen = false;
var current_enemy;
var enemy_chosen = false;
var o1;
var o2;
var o3;

$('.character-box').on('click', function(){

    if (!enemy_chosen && character_chosen) {
      if (enemies_left == 0) {
        alert("game over!")
      }
    var opp_id = $(this).attr("id");
    current_enemy = characters[opp_id];
    $(this).appendTo('.defender');
    $(this).addClass('character-black');
    enemy_chosen = true;
    }

    if (!character_chosen) {
      var ch_id = $(this).attr("id");
      user_choice = characters[ch_id];
      $(this).appendTo('.users_character');
      $(this).addClass('character-green');
      var counter = 1;
      var opp_class = ".opp";
      $(".character-box").each(function(){
	    	  if (this.id !== ch_id) {
                var opp = opp_class + counter++;
                $(this).addClass('character-red');
                $(this).appendTo(opp);

              }
        	});

      character_chosen = true;
    }


});

$('.attack-btn').on('click', function(){

var string = "You did " + user_choice.AP + " damage <br> Your opponent did " + current_enemy.CAP + " damage.";
$('.game-status').html(string);

user_choice.HP -= current_enemy.CAP;
current_enemy.HP -= user_choice.AP;
user_choice.AP = user_choice.AP + user_choice.AP;
var stat1 = ".character-stat-" + user_choice.n;
var stat2 = ".character-stat-" + current_enemy.n;
$(stat1).html("Stat: " + user_choice.HP);
$(stat2).html("Stat: " + current_enemy.HP);


});

});
