import SocketIO from "socket.io";

export default (server) => {
  const io = SocketIO(server);
  const roomClientCnt = () => {
    return io.sockets.adapter.rooms.get("chat_room")?.size;
  };

  io.on("connection", (socket) => {
    console.log("새로운 클라이언트 접속!", socket.id);
    socket.onAny((event) => {
      console.log(`Socket Event: ${event}`);
    });

    socket.join("chat_room");

    socket.on("disconnecting", () => {
      socket
        .to("chat_room")
        .emit(
          "bye",
          `${socket["nickname"]}님이 방을 떠났습니다.`,
          roomClientCnt() - 1
        );
    });
    socket.on("disconnect", () => {
      console.log("클라이언트 접속 해제");
    });

    socket.on("chat", (message, paintPage) => {
      socket.broadcast.emit(
        "recieve chat",
        `${socket["nickname"]} : ${message}`,
        roomClientCnt()
      );
      paintPage(`나 : ${message}`, roomClientCnt());
    });

    socket.on("nickname", (nickname, cb) => {
      if (nickname.length === 0) {
        socket["nickname"] = "익명의 사용자";
      } else {
        socket["nickname"] = nickname;
      }
      cb(roomClientCnt());
      socket
        .to("chat_room")
        .emit("entering", socket["nickname"], roomClientCnt());
    });

    socket.on("error", (error) => {
      console.error(error);
    });
  });
};
