import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateResponse = async (
  persona: string,
  context: string,
  userMessage: string
): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `You are ${persona}. ${context}` },
        { role: "user", content: userMessage }
      ],
    });

    return completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('Error generating OpenAI response:', error);
    throw new Error('Failed to generate response');
  }
};