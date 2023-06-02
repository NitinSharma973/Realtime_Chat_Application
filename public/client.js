const socket = io();
let name;
let MessageArea = document.querySelector(".messageArea");
let textarea = document.querySelector("#textarea");

do {
  name = prompt("please enter your name:");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };

  appendMessage(msg, "outgoingmessage");

  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDev = document.createElement("div");

  let className = type;

  mainDev.classList.add(className, "message");

  let markup = `
    
    
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>

    `;

  mainDev.innerHTML = markup;

  MessageArea.appendChild(mainDev);
}

socket.on("message", (msg) => {
  appendMessage(msg, "incomingmessage");
});
