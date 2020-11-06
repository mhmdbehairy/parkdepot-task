let USER_ID = 0;

const users = [
  {
    id: USER_ID++,
    firstName: "Mohamed",
    lastName: "El-Behairy",
    permissions: ["CREATE_WHITELIST_ITEM"],
  },
];

module.exports = {
  Query: {
    users: () => users,
  },
  Mutation: {
    createUser(_, args) {
      const user = args.input;
      user.id = USER_ID++;
      users.push(user);

      return user;
    },
  },
};
