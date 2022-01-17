 var suits = ["spades", "hearts", "clubs", "diams"];
    var cardFace = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    var cards = [];
    var players = [
      [],
      []
    ];
    var firstRun = true;
    var gameover = false;
    var timer;
    var r = 26;
    var fightButton = document.querySelector("#btnPlay");
    var fightButton26 = document.querySelector("#btnPlay26");

    var p1 = document.querySelector("#player1 .hand");
    var p2 = document.querySelector("#player2 .hand");
    var s1 = document.querySelector("#player1 .score");
    var s2 = document.querySelector("#player2 .score");

    //event listeners
    fightButton.addEventListener('click', play);
   
    //functions
    function rounds(a){
      r=a;
      timer = setInterval(function(){
        play()
      },100);
    }

    function play() {
      if(timer){
        r--;
        outputMessage("Rounds left " + r);
        if(r>26){
          window.clearInterval(timer);
        }
      }
      if (firstRun) {
        firstRun = false;
        buildCards();
        shuffleArray(cards);
        dealCards(cards);
      }
      attack();
    }

    function attack() {
      if (!gameover) {
        var card1 = players[0].shift();
        var card2 = players[1].shift();
        var pot = [card1, card2];
        p1.innerHTML = showCard(card1);
        p2.innerHTML = showCard(card2);
        checkWinner(card1,card2,pot);
        s1.innerHTML = players[0].length;
        s2.innerHTML = players[1].length;
      }else{
        outputMessage("Game over");
      }
    }

    function outputMessage(message){
      document.getElementById("message").innerHTML = message;
    }

    function checkWinner(card1,card2,pot){
      if((players[0].length <= 4)||(players[1].length <= 4)){
        gameover = true;
        return;
      }
      if(card1.cardValue > card2.cardValue){
        outputMessage("Player 1 wins");
        players[0] = players[0].concat(pot);
      }
      else if(card1.cardValue < card2.cardValue){
        outputMessage("Player 2 wins");
        players[1] = players[1].concat(pot);
      }else{
          players[0] = players[0]
          players[1] = players[1]
        outputMessage("Tie");
      }
    }

    function showCard(c, p) {
      var move = p * 40;
      var bCard = '<div class="icard '+c.suit+' " style="left:'+move+'px">';
      bCard += '<div class="cardmid suit"></div>';
      bCard += '<div class="cardbottom suit">' + c.num + '<br></div></div>';
      return bCard;
    }

    function buildCards() {
      cards = [];
      for (s in suits) {
        var suitNew = suits[s][0].toUpperCase();
        for (n in cardFace) {
          var card = {
            suit: suits[s],
            num: cardFace[n],
            cardValue: parseInt(n) + 2,
            icon: suitNew
          }
          cards.push(card);
        }
      }
    }

    function dealCards(array) {
      for (var i = 0; i < array.length; i++) {
        var m = i % 2;
        players[m].push(array[i]);
      }
    }

    function shuffleArray(array) {
      for (var x = array.length - 1; x > 0; x--) {
        var ii = Math.floor(Math.random() * (x + 1));
        var temp = array[x];
        array[x] = array[ii];
        array[ii] = temp
      }
      return array;
    }
