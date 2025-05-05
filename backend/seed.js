import mongoose from "mongoose";
import dotenv from "dotenv";
import foodModel from "./models/foodModel.js"; // Adjust the path based on your project structure

dotenv.config();

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/foodOrder", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected...");
    seedData();
  })
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Seed data
const seedData = async () => {
  const foodItems = [
    {
      name: "Tomato slice",
      description: "this is new made tomato slice",
      price: 150,
      image: "1719814344616food_4.png",
      category: "Deserts",
    },
    {
      name: "Sandwich",
      description: "this is sandwich",
      price: 130,
      image: "1719814969490food_13.png",
      category: "Sandwich",
    },
    {
      name: "ice-cream",
      description: "this is ice-cream",
      price: 120,
      image: "1719814925524food_12.png",
      category: "Cake",
    },
    {
      name: "Noodles",
      description: "this is noodles",
      price: 130,
      image: "1719824006008food_31.png",
      category: "Pasta",
    },
    {
      name: "The Daily pasta",
      description: "this is pasta",
      price: 150,
      image: "1719817490658food_26.png",
      category: "Pasta",
    },
    {
      name: "roll",
      description: "this is crispy roll",
      price: 150,
      image: "1719814598535food_6.png",
      category: "Rolls",
    },
    {
      name: "sandwich",
      description: "this is multilayer cheese sandwich",
      price: 160,
      image: "1719815011145food_14.png",
      category: "Sandwich",
    },
    {
      name: "strawberry cake",
      description: "this is cake",
      price: 100,
      image: "1719815241725food_18.png",
      category: "Salad",
    },
    {
      name: "Chicken",
      description: "A delicious Food to taste",
      price: 120,
      image: "1719814204695food_2.png",
      category: "Rolls",
    },
   
    {
      name: "Salad",
      description: "Green Salad",
      price: 220,
      image: "1720102959965food_1.png",
      category: "Salad",
    },
    {
      name: "Salad",
      description: "Green Salad",
      price: 240,
      image: "1720102959965food_1.png",
      category: "Salad",
    }
  ];

  try {
    await foodModel.insertMany(foodItems);
    console.log("Food data seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data", err);
    mongoose.connection.close();
  }
};
