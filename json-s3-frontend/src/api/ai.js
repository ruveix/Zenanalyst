// src/api/ai.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1";

export async function askAi(userPrompt, datasetJson) {
  const response = await axios.post(`${API_BASE_URL}/ask-ai`, {
    userPrompt,
    datasetJson,
  });
  return response.data;
}
