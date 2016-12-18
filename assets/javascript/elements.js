$(document).ready(function() {

  var characters = {
    'Aang': {
      name: 'Aang',
      health: 120,
      attack: 8,
      imageUrl: "assets/img/air.png",
      enemyAttackBack: 15
    },
    'Toph': {
      name: 'Toph',
      health: 100,
      attack: 14,
      imageUrl: "assets/img/earth.jpg",
      enemyAttackBack: 5
    },
    'Katara': {
      name: 'Katara',
      health: 150,
      attack: 8,
      imageUrl: "assets/img/water.jpg",
      enemyAttackBack: 20
    },
    'Zuko': {
      name: 'Zuko',
      health: 180,
      attack: 7,
      imageUrl: "assets/img/fire.png",
      enemyAttackBack: 25
    }
  };
  var currSelectedCharacter;
  var currDefender;
  var combatants = [];
  var indexOfSelChar;
  var attackResult;
  var turnCounter = 1;
  var killCount = 0;


  var renderOne = function(character, renderArea, makeChar) {
    var charDiv = $("<div class='character' data-name='" + character.name + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    var charHealth = $("<div class='character-health'>").text(character.health);
    charDiv.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(charDiv);
    if (makeChar == 'enemy') {
      $(charDiv).addClass("enemy");
    } else if (makeChar == 'defender') {
      currDefender = character;
      $(charDiv).addClass("target-enemy");
    }
  };

  var renderMessage = function(message) {
    var gameMesageSet = $("#gameMessage");
    var newMessage = $("<div>").text(message);
    gameMesageSet.append(newMessage);

    if (message == 'clearMessage') {
      gameMesageSet.text('');
    }
  };

  var renderCharacters = function(charObj, areaRender) {
    if (areaRender == '#characters-section') {
      $(areaRender).empty();
      for (var key in charObj) {
        if (charObj.hasOwnProperty(key)) {
          renderOne(charObj[key], areaRender, '');
        }
      }
    }
    if (areaRender == '#selected-character') {
      renderOne(charObj, areaRender, '');
    }

    if (areaRender == '#available-to-attack-section') {
      for (var i = 0; i < charObj.length; i++) {
        renderOne(charObj[i], areaRender, 'enemy');
      }

      $(document).on('click', '.enemy', function() {

        name = ($(this).data('name'));

        if ($('#defender').children().length === 0) {
          renderCharacters(name, '#defender');
          $(this).hide();
          renderMessage("clearMessage");
        }
      });
    }

    if (areaRender == '#defender') {
      $(areaRender).empty();
      for (var i = 0; i < combatants.length; i++) {

        if (combatants[i].name == charObj) {
          renderOne(combatants[i], areaRender, 'defender');
        }
      }
    }

    if (areaRender == 'playerDamage') {
      $('#defender').empty();
      renderOne(charObj, '#defender', 'defender');
    }
    if (areaRender == 'enemyDamage') {
      $('#selected-character').empty();
      renderOne(charObj, '#selected-character', '');
    }
    if (areaRender == 'enemyDefeated') {
      $('#defender').empty();
      var gameStateMessage = "You have defated " + charObj.name + ", you can choose to fight another enemy.";
      renderMessage(gameStateMessage);
    }
  };
  renderCharacters(characters, '#characters-section');
  $(document).on('click', '.character', function() {
    name = $(this).data('name');
    if (!currSelectedCharacter) {
      currSelectedCharacter = characters[name];
      for (var key in characters) {
        if (key != name) {
          combatants.push(characters[key]);
        }
      }
      $("#characters-section").hide();
      renderCharacters(currSelectedCharacter, '#selected-character');
      renderCharacters(combatants, '#available-to-attack-section');
    }
  });

  $("#attack-button").on("click", function() {
    if ($('#defender').children().length !== 0) {
      var attackMessage = "You attacked " + currDefender.name + " for " + (currSelectedCharacter.attack * turnCounter) + " damage.";
      renderMessage("clearMessage");
      currDefender.health = currDefender.health - (currSelectedCharacter.attack * turnCounter);


      if (currDefender.health > 0) {

        renderCharacters(currDefender, 'playerDamage');
        var counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.enemyAttackBack + " damage.";
        renderMessage(attackMessage);
        renderMessage(counterAttackMessage);

        currSelectedCharacter.health = currSelectedCharacter.health - currDefender.enemyAttackBack;
        renderCharacters(currSelectedCharacter, 'enemyDamage');
        if (currSelectedCharacter.health <= 0) {
          renderMessage("clearMessage");
          restartGame("You been defeated...GAME OVER!!!");
          $("#attack-button").unbind("click");
        }
      } else {
        renderCharacters(currDefender, 'enemyDefeated');
        killCount++;
        if (killCount >= 3) {
          renderMessage("clearMessage");
          restartGame("You Won!!!! GAME OVER!!!");
        }
      }
      turnCounter++;
    } else {
      renderMessage("clearMessage");
      renderMessage("No enemy here.");
    }
  });

  var restartGame = function(inputEndGame) {
    var restart = $('<button>Restart</button>').click(function() {
      location.reload();
    });
    var gameState = $("<div>").text(inputEndGame);
    $("body").append(gameState);
    $("body").append(restart);
  };

});
