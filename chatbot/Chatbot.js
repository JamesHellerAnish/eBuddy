const OpenAI = require('openai');

const openai = new OpenAI(
    { apiKey: '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' }
);

async function askQuestion(message) {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: "${message}" }],
      model: "gpt-3.5-turbo"
    });
    console.log(response.choices[0]);
  } catch (error) {
    console.error(error);
  }
}

askQuestion(message);