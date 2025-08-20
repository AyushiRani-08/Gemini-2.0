
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with API key (better: use process.env.GOOGLE_API_KEY)
const genAI = new GoogleGenerativeAI("AIzaSyCbqjhd4xYyarJW7Mfwa_4Z67sop9LdwNw");

async function main(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // You can pass a simple string
  const result = await model.generateContent(prompt);

  // Print the text
  console.log(result.response.text());
}


export default main;
