import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
const socket = io.connect();

const chatForm = document.querySelector(".signup-form");
const chatInput = document.getElementById("chat");
const chatBtn = document.querySelector(".signup-button");
const cliCnt = document.querySelector(".roomCnt");
const chattingForm = document.querySelector(".chatting-form");
const nicknameForm = document.querySelector(".nickname-form");
const nicknameInput = document.querySelector("#nickname");
const roomCntWrapper = document.querySelector(".roomCntWrapper");
const nicknameBtn = document.querySelector(".nickname-button");

chattingForm.hidden = true;
roomCntWrapper.hidden = true;

nicknameBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let nickname = nicknameInput.value;
  socket.emit("nickname", nickname, showClntCnt);
  nicknameForm.hidden = true;
  chattingForm.hidden = false;
  roomCntWrapper.hidden = false;
});

const showClntCnt = (roomCnt) => {
  cliCnt.innerHTML = roomCnt;
};

const paintPage = (message, roomCnt) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat");
  cliCnt.innerHTML = roomCnt;
  chatDiv.innerHTML = `
            <div class="chat-message">
            <p class="chat-message__text">${message}</p>
            </div>
        `;
  chatForm.appendChild(chatDiv);
};

chatBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const message = chatInput.value;
  socket.emit("chat", message, paintPage);
  // paintPage(`나: ${message}`, clientCount);
  chatInput.value = "";
});

socket.on("entering", (nickname, clntCnt) => {
  showClntCnt(clntCnt);

  paintPage(`${nickname}님이 방에 입장했습니다.`, clntCnt);
});

socket.on("recieve chat", (message, clntCnt) => {
  console.log(clntCnt);
  showClntCnt(clntCnt);

  paintPage(message, clntCnt);
});

socket.on("hello", (clntCnt) => {
  console.log(clntCnt);
});

socket.on("bye", (message, clntCnt) => {
  console.log("clntCnt from bye", clntCnt);
  showClntCnt(clntCnt);
  paintPage(message, clntCnt);
});
