const fs = require("fs");
const path = require("path");

const users = JSON.parse(
  fs.readFileSync(
    `${path.dirname(__dirname)}/dev-data/data/users.json`,
    (err, content) => content
  )
);

const getAllUsers = (req, res) => {
  res
    .status(200)
    .json({ status: "success", time: req.requestTimer, data: { users } });
};

const getUser = (req, res) => {
  const user = users.find((x) => x._id === req.params.id);
  if (user) {
    return res.status(200).json({ status: "success", data: { user } });
  }
  return res.status(404).json({ status: "Not found" });
};

const createNewUser = (req, res) => {
  const id = users[users.length - 1]._id + 1;
  const newUser = { id: id, ...req.body };
  users.push(newUser);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(users),
    () => {
      res.status(201).json({
        status: "success",
        time: req.requestTimer,
        data: { users: newUser },
      });
    }
  );
};

module.exports = {
  getAllUsers,
  getUser,
  createNewUser,
};
