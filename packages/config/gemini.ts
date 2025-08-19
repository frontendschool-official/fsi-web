import { env } from './env';

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const apiKey = env.GEMINI_API_KEY;
console.log(apiKey, 'apiKey');
export const makeGeminiRequest = async (
  body: any,
  expectedResponseType?: 'json' | 'text'
) => {
  try {
    // If body has a prompt property, convert it to the correct Gemini API format
    const requestBody = body.prompt
      ? {
          contents: [
            {
              role: 'user',
              parts: [{ text: body.prompt }],
            },
          ],
        }
      : body;

    const res = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
    console.log(data, 'data makeGeminiRequest');

    const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (expectedResponseType === 'text') {
      return text;
    }

    console.log(text, 'text makeGeminiRequest');
    if (!text) {
      console.error('❌ Empty response from Gemini API');
      throw new Error('Empty response from AI service');
    }
    let parsedResponse: any;
    const jsonMatch = text?.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    parsedResponse = JSON.parse(jsonMatch?.[0]);

    return parsedResponse;
  } catch (error: any) {
    console.log('Error making Gemini request:', error?.response);
    throw error;
  }
};
