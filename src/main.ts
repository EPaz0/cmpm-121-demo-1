import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Monke Mania";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

interface Item {
  name: string;
  cost: number;
  growthRate: number;
  count: number;
}

const avaibleItems: Item[] = [
  { name: "🌴 Tier I Upgrade", cost: 10, growthRate: 0.1, count: 0 },
  { name: "🏢 Tier II Upgrade", cost: 100, growthRate: 1, count: 0 },
  { name: "🚀 Tier III Upgrade", cost: 1000, growthRate: 10, count: 0 },
];
//Global variables
let counter: number = -0;
let growthRate: number = 0;
const counterDisplay = document.createElement("div");
const growthRateDisplay = document.createElement("div");
let lastTime: number = performance.now();

//Main Button Container
const mainContainer = document.createElement("div");
mainContainer.style.display = "flex";
mainContainer.style.flexDirection = "column";
mainContainer.style.alignItems = "center";
mainContainer.style.marginTop = "20px";

//Upgrade Container
const upgradeContainer = document.createElement("div");
upgradeContainer.style.position = "absolute";
upgradeContainer.style.left = "0";
upgradeContainer.style.top = "50%";
upgradeContainer.style.transform = "translate(0, -50%)";
upgradeContainer.style.display = "flex";
upgradeContainer.style.flexDirection = "column";
upgradeContainer.style.justifyContent = "center";
app.appendChild(upgradeContainer);

//MainButton
const button = document.createElement("button");
button.classList.add("monkey-button");
button.innerHTML = "🐵";
button.style.fontSize = "300px";
mainContainer.appendChild(button); // Append the main button to the container

// Counter Display
counterDisplay.style.marginTop = "20px";
mainContainer.appendChild(counterDisplay); // Append the counter display to the container

// Growth Rate Display
growthRateDisplay.style.marginTop = "10px";
mainContainer.appendChild(growthRateDisplay); // Append the growth rate display to the container

// Append Main Container to App
app.appendChild(mainContainer);

// Add event listener to the main button to increment the counter
button.addEventListener("click", () => {
  counter += 1; // Increment counter by 1 for each click
  counterDisplay.innerHTML = `${Math.floor(counter)} 🍌 Bananas`; // Update the counter display
});

//Upgrade buttons
avaibleItems.forEach((item) => {
  const buttonUpgrade = document.createElement("button");
  buttonUpgrade.innerHTML = `${item.name} - ${item.cost}`; // Set the button text to the item name
  buttonUpgrade.disabled = true; // Disable the upgrade button initially
  buttonUpgrade.style.marginBottom = "10px"; // Add some margin to the bottom of the button

  //Create counter display for each upgrade
  const itemCounterDisplay = document.createElement("span");
  itemCounterDisplay.innerHTML = item.count.toString();
  itemCounterDisplay.style.marginLeft = "10px";

  //Append button and counter to upgrade container
  const upgradeButtonContainer = document.createElement("div");
  upgradeButtonContainer.style.display = "flex";
  upgradeButtonContainer.style.alignItems = "center";
  upgradeButtonContainer.appendChild(buttonUpgrade);
  upgradeButtonContainer.appendChild(itemCounterDisplay);
  upgradeContainer.appendChild(upgradeButtonContainer);

  //Add event listener to the button
  buttonUpgrade.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost; // Deduct the cost of the upgrade
      growthRate += item.growthRate; // Increase the growth rate
      counterDisplay.innerHTML = `${Math.floor(counter)} Bananas`; // Update the counter display
      item.count++; // Increase the count of the item
      itemCounterDisplay.innerHTML = item.count.toString(); // Update the item counter display

      // Increase the cost of the upgrade
      item.cost = Math.floor(item.cost * 1.5);
      buttonUpgrade.innerHTML = `${item.name} - ${item.cost}`; // Update the button text

      //disable the button if the player can't afford it
      buttonUpgrade.disabled = counter < item.cost;
    }
  });

  //Update button enabled state within animation loop
  function upgradeButtonState() {
    buttonUpgrade.disabled = counter < item.cost;
  }

  //Call updateButtonState insdie animation loop
  function animate(time: number) {
    const deltaTime = time - lastTime; // Calculate the time since the last frame
    lastTime = time;

    counter += (growthRate * deltaTime) / 1000; // Increase the counter by the growth rate
    counterDisplay.innerHTML = `${Math.floor(counter)} 🍌 Bananas`; // Update the counter display
    growthRateDisplay.innerHTML = `${growthRate.toFixed(1)} per second`; // Update the growth rate display

    upgradeButtonState(); // Update the button state
    requestAnimationFrame(animate); // Call the animate function again
  }
  requestAnimationFrame(animate); // Call the animate function for the first time
});
