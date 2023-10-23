import express from "express";
import { addAnswer, addDocument, manager } from "./config/index.js";
import cors from "cors";

const PORT = process.env.PORT || 10000;
const app = express();

app.use(cors());
app.use(express.json());

// Adds the utterances and intents for the NLP
addDocument("en", "goodbye for now", "greetings.bye");
addDocument("en", "bye bye take care", "greetings.bye");
addDocument("en", "okay see you later", "greetings.bye");
addDocument("en", "bye for now", "greetings.bye");
addDocument("en", "i must go", "greetings.bye");
addDocument("en", "hello", "greetings.hello");
addDocument("en", "hi", "greetings.hello");
addDocument("en", "howdy", "greetings.hello");

// Train also the NLG
addAnswer("en", "greetings.bye", "Till next time");
addAnswer("en", "greetings.bye", "see you soon!");
addAnswer("en", "greetings.hello", "Hey there!");
addAnswer("en", "greetings.hello", "Greetings!");

// Train and save the model.
(async () => {
  await manager.train();
  manager.save();
  app.get("/bot", async (req, res) => {
    const response = await manager.process("en", req.query.message.toString());
    return res.status(200).json(response.answer);
  });
})();

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
