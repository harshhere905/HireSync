import { GoogleGenAI } from "@google/genai"
import puppeteer from "puppeteer"

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

async function getInterviewReport({ title, resume, selfDescription, jobDescription }) {
    const prompt = `You are a senior technical recruiter and interview coach with 15 years at top tech companies like Google, Meta, Amazon.

Analyze this candidate and generate a HIGHLY SPECIFIC, NON-GENERIC interview preparation report.

JOB TITLE: ${title}
JOB DESCRIPTION: ${jobDescription}
RESUME: ${resume || "Not provided"}
SELF DESCRIPTION: ${selfDescription || "Not provided"}

CRITICAL RULES:

MATCH SCORE:
- Be brutally honest. Low match (30-50) if skills don't align. High (75-90) only if strong match.

TECHNICAL QUESTIONS (exactly 8):
- Each question must reference THIS candidate's specific tech stack or experience
- Questions must test deep understanding, not surface definitions
- Bad example: "What is React?"
- Good example: "You've used React hooks in your projects — explain how you'd handle race conditions in useEffect with async API calls"
- Include system design, debugging, and optimization questions relevant to the role

BEHAVIORAL QUESTIONS (exactly 5):
- Must be STAR-format worthy questions
- Reference the specific role and seniority level
- Bad: "Tell me about yourself"
- Good: "Describe a time you had to optimize a slow frontend feature under a tight deadline — what was your approach?"

SKILL GAPS:
- Only real gaps based on job requirements vs candidate profile
- Be specific: not "communication" but "Experience with WebSockets" or "Knowledge of CI/CD pipelines"

PREPARATION PLAN (exactly 10 days):
- Each day must have a focus, 3 specific tasks, AND real learning resources
- Resources must be actual URLs (MDN, official docs, YouTube, roadmap.sh, leetcode, etc)
- tasks array should have exactly 3 items per day

Return ONLY a valid JSON object with EXACTLY this structure:
{
  "title": "string",
  "matchScore": 65,
  "technicalQuestions": [
    { "question": "string", "intention": "string", "answer": "string" },
    { "question": "string", "intention": "string", "answer": "string" },
    { "question": "string", "intention": "string", "answer": "string" },
    { "question": "string", "intention": "string", "answer": "string" },
    { "question": "string", "intention": "string", "answer": "string" },
    { "question": "string", "intention": "string", "answer": "string" },
    { "question": "string", "intention": "string", "answer": "string" },
    { "question": "string", "intention": "string", "answer": "string" }
  ],
  "behavioralQuestions": [
    { "question": "string", "intention": "string", "answer": "string" },
    { "question": "string", "intention": "string", "answer": "string" },
    { "question": "string", "intention": "string", "answer": "string" },
    { "question": "string", "intention": "string", "answer": "string" },
    { "question": "string", "intention": "string", "answer": "string" }
  ],
  "skillGaps": [
    { "skill": "string", "severity": "high" },
    { "skill": "string", "severity": "medium" },
    { "skill": "string", "severity": "low" }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "string",
      "tasks": ["task1", "task2", "task3"],
      "resources": [
        { "title": "string", "url": "https://..." }
      ]
    },
    {
      "day": 2,
      "focus": "string",
      "tasks": ["task1", "task2", "task3"],
      "resources": [
        { "title": "string", "url": "https://..." }
      ]
    },
    {
      "day": 3,
      "focus": "string",
      "tasks": ["task1", "task2", "task3"],
      "resources": [
        { "title": "string", "url": "https://..." }
      ]
    },
    {
      "day": 4,
      "focus": "string",
      "tasks": ["task1", "task2", "task3"],
      "resources": [
        { "title": "string", "url": "https://..." }
      ]
    },
    {
      "day": 5,
      "focus": "string",
      "tasks": ["task1", "task2", "task3"],
      "resources": [
        { "title": "string", "url": "https://..." }
      ]
    },
    {
      "day": 6,
      "focus": "string",
      "tasks": ["task1", "task2", "task3"],
      "resources": [
        { "title": "string", "url": "https://..." }
      ]
    },
    {
      "day": 7,
      "focus": "string",
      "tasks": ["task1", "task2", "task3"],
      "resources": [
        { "title": "string", "url": "https://..." }
      ]
    },
    {
      "day": 8,
      "focus": "string",
      "tasks": ["task1", "task2", "task3"],
      "resources": [
        { "title": "string", "url": "https://..." }
      ]
    },
    {
      "day": 9,
      "focus": "string",
      "tasks": ["task1", "task2", "task3"],
      "resources": [
        { "title": "string", "url": "https://..." }
      ]
    },
    {
      "day": 10,
      "focus": "string",
      "tasks": ["task1", "task2", "task3"],
      "resources": [
        { "title": "string", "url": "https://..." }
      ]
    }
  ]
}

IMPORTANT:
- All arrays must contain OBJECTS not strings
- severity must be exactly one of: "low", "medium", "high"
- day must be a number
- tasks must be array of exactly 3 strings
- resources must be array of objects with title and url fields
- Return ONLY the JSON, no markdown, no explanation`

    console.log("Calling Gemini API for interview report...")

    const response = await ai.models.generateContent({
        model: "gemini-3.0-flash",
        contents: prompt,
    })

    let text = response.text.trim()
    if (text.startsWith("```")) {
        text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim()
    }

    const parsed = JSON.parse(text)
    console.log("matchScore:", parsed.matchScore)
    console.log("technicalQuestions:", parsed.technicalQuestions?.length)
    console.log("behavioralQuestions:", parsed.behavioralQuestions?.length)

    return parsed
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })
    const page = await browser.newPage()
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
            top: "10mm",
            bottom: "10mm",
            left: "10mm",
            right: "10mm"
        }
    })

    await browser.close()
    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const prompt = `You are an expert resume writer and ATS specialist.

Create a professional, tailored resume for this candidate:
Resume/Experience: ${resume || "Not provided"}
Self Description: ${selfDescription || "Not provided"}
Job Description: ${jobDescription}

STRICT RULES:
- Return ONLY a JSON object with a single "html" field
- The HTML must fit on a SINGLE PAGE (A4) when printed — no overflow at all
- Use compact spacing, body font 11px, name 18px, section headers 13px
- NO generic buzzwords: no "passionate", "motivated", "team player", "hardworking", "dynamic"
- Action verbs only: Built, Developed, Optimized, Led, Implemented, Designed, Reduced, Increased
- Tailor EVERY bullet point to match the job description keywords
- Sections order: Header (name, email, phone, github/linkedin) → Summary (2 lines max) → Skills → Experience → Projects → Education
- Skills: only list skills relevant to the job description
- Each bullet: action verb + what you did + impact/metric if possible
- CSS must include: body { margin: 0; padding: 16px; font-family: Arial, sans-serif; font-size: 11px; color: #111; }
- Use only one accent color #4f46e5 for name and section headers
- No borders except subtle hr lines between sections
- Return ONLY the JSON object, no markdown, no explanation`

    const response = await ai.models.generateContent({
        model: "gemini-3.0-flash",
        contents: prompt,
    })

    let text = response.text.trim()
    if (text.startsWith("```")) {
        text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim()
    }

    const { html } = JSON.parse(text)
    const pdfBuffer = await generatePdfFromHtml(html)
    return pdfBuffer
}

export { getInterviewReport, generateResumePdf }