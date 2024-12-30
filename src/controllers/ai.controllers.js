import fetch, { Headers } from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";
global.fetch = fetch;
global.Headers = Headers;

const genAi = new GoogleGenerativeAI(process.env.API_KEY);
export const generator = async (prompt) => {
  
  try {
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    let text;
    let result = await model.generateContent(prompt);
    let response = await result.response;
    text = response.text();
    return text;
  } catch (error) {
    console.error(error);
    return null
  }
};

export const generateDetails = async (req, res) => {
  const { prompt } = req.body;
  try {
    let pt = `${prompt}`;
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    let text;
    let result = await model.generateContent(pt);
    let response = await result.response;
    text = response.text();
    text = `I am ${name}` + " " + text;
    res.status(200).json({ message: text, success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: `An error occurred while generating the content. ${error}`,
      });
  }
};
