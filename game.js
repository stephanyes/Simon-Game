var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//Esto es la forma de ver si el juego empezo o no asi solo llamamos a nextSequence cuando tocamos una tecla
var gameStarted = false;

//La variable que nos va a indicar en que nivel estamos.
var level = 0;

//Este fue mi intento de hacer lo que esta mas abajo..Claramente falle.

// $(".btn").click(function () {
//   var userChosenColour = document.getElementById('green', 'red', 'yellow', 'blue');
//   console.log("you clicked " + userChosenColour);
// });

$(document).keydown(function () {
     if (!gameStarted){
       $("#level-title").text("Level " + level);
       nextSequence();
       gameStarted=true;
     }
});


$(".btn").click(function () {
    //Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.

    //En este caso el THIS se refiere al elemento que recibe el evento btn en este caso y le pedimos con attr que traiga el id.
    var userChosenColour = $(this).attr("id");

    // Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern

    userClickedPattern.push(userChosenColour);

    // console.log(userClickedPattern);
    // // return userClickedPattern;

    playSound(userChosenColour);
    animatePress(userChosenColour);


    //El -1 es porque la cuenta de un array comienza en 0 entonces si el usuario elige red green red yellow [lo normal es contar 1 2 3 4] pero en realidad el index en este ejemplo seria 3 [como deberiamos contar 0 1 2 3]
    checkAnswer(userClickedPattern.length-1);



});


function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over Looser, Press F5 to restart");
      //Aca le agregamos un timeout para que la clase sea removida despues de 200 milisegundos.
      setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);


      startOver();
      }

}

function startOver () {
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence() {

  userClickedPattern = [];
  //Esto va a hacer que el level cambie cada vez que invocamos a nextSequence
  level++;

  //Esto va a cambiar el h1 al nivel que corresponde
  $("#level-title").text("Level " + level);


  // Aca genera un numero random de 0 a 3
  var randomNumber =  Math.floor(Math.random() * 4);
  //Aca la variable nueva va a ser igual a buttonColours y el corchete es el numero aleatorio del 0 - 3 y eso va a hacer que selecciones el color.

  var randomColourPick = buttonColours[randomNumber];
  //Aca abajo pusheamos el color que se elije en rCP a la variable vacia.
  gamePattern.push(randomColourPick);

  $("#"+ randomColourPick).fadeIn(100).fadeOut(100).fadeIn(100);

// //ESTO HICE YO QUE ESTA MAL
//   var redAudio = new Audio('sounds/red.mp3');
//   var blueAudio = new Audio('sounds/blue.mp3');
//   var greenAudio = new Audio('sounds/green.mp3');
//   var yellowAudio = new Audio('sounds/yellow.mp3');
//   audio.play(randomColourPick + ".mp3");

//ESTO ESTA BIEN Y AHORA ENTIENDO PORQUE, estaba generando mal la variable AUDIO
playSound(randomColourPick);


}

function playSound(name){
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

//Aca ponemos el parametro current color, ya que lo vamos  a ayudar con la funcion de arriba que es donde hacemos click
  $("#" + currentColor).addClass("pressed");
  //Aca le agregamos un timeout para que la clase sea removida despues de 100 milisegundos.
  setTimeout(function () {
     $("#" + currentColor).removeClass("pressed");
      }, 100);

  }



//Start the game.




// function animatePress (currentColour) {
//   $('.btn').click(function(){
//   $('.btn').addClass("pressed");
// });
// }
//
// function animatePress (currentColour) {
//   $('.btn').ready(function(){
//   $('.btn').click(function(){
//     $('.btn').addClass("pressed");
//   });
// });
// }

// setTimeOut (function animatePress(currentColour) {
//   $(".btn").click(function() {
//
//   });
// },100);





// //Ejecutamos la funcion y abajo imprimimmos el resultado.
// nextSequence();

//Va a imprimir gamePattern y gracias a lo que pusimos en nextSequence pusheamos el valor aleatorio.
// console.log(gamePattern);
