exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      role,
      location,
      availableBooks,
      anonymous,
    } = req.body;

    // Validate role
    if (!["student", "donor", "school"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Validate role-specific fields
    if (role === "school" && (!location || !availableBooks)) {
      return res
        .status(400)
        .json({ message: "Schools must provide location and available books" });
    }

    if (role === "donor" && typeof anonymous !== "boolean") {
      return res
        .status(400)
        .json({ message: "Donors must specify anonymous as true or false" });
    }

    // Check if the user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with role-based fields
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      location: role === "school" ? location : undefined,
      availableBooks: role === "school" ? availableBooks : undefined,
      anonymous: role === "donor" ? anonymous : undefined,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name,
        email,
        phone,
        role,
        location: newUser.location,
        availableBooks: newUser.availableBooks,
        anonymous: newUser.anonymous,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        location: user.location,
        availableBooks: user.availableBooks,
        anonymous: user.anonymous,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
