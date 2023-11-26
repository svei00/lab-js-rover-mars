// *****************************
// Iteration No. 1 - The rover object.
// *****************************

// Rover object goes here:
/*
Create an object to represent the rover. This object will have properties for direction, x, y, and travelLog.
*/
let rover1 = {
  id: 1,
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [],
};

let rover2 = {
  id: 2,
  direction: "E",
  x: 5,
  y: 5,
  travelLog: [],
};

// Obstacles array
let obstacles = [
  { x: 2, y: 2 },
  { x: 3, y: 4 },
  { x: 7, y: 8 },
];

// *****************************
// Iteration No. 2 - Turning the rover.
// *****************************

function turnLeft(rover) {
  console.log("turnLeft was called!");
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "N";
      break;
  }
  updateRoverInfo(rover);
  drawGridAndRover(rover);
}

function turnRight(rover) {
  console.log("turnRight was called!");
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
      break;
  }
  updateRoverInfo(rover);
  drawGridAndRover(rover);
}

// *****************************
// Bonus No. 1 - Enforce boundaries and obstacles.
// *****************************

function goForward(rover) {
  console.log(`goForward was called for Rover ${rover.id}`);

  // Save current coordinates to travelLog before updating them
  rover.travelLog.push({ x: rover.x, y: rover.y });

  // Update rover's coordinates based on its direction
  let newX = rover.x;
  let newY = rover.y;

  switch (rover.direction) {
    case "N":
      newY--;
      break;
    case "E":
      newX++;
      break;
    case "S":
      newY++;
      break;
    case "W":
      newX--;
      break;
  }

  // Check if the new coordinates are within the grid boundaries
  if (isValidMove(newX, newY, obstacles)) {
    rover.x = newX;
    rover.y = newY;
    printTravelLog(rover); // Update travel log after each move
  } else {
    console.log(
      `Cannot move Rover ${rover.id} outside the grid boundaries or into an obstacle.`
    );
  }

  updateRoverInfo(rover);
  drawGridAndRover(rover);
}

// Bonus No. 2 - Move Backwards
function moveBackward(rover) {
  console.log(`moveBackward was called for Rover ${rover.id}`);

  // Save current coordinates to travelLog before updating them
  rover.travelLog.push({ x: rover.x, y: rover.y });

  // Update rover's coordinates based on its direction
  let newX = rover.x;
  let newY = rover.y;

  switch (rover.direction) {
    case "N":
      newY++; // Adjust for moving backward
      break;
    case "E":
      newX--; // Adjust for moving backward
      break;
    case "S":
      newY--; // Adjust for moving backward
      break;
    case "W":
      newX++; // Adjust for moving backward
      break;
  }

  // Check if the new coordinates are within the grid boundaries
  if (isValidMove(newX, newY, obstacles)) {
    rover.x = newX;
    rover.y = newY;
    printTravelLog(rover); // Update travel log after each move
  } else {
    console.log("Cannot move outside the grid boundaries.");
  }

  updateRoverInfo(rover);
  drawGridAndRover(rover);
}

function updateRoverInfo(rover) {
  console.log(
    `Rover ${rover.id} Direction:`,
    rover.direction,
    `Rover ${rover.id} Coordinates: x=`,
    rover.x,
    "y=",
    rover.y
  );
}

function isValidMove(newX, newY, obstacles) {
  // Check if the new coordinates are within the grid boundaries (10x10) and not on an obstacle
  return (
    newX >= 0 &&
    newX < 10 &&
    newY >= 0 &&
    newY < 10 &&
    !obstacles.some((obstacle) => obstacle.x === newX && obstacle.y === newY)
  );
}

// *****************************
// Bonus No. 3 - Validate inputs.
// *****************************

function isValidCommand(command) {
  // Check if the command is a valid rover command (f, b, r, l)
  return ["f", "b", "r", "l"].includes(command);
}

// *****************************
// Bonus No. 4 - Obstacles and Other Rovers
// *****************************

function executeCommands(rover, commandString, otherRover) {
  for (let i = 0; i < commandString.length; i++) {
    const command = commandString[i];
    if (isValidCommand(command)) {
      switch (command) {
        case "f":
          goForward(rover);
          checkCollision(rover, otherRover);
          break;
        case "b":
          moveBackward(rover);
          checkCollision(rover, otherRover);
          break;
        case "r":
          turnRight(rover);
          break;
        case "l":
          turnLeft(rover);
          break;
      }
    } else {
      console.log(`Invalid command ${command} for Rover ${rover.id}`);
    }
  }
}

function checkCollision(rover, otherRover) {
  // Check if the current rover's position overlaps with the other rover
  if (
    rover.id !== otherRover.id &&
    rover.x === otherRover.x &&
    rover.y === otherRover.y
  ) {
    console.log(
      `Rover ${rover.id} is about to collide with Rover ${otherRover.id}. Stopping both rovers.`
    );
    // Additional action or message can be added here
  }
}

// *****************************
// Iteration No. 5 - Travel Log.
// *****************************

function printTravelLog(rover) {
  const travelLogElement = document.getElementById("travel-log");

  // Create the travel-log element if it doesn't exist
  if (!travelLogElement) {
    const newTravelLogElement = document.createElement("div");
    newTravelLogElement.id = "travel-log";
    document.body.appendChild(newTravelLogElement);
  }

  // Get the travel-log element again
  const updatedTravelLogElement = document.getElementById("travel-log");

  updatedTravelLogElement.textContent =
    `Travel Log for Rover ${rover.id}: ` + JSON.stringify(rover.travelLog);
}

// *****************************
// Canvas
// *****************************

function drawGridAndRover(rover) {
  const canvas = document.getElementById("marsCanvas");
  const ctx = canvas.getContext("2d");

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw grid
  const gridSize = 40; // Adjust the size as needed
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      ctx.strokeRect(i * gridSize, j * gridSize, gridSize, gridSize);
    }
  }

  // Draw obstacles
  const obstacleSize = 20; // Adjust the size as needed
  const obstacleColor = "gray";
  obstacles.forEach((obstacle) => {
    ctx.beginPath();
    ctx.rect(
      obstacle.x * gridSize,
      obstacle.y * gridSize,
      obstacleSize,
      obstacleSize
    );
    ctx.fillStyle = obstacleColor;
    ctx.fill();
    ctx.stroke();
  });

  // Draw rovers
  const roverSize = 20; // Adjust the size as needed
  const roverColor = "red";
  ctx.beginPath();
  ctx.arc(
    rover.x * gridSize + gridSize / 2,
    rover.y * gridSize + gridSize / 2,
    roverSize,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = roverColor;
  ctx.fill();
  ctx.stroke();
}

// *****************************
// Bonus: Handle keyboard events
// *****************************

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      goForward(rover1);
      break;
    case "ArrowDown":
      moveBackward(rover1);
      break;
    case "ArrowLeft":
      turnLeft(rover1);
      break;
    case "ArrowRight":
      turnRight(rover1);
      break;
    default:
      break;
  }
});

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "w":
      goForward(rover2);
      break;
    case "s":
      moveBackward(rover2);
      break;
    case "a":
      turnLeft(rover2);
      break;
    case "d":
      turnRight(rover2);
      break;
    default:
      break;
  }
});

// Add this function call to initialize the grid and rover on page load
drawGridAndRover(rover1);
