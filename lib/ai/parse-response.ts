export function parseAIResponse(text: string) {
  try {
    let cleanedText = text.trim()

    const jsonMatch =
      cleanedText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) ||
      cleanedText.match(/{[\s\S]*}/)

    if (jsonMatch) {
      cleanedText = (jsonMatch[1] || jsonMatch[0]).trim()
    }

    return JSON.parse(cleanedText)
  } catch (error: unknown) {
    console.error(
      "JSON Parse Error Details:",
      error instanceof Error ? error.message : String(error),
      "Original Text snippet:",
      text.substring(0, 100),
    )
    try {
      const firstBrace = text.indexOf("{")
      const lastBrace = text.lastIndexOf("}")
      if (firstBrace !== -1 && lastBrace !== -1) {
        const fallbackClean = text.substring(firstBrace, lastBrace + 1)
        return JSON.parse(fallbackClean)
      }
    } catch {
      console.error("Aggressive JSON cleanup failed too")
    }
    throw new Error(
      `Failed to parse system response: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
