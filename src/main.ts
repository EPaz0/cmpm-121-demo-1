import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Monke Mania";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);


//Button
const button = document.createElement('button');

//Set button to emoji
button.innerHTML = '🐵'

button.style.fontSize = '24px';

//Create container div to center the button and header
//uses flexbox to align the children(header & button)
// vertically and horizontally
const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.justifyContent = 'center';
container.style.alignItems = 'center';
container.style.height = '100vh'; // viewport height for vertical centering

// Append your elements to the container
container.appendChild(header);
container.appendChild(button);



//connect button tot he body of document
//document.body.appendChild(button);
// Append the container to the app element
app.appendChild(container);
