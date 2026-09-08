import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Connect to database function
export async function connectToDatabase() {
  // MongoDB connection URI (set by docker compose)
  const uri = process.env.MONGO_URL;
  if (!uri) throw new Error("MONGO_URL is not set");

  try {
    setupConnectionMonitoring();
    await mongoose.connect(uri);

    return mongoose.connection;
  } catch (error) {
    throw error;
  }
}

// Connection state descriptions mapped to their numeric values
const CONNECTION_STATES = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

// Get the current connection status
export function getConnectionStatus() {
  const state = mongoose.connection.readyState;
  return {
    state,
    stateDescription: CONNECTION_STATES[state] || "unknown",
    host: mongoose.connection.host,
    name: mongoose.connection.name,
  };
}

// Check if database is connected
export function isConnected() {
  return mongoose.connection.readyState === 1;
}

// Event listeners for connection status
function setupConnectionMonitoring() {
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connection established");
    console.log("Connection status:", getConnectionStatus());
  });

  mongoose.connection.on("disconnected", () => {
    console.log("\nMongoose connection disconnected");
    console.log("Connection status:", getConnectionStatus());
  });

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
    console.log("Connection status:", getConnectionStatus());
  });

  // Handle application termination
  process.on("SIGINT", async () => {
    await disconnectFromDatabase();
    process.exit(0);
  });
}

// Disconnect function (optional but good practice)
export async function disconnectFromDatabase() {
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}
