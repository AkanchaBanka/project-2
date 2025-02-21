import OpenAI from "openai";
import { OPENAI_KEY } from "./constant";

console.log('Environment Variables:', process.env);
console.log('OpenAI API Key:', process.env.REACT_APP_OPENAI_API_KEY);

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export default openai;