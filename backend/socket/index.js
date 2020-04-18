const { isRealString, generateMessage } = require("./utils");

module.exports = (io, users) => {
  io.on("connection", (socket) => {
    socket.on("leave", (params) => {
      socket.leave(params.room);
    });

    socket.on("join", (params, callback) => {
      if (!isRealString(params.name) || !isRealString(params.room)) {
        return callback("Bad request");
      }

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit("updateUserList", users.getUserList(params.room));
      // socket.emit(
      //   "newMessage",
      //   generateMessage("Admin", params.room, "Welcome to the chat app.")
      // );
      // socket.broadcast
      //   .to(params.room)
      //   .emit(
      //     "newMessage",
      //     generateMessage("Admin", params.room, `${params.name} has joined.`)
      //   );

      callback();
    });

    socket.on("createMessage", (message, callback) => {
      var user = users.getUser(socket.id);
      if (user && isRealString(message.text)) {
        let tempObj = generateMessage(user.name, user.room, message.text);
        io.to(user.room).emit("newMessage", tempObj);
        callback({
          data: tempObj,
        });
      }
      callback();
    });

    socket.on("disconnect", () => {
      var user = users.removeUser(socket.id);

      if (user) {
        io.to(user.room).emit("updateUserList", users.getUserList(user.room));
        io.to(user.room).emit(
          "newMessage",
          generateMessage("Admin", user.room, `${user.name} has left.`)
        );
      }
    });
  });
};
