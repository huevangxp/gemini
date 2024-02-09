require("dotenv").config()

// const multer = require('multer')
const { GoogleGenerativeAI } = require("@google/generative-ai")

// use multer

// const upload = multer({ storage: multer.memoryStorage() });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY)

const fileToGenerativePart = (imageData, mimeType) => {
  return {
    inlineData: {
      data: imageData,
      mimeType,
    },
  }
}

exports.imagePrompt = async (req, res) => {
  try {

    const file = req.file
    const { prompt } = req.body;
    // console.log();
    if (!file) {
      return res.status(400).send("No file uploaded.")
    }
  
    if (!prompt) {
      return res.status(400).send("No prompt.")
    }
  


    const imageData = file.buffer.toString("base64")
    const mimeType = file.mimetype

    // console.log({fileData, fileMimetype});

    if (!prompt) {
      return res.status(404).json({ message: 'No Data' })
    }
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" })
    const imageParts = [fileToGenerativePart(imageData, mimeType)]
    const result = await model.generateContent([prompt, ...imageParts])
    // const response = await result.response
    // const text = response.text()
    return res.status(200).json({message:"Success", result})
  } catch (error) {
    return res.status(500).json({ message: 'Error', error })
  }
}

