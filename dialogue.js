const users = require("./users");

const dialogue = {
  [users.JIMMY]: {
    indian: "How's the indian girl?",
    sheep: "How's the sheep",
    gay: "Jimmy gay",
  },
  [users.OWEN]: {
    friends: "Dondie has no friends",
    jimmy: "Owen always simp for jimmy",
  },
  [users.LIWEI]: {
    test: "test1",
    test2: "test2",
  },
  DEFAULT: "I do not have that or any shit talk for this person",
};

module.exports = dialogue;
