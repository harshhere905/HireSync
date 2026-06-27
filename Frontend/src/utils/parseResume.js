// Utility to parse resume file — handles both PDF and DOCX
export const parseResumeText = async (file) => {
    if (!file?.buffer) {
        console.log("No file provided")
        return ""
    }

    console.log("Parsing file:", file.originalname, "| mimetype:", file.mimetype, "| size:", file.buffer.length)

    const isPdf = file.mimetype === "application/pdf" || file.originalname?.toLowerCase().endsWith(".pdf")
    const isDocx = file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        || file.originalname?.toLowerCase().endsWith(".docx")

    try {
        if (isDocx) {
            const mammoth = await import("mammoth")
            const result = await mammoth.default.extractRawText({ buffer: Buffer.from(file.buffer) })
            console.log("DOCX parsed, length:", result?.value?.length)
            return result?.value?.trim() || ""
        }

        if (isPdf) {
            // pdf-parse exports as CommonJS — use createRequire
            const { createRequire } = await import("module")
            const require = createRequire(import.meta.url)
            const pdfParse = require("pdf-parse")
            const data = await pdfParse(Buffer.from(file.buffer))
            console.log("PDF parsed, length:", data?.text?.length)
            return data?.text?.trim() || ""
        }

        console.log("Unknown file type")
        return ""

    } catch (err) {
        console.error("Parse error:", err.message)
        return ""
    }
}