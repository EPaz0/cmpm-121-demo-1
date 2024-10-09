import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Monke Mania";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Button
const button = document.createElement("button");

const buttonUpgrade = document.createElement("button") as HTMLButtonElement;

//Set button to emoji
button.innerHTML = "🐵";

buttonUpgrade.innerHTML = "🌴 Auto Upgrade";
buttonUpgrade.disabled = true; // Disable the upgrade button initially

button.style.fontSize = "24px";

//Create container div to center the button and header
//uses flexbox to align the children(header & button)
// vertically and horizontally
const container = document.createElement("div");
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.justifyContent = "center";
container.style.alignItems = "center";
container.style.height = "100vh"; // viewport height for vertical centering

// Append your elements to the containerz
container.appendChild(header);
container.appendChild(button);
container.appendChild(buttonUpgrade);

let counter: number = 0;
let growthRate: number = 0

const counterDisplay = document.createElement("div");

//counterDisplay.innerHTML = '${counter} Bananas'

let lastTime = performance.now();

function animate(time: number) {
  const deltaTime = time - lastTime; // Calculate elapsed time since the last frame
  lastTime = time;

  counter += (growthRate * deltaTime) / 1000; //Increase by deltaTime in seconds
  counterDisplay.innerHTML = `${counter.toFixed(0)} Bananas`; //DIsplay two decimnal places


  // Enable upgrade button if the player has at least 10 units
  buttonUpgrade.disabled = counter < 10;

  requestAnimationFrame(animate); // Request the next frame
}

requestAnimationFrame(animate); //start aniamtion loop

function updateCounter() {
  counter++;
  if (counter == 1) {
    counterDisplay.innerHTML = `${counter} Banana`;
  } else {
    counterDisplay.innerHTML = `${counter} Bananas`;
  }
}

// Upgrade purchase logic
function purchaseUpgrade() {
  if (counter >= 10) {
    counter -= 10; // Deduct 10 units
    growthRate++; // Increase the growth rate
    counterDisplay.innerHTML = `${Math.floor(counter)} Bananas`;

    // Re-disable if counter falls below 10
    buttonUpgrade.disabled = counter < 10;
  }
}

button.addEventListener("click", updateCounter);
buttonUpgrade.addEventListener("click", purchaseUpgrade);

container.appendChild(counterDisplay);
//connect button tot he body of document
//document.body.appendChild(button);
// Append the container to the app element
app.appendChild(container);
