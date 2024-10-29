// Imports and Global Variables
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
  description: string;
}

const availableItems: Item[] = [
  {
    name: "🌴 Banana Tree Farm",
    cost: 10,
    growthRate: 0.1,
    count: 0,
    description: "A thriving farm of banana trees...",
  },
  {
    name: "🏢 Monkey Business",
    cost: 100,
    growthRate: 2,
    count: 0,
    description: "A corporate venture run by monkeys...",
  },
  {
    name: "🚀 Rocket Ship",
    cost: 1000,
    growthRate: 50,
    count: 0,
    description: "Reach for the stars! This rocket ship...",
  },
  {
    name: "🌌 Galaxy",
    cost: 1500,
    growthRate: 100,
    count: 0,
    description: "The universe is your playground...",
  },
  {
    name: "🦧 God Hood",
    cost: 2000,
    growthRate: 500,
    count: 0,
    description: "Ascend to godhood and command bananas...",
  },
];

const COST_MULTIPLIER = 1.5;

let counter: number = 0;
let growthRate: number = 0;
let lastTime: number = performance.now();

// Utility Functions
function createButton(
  innerHTML: string,
  title: string,
  onClick: () => void,
  disabled: boolean = false,
): HTMLButtonElement {
  const button = document.createElement("button");
  button.innerHTML = innerHTML;
  button.title = title;
  button.disabled = disabled;
  button.style.marginBottom = "10px";
  button.addEventListener("click", onClick);
  return button;
}

function createDisplay(content: string, marginTop: string): HTMLDivElement {
  const display = document.createElement("div");
  display.innerHTML = content;
  display.style.marginTop = marginTop;
  return display;
}

// Main Container Setup
const mainContainer = document.createElement("div");
mainContainer.style.display = "flex";
mainContainer.style.flexDirection = "column";
mainContainer.style.alignItems = "center";
mainContainer.style.marginTop = "20px";

const counterDisplay = createDisplay(
  `${Math.floor(counter)} 🍌 Bananas`,
  "20px",
);
const growthRateDisplay = createDisplay(
  `${growthRate.toFixed(1)} per second`,
  "10px",
);

// Main Button
const mainButton = createButton(
  "🐵",
  "Click to earn bananas",
  () => {
    counter += 1;
    counterDisplay.innerHTML = `${Math.floor(counter)} 🍌 Bananas`;
  },
  false,
);
mainButton.classList.add("monkey-button");
mainButton.style.fontSize = "300px";

mainContainer.appendChild(mainButton); // Append main button
mainContainer.appendChild(counterDisplay); // Append counter display below button
mainContainer.appendChild(growthRateDisplay); // Append growth rate display below counter
app.appendChild(mainContainer); // Append the main container to the app

// Upgrade Buttons Setup
const upgradeContainer = document.createElement("div");
upgradeContainer.style.position = "absolute";
upgradeContainer.style.left = "0";
upgradeContainer.style.top = "50%";
upgradeContainer.style.transform = "translate(0, -50%)";
upgradeContainer.style.display = "flex";
upgradeContainer.style.flexDirection = "column";
upgradeContainer.style.justifyContent = "center";
app.appendChild(upgradeContainer);

availableItems.forEach((item) => {
  const buttonUpgrade = createButton(
    `${item.name} - ${item.cost}`,
    item.description,
    () => {
      if (counter >= item.cost) {
        counter -= item.cost;
        growthRate += item.growthRate;
        counterDisplay.innerHTML = `${Math.floor(counter)} Bananas`;
        item.count++;
        buttonUpgrade.innerHTML = `${item.name} - ${item.cost}`;
        item.cost = Math.floor(item.cost * COST_MULTIPLIER);
        buttonUpgrade.disabled = counter < item.cost;

        // item.count++; // Increase the count of the item
        itemCounterDisplay.innerHTML = item.count.toString(); // Update the item counter display

        // Increase the cost of the upgrade
        item.cost = Math.floor(item.cost * COST_MULTIPLIER);
        buttonUpgrade.innerHTML = `${item.name} - ${item.cost}`;
      }
    },
    true,
  );

  const itemCounterDisplay = document.createElement("span");
  itemCounterDisplay.innerHTML = item.count.toString();
  itemCounterDisplay.style.marginLeft = "10px";

  const upgradeButtonContainer = document.createElement("div");
  upgradeButtonContainer.style.display = "flex";
  upgradeButtonContainer.style.alignItems = "center";
  upgradeButtonContainer.appendChild(buttonUpgrade);
  upgradeButtonContainer.appendChild(itemCounterDisplay);
  upgradeContainer.appendChild(upgradeButtonContainer);
});

// Animation Loop and Button State Functions
function upgradeButtonState(button: HTMLButtonElement, item: Item) {
  button.disabled = counter < item.cost;
}

function animate(time: number) {
  const deltaTime = time - lastTime;
  lastTime = time;

  counter += (growthRate * deltaTime) / 1000;
  counterDisplay.innerHTML = `${Math.floor(counter)} 🍌 Bananas`;
  growthRateDisplay.innerHTML = `${growthRate.toFixed(1)} per second`;

  availableItems.forEach((item, index) => {
    const upgradeButton = upgradeContainer.children[index]
      .children[0] as HTMLButtonElement;
    upgradeButtonState(upgradeButton, item);
  });

  requestAnimationFrame(animate);
}

// Start Animation
requestAnimationFrame(animate);
