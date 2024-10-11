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
const buttonUpgradeTwo = document.createElement("button") as HTMLButtonElement;
const buttonUpgradeThree = document.createElement(
  "button",
) as HTMLButtonElement;

//Set button to emoji
button.innerHTML = "🐵";

buttonUpgrade.innerHTML = "🌴 Tier I Upgrade - 10";
buttonUpgrade.disabled = true; // Disable the upgrade button initially'

buttonUpgradeTwo.innerHTML = "🏢 Tier II Upgrade - 100";
buttonUpgradeTwo.disabled = true; // Disable the upgrade button initially'

buttonUpgradeThree.innerHTML = "👽 Tier III Upgrade - 1000";
buttonUpgradeThree.disabled = true; // Disable the upgrade button initially'

button.style.fontSize = "24px";

// Upgrade Counters
const upgradeOneCounterDisplay = document.createElement("span");
upgradeOneCounterDisplay.innerHTML = "0";
upgradeOneCounterDisplay.style.marginLeft = "10px";

const upgradeTwoCounterDisplay = document.createElement("span");
upgradeTwoCounterDisplay.innerHTML = "0";
upgradeTwoCounterDisplay.style.marginLeft = "10px";

const upgradeThreeCounterDisplay = document.createElement("span");
upgradeThreeCounterDisplay.innerHTML = "0";
upgradeThreeCounterDisplay.style.marginLeft = "10px";

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

//Create container to center and place future upgrades on the right
const upgradeContainer = document.createElement("div");
upgradeContainer.style.position = "absolute";
upgradeContainer.style.left = "0";
upgradeContainer.style.top = "50%";
upgradeContainer.style.transform = "translate(0, -50%)";
upgradeContainer.style.display = "flex";
upgradeContainer.style.flexDirection = "column";
upgradeContainer.style.justifyContent = "center";

// Create sub-containers for each upgrade button and counter
const upgradeButtonContainerOne = document.createElement("div");
upgradeButtonContainerOne.style.display = "flex";
upgradeButtonContainerOne.style.alignItems = "center";
upgradeButtonContainerOne.appendChild(buttonUpgrade);
upgradeButtonContainerOne.appendChild(upgradeOneCounterDisplay);

const upgradeButtonContainerTwo = document.createElement("div");
upgradeButtonContainerTwo.style.display = "flex";
upgradeButtonContainerTwo.style.alignItems = "center";
upgradeButtonContainerTwo.appendChild(buttonUpgradeTwo);
upgradeButtonContainerTwo.appendChild(upgradeTwoCounterDisplay);

const upgradeButtonContainerThree = document.createElement("div");
upgradeButtonContainerThree.style.display = "flex";
upgradeButtonContainerThree.style.alignItems = "center";
upgradeButtonContainerThree.appendChild(buttonUpgradeThree);
upgradeButtonContainerThree.appendChild(upgradeThreeCounterDisplay);

// Append the sub-containers to the upgrade container
upgradeContainer.appendChild(upgradeButtonContainerOne);
upgradeContainer.appendChild(upgradeButtonContainerTwo);
upgradeContainer.appendChild(upgradeButtonContainerThree);

let counter: number = 0;
let growthRate: number = 0;
let upgradeOneCounter: number = 0;
let upgradeTwoCounter: number = 0;
let upgradeThreeCounter: number = 0;

const counterDisplay = document.createElement("div");
const growthRateDisplay = document.createElement("div");

//counterDisplay.innerHTML = '${counter} Bananas'

let lastTime = performance.now();

function animate(time: number) {
  const deltaTime = time - lastTime; // Calculate elapsed time since the last frame
  lastTime = time;

  counter += (growthRate * deltaTime) / 1000; //Increase by deltaTime in seconds
  counterDisplay.innerHTML = `${counter.toFixed(0)} 🍌 Bananas`; //DIsplay two decimnal places
  growthRateDisplay.innerHTML = `${growthRate.toFixed(2)} per second`;

  // Enable upgrade button if the player has at least 10 units
  buttonUpgrade.disabled = counter < 10;
  buttonUpgradeTwo.disabled = counter < 100;
  buttonUpgradeThree.disabled = counter < 1000;

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
function purchaseUpgradeOne() {
  if (counter >= 10) {
    counter -= 10; // Deduct 10 units
    growthRate = growthRate + 0.1; // Increase the growth rate
    counterDisplay.innerHTML = `${Math.floor(counter)} Bananas`;

    upgradeOneCounter++;
    upgradeOneCounterDisplay.innerHTML = upgradeOneCounter.toString();

    // Re-disable if counter falls below 10
    buttonUpgrade.disabled = counter < 10;
  }
}
// Upgrade purchase logic
function purchaseUpgradeTwo() {
  if (counter >= 10) {
    counter -= 10; // Deduct 10 units
    growthRate = growthRate + 2; // Increase the growth rate
    counterDisplay.innerHTML = `${Math.floor(counter)} Bananas`;

    upgradeTwoCounter++;
    upgradeTwoCounterDisplay.innerHTML = upgradeTwoCounter.toString();

    // Re-disable if counter falls below 10
    buttonUpgrade.disabled = counter < 100;
  }
}
//Upgrade three function
function purchaseUpgradeThree() {
  if (counter >= 10) {
    counter -= 10; // Deduct 10 units
    growthRate = growthRate + 50; // Increase the growth rate
    counterDisplay.innerHTML = `${Math.floor(counter)} Bananas`;

    upgradeThreeCounter++;
    upgradeThreeCounterDisplay.innerHTML = upgradeThreeCounter.toString();

    // Re-disable if counter falls below 10
    buttonUpgrade.disabled = counter < 1000;
  }
}

// Add event listener to the button
button.addEventListener("click", updateCounter);
buttonUpgrade.addEventListener("click", purchaseUpgradeOne);
buttonUpgradeTwo.addEventListener("click", purchaseUpgradeTwo);
buttonUpgradeThree.addEventListener("click", purchaseUpgradeThree);

// Append the container to the app element
container.appendChild(counterDisplay);
container.appendChild(growthRateDisplay);

//connect button tot he body of document
//document.body.appendChild(button);
// Append the container to the app element
app.appendChild(container);
app.appendChild(upgradeContainer);
