import login from "../models/login.model.js";


// Login Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password' });
    }

    // Find the user by email
    const user = await login.findOne({ email });

    // Check if the user exists and the password is correct
    if (!user || (password !== "Nnayeem12@1234")) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a token or session ID for the user
    const token = "hello-world"; // Implement this method in your User model

    // Set the cookie with the token or session ID
    res.cookie('authToken', token);

    res.status(200).json({ message: 'Login successful',data :token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const loginUserView = async (req, res) => {
  try {


    // Find the user by email
    const user = await login.create(req.body);

    // Check if the user exists and the password is correct
    

    res.status(200).json({ message: 'Login successful'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
