var moment = require("moment");

var generateMessage = (from, room, text) => {
  return {
    from,
    room,
    text,
    createdDate: moment().valueOf(),
  };
};

var isRealString = (str) => {
  return typeof str === "string" && str.trim().length > 0;
};

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = { id, name, room };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList(room) {
    var users = this.users.filter((user) => user.room === room);
    return users.length || 0;
    // var namesArr = users.map((user) => user.name);
    // return namesArr;
  }
}

module.exports = { Users, isRealString, generateMessage };
