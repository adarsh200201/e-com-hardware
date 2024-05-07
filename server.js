// Import necessary modules
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
// import nodemailer from "nodemailer";

// Configure environment variables
dotenv.config();

// Database configuration
connectDB();

// Initialize Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Define a route to handle root endpoint

app.get("/check", (req, res) => {
  res.send("i am here");
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the ecommerce app</h1>");
});

// Route to handle forgot password request
app.post("/api/v1/auth/forgot-password", async (req, res) => {
  const { email } = req.body;

  // Generate temporary password
  const temporaryPassword = generateTemporaryPassword();

  // Send email with temporary password
  try {
    await sendEmail(email, temporaryPassword);
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Function to generate a temporary password
function generateTemporaryPassword() {
  // Implement your logic to generate a temporary password
  return "temporary123";
}

// Function to send email
async function sendEmail(email, temporaryPassword) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASSWORD, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    text: `Your temporary password is: ${temporaryPassword}`,
  };

  await transporter.sendMail(mailOptions);
}

// Define the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan
  );
});
