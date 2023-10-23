import { NlpManager } from "node-nlp";

export const manager = new NlpManager({ languages: ["en"], forceNER: true });

export const addDocument = (language, question, intent) => {
  return manager.addDocument(language, question, intent);
};

export const addAnswer = (language, intent, answer) => {
  return manager.addAnswer(language, intent, answer);
};
