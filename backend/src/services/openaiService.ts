import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ContextualExplanation {
  [key: string]: string;
}

export const generateResponse = async (
  persona: string,
  context: string,
  userMessage: string
): Promise<{ response: string; contextualExplanations: ContextualExplanation }> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `You are ${persona}. ${context}` },
        { role: "user", content: userMessage }
      ],
    });

    const response = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";

    // Generate contextual explanations
    const explanationCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          "role": "system",
          "content": "You are a historian specializing in ancient history. Provide explanations in valid JSON format without any markdown formatting."
        },
        {
          "role": "user",
          "content": `This was written from the perspective of ${persona}: "${response}". Identify key terms or concepts related to ancient history **that are mentioned exactly as written in the text**. The keys must match the exact words or phrases in the text that triggered the explanation, without interpreting or summarizing them into related concepts. Focus on:
    - Historically significant people, places, events, and battles mentioned in the text,
    - Specific military strategies, equipment, and geographic locations from the text,
    - Culturally important artifacts or historical concepts **explicitly named in the text**.
    Avoid abstract concepts, emotions, or vague ideas, and ensure the explanations are linked only to the exact terms or phrases that appear in the provided text. Provide brief explanations (max 1 paragraph each). Format the response as a JSON object where the keys are the exact words from the text, and the values are the explanations.`
        }
      ]
    });

    let contextualExplanations: ContextualExplanation = {};

    if (explanationCompletion.choices[0].message.content) {
      try {
        // Remove markdown code block formatting if present
        let jsonString = explanationCompletion.choices[0].message.content.trim();
        if (jsonString.startsWith('```')) {
          jsonString = jsonString.replace(/^```(?:json)?\s?/, '').replace(/```$/, '');
        }
        contextualExplanations = JSON.parse(jsonString);
      } catch (parseError) {
        console.error('Error parsing contextual explanations:', parseError);
        console.log('Raw response:', explanationCompletion.choices[0].message.content);
        // If parsing fails, we'll return an empty object for contextualExplanations
      }
    }

    return { response, contextualExplanations };
  } catch (error) {
    console.error('Error generating OpenAI response:', error);
    throw new Error('Failed to generate response');
  }
};