var height = 6; //number of guesses
var width = 5; //length of the word

var row = 0; //current guess (attempt #)
var col = 0; //current letter for that attempt

var gameOver = false;
var word = "OPTAR";

window.onload = function () {
  intialize();
};

function intialize() {
  // Create the game board
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      // <span id="0-0" class="tile">P</span>
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
    }
  }

  // Create the keyboard
  for (let c = 0; c < 26; c++) {
    let key = document.createElement("span");
    key.classList.add("key");
    key.innerText = String.fromCharCode(65 + c);
    key.addEventListener("click", (e) => {
      if (gameOver) return;

      if (col < width) {
        let currTile = document.getElementById(
          row.toString() + "-" + col.toString()
        );
        if (currTile.innerText == "") {
          currTile.innerText = key.innerText;
          col += 1;
        }
      }
    });
    document.getElementById("keyboard").appendChild(key);
  }

  // Create the enter key
  let enter = document.createElement("span");
  enter.classList.add("key");
  enter.innerText = "Enter";
  enter.addEventListener("click", (e) => {
    if (gameOver) return;
    update();
    row += 1; //start new row
    col = 0; //start at 0 for new row
  });
  document.getElementById("keyboard").appendChild(enter);

  // Create the delete key
  let del = document.createElement("span");
  del.classList.add("key");
  del.innerText = "Del";
  del.addEventListener("click", (e) => {
    if (gameOver) return;
    if (0 < col && col <= width) {
      col -= 1;
    }
    let currTile = document.getElementById(
      row.toString() + "-" + col.toString()
    );
    currTile.innerText = "";
  });
  document.getElementById("keyboard").appendChild(del);

  // Listen for Key Press
  document.addEventListener("keyup", (e) => {
    if (gameOver) return;

    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (col < width) {
        let currTile = document.getElementById(
          row.toString() + "-" + col.toString()
        );
        if (currTile.innerText == "") {
          currTile.innerText = e.code[3];
          col += 1;
        }
      }
    } else if (e.code == "Backspace") {
      if (0 < col && col <= width) {
        col -= 1;
      }
      let currTile = document.getElementById(
        row.toString() + "-" + col.toString()
      );
      currTile.innerText = "";
    } else if (e.code == "Enter") {
      update();
      row += 1; //start new row
      col = 0; //start at 0 for new row
    }
  });
}

function update() {
  let correct = 0;
  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + "-" + c.toString());
    let letter = currTile.innerText;
    //Is it in the correct position?
    if (word[c] == letter) {
      currTile.classList.add("correct");
      correct += 1;
    } // Is it in the word?
    else if (word.includes(letter)) {
      currTile.classList.add("present");
    } // Not in the word
    else {
      currTile.classList.add("absent");
    }

    if (correct == width) {
      gameOver = true;
    }
  }

  // Update the keyboard
  let letters = document.querySelectorAll(".key");
  letters.forEach((letter) => {
    letter.classList.remove("used");

    // Disable used letters
    let usedTiles = document.querySelectorAll(".correct, .present");
    usedTiles.forEach((tile) => {
      if (tile.innerText == letter.innerText) {
        letter.classList.add("used");
      }
    });
  });
}
