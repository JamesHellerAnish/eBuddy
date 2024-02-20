const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Configure OpenAI API
const openai = new OpenAI({
  apiKey: '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',
});

function checkHardcodedResponses(message) {
    const lowerCaseMessage = message.toLowerCase();
    const hardcodedResponses = {
      "hello": "Hello! How can I assist you today?",
      "bye": "Goodbye! Have a great day!",
      "what is your name?": "Hello, My name is eBuddy",
      // Add more hardcoded responses as needed
    };

    for (const [key, value] of Object.entries(hardcodedResponses)) {
        if (lowerCaseMessage.includes(key)) {
          return value;
        }
      }
      return null;
    }

// Function to generate chatbot response using OpenAI
async function chatbotResponse(message) {
    const hardcodedResponse = checkHardcodedResponses(message);
  if (hardcodedResponse) {
    return hardcodedResponse;
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // You can use different models based on your needs
      messages: [{ role: "system", content: message }],
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return "I'm sorry, I'm having trouble understanding you right now.";
  }
}

// Define a POST endpoint for the chatbot
app.post('/chatbot', async (req, res) => {
  const { message } = req.body;
  const responseMessage = await chatbotResponse(message);
  res.json({ reply: responseMessage });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});