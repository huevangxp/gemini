


const chatHistoryPrompt = async (prompt, history) => {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
  
    const chat = model.startChat({
      history
    })
  
    const result = await chat.sendMessage(prompt)
    const response = await result.response
    const text = response.text()
    return text
  }