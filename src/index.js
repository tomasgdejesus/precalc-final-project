const config = {};
const math = create(all, config);

const upper_shift_matrix = math.matrix([
  [0, 1, 0],
  [0, 0, 1],
  [0, 0, 0]
]);
const lower_shift_matrix = math.matrix([
  [0, 0, 0],
  [1, 0, 0],
  [0, 1, 0]
]);
const parent_operation_matrix = math.matrix([
  [0, -1, 0],
  [-1, -1, -1],
  [0, -1, 0]
]);

var puzzle_matrix = math.matrix([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]);

const puzzle_container = document.getElementById("puzzle_container");
var puzzle_buttons = [];

function apply_operation_matrix(operation_matrix) {
  puzzle_matrix = math.abs(math.add(puzzle_matrix, operation_matrix));
}

function update_puzzle_grid() {
  puzzle_matrix.forEach(function (value, index, matrix) {
    var puzzle_buttons_idx = index[0] * 3 + index[1];
    var puzzle_button = puzzle_buttons[puzzle_buttons_idx];
    if (value === 1) puzzle_button.id = "puzzle_button_on";
    else puzzle_button.id = "puzzle_button";
  });
}

function puzzleButtonClick(button_id) {
  //console.log(button_id);
  var operation_matrix = math.clone(parent_operation_matrix);
  switch (button_id) {
    case 0:
      operation_matrix = math.multiply(upper_shift_matrix, operation_matrix);
      operation_matrix = math.multiply(operation_matrix, lower_shift_matrix);
      break;
    case 1:
      operation_matrix = math.multiply(upper_shift_matrix, operation_matrix);
      break;
    case 2:
      operation_matrix = math.multiply(upper_shift_matrix, operation_matrix);
      operation_matrix = math.multiply(operation_matrix, upper_shift_matrix);
      break;
    case 3:
      operation_matrix = math.multiply(operation_matrix, lower_shift_matrix);
      break;
    case 4:
      break;
    case 5:
      operation_matrix = math.multiply(operation_matrix, upper_shift_matrix);
      break;
    case 6:
      operation_matrix = math.multiply(lower_shift_matrix, operation_matrix);
      operation_matrix = math.multiply(operation_matrix, lower_shift_matrix);
      break;
    case 7:
      operation_matrix = math.multiply(lower_shift_matrix, operation_matrix);
      break;
    case 8:
      operation_matrix = math.multiply(lower_shift_matrix, operation_matrix);
      operation_matrix = math.multiply(operation_matrix, upper_shift_matrix);
      break;
    default:
      break;
  }
  apply_operation_matrix(operation_matrix);
  update_puzzle_grid();
}

for (var i = 0; i < 3; i++) {
  var puzzle_row = document.createElement("div");
  puzzle_row.style.display = "flex";
  for (var k = 0; k < 3; k++) {
    function new_puzzle_button(idx) {
      var puzzle_button = document.createElement("div");
      puzzle_button.id = "puzzle_button";
      puzzle_button.button_id = idx;
      puzzle_button.onclick = function () {
        puzzleButtonClick(idx);
      };
      return puzzle_button;
    }

    var puzzle_button = new_puzzle_button(k + i * 3);
    puzzle_buttons.push(puzzle_row.appendChild(puzzle_button));
  }
  puzzle_container.appendChild(puzzle_row);
}

update_puzzle_grid();
