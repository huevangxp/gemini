const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

exports.chatPrompt = async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const { prompt } = req.body; // Destructure directly from req.body
        // console.log(prompt);
        if (!prompt) {
            return res.status(400).json({ message: 'No prompt provided' }); // Return a 400 Bad Request status if prompt is missing
        }
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()
        return text
        //    return res.status(200).json({message: 'Success', response}); // Respond with the generated text
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error', error });
    }
};
