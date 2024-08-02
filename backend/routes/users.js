const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
  console.log("Received signup request with data:", req.body);

  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    console.log("Validated user data");

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "user with this id already exists" });

    console.log("User does not exist");

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    console.log("Hashed password");

    await new User({ ...req.body, password: hashPassword }).save();
    console.log("User created successfully.");

    res.status(201).send({ message: "user created successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send({ message: "internal server error", error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const user = await User.findById(userId);
    console.log("users", user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const updatedData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (updatedUser) {
      res.json(updatedUser); 
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
});
module.exports = router;
