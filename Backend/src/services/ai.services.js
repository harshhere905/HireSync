import { GoogleGenAI } from "@google/genai"
import puppeteer from "puppeteer"

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})
async function generateWithFallback(prompt) {
    const models = [
        "gemini-2.0-flash",
        "gemini-2.5-flash-lite",
        "gemini-2.5-flash"
    ];

    let lastError;

    for (const model of models) {
        try {
            console.log(`Trying model: ${model}`);

            const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        temperature: 0.3,
    },
});

            console.log(`Success with ${model}`);
            return response;
        } catch (error) {
            console.error(`Failed with ${model}:`, error);

            lastError = error;
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    throw lastError;
}

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

    const response = await generateWithFallback(prompt)

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
   const prompt = `
You are an expert resume writer and ATS optimization specialist with experience recruiting at top technology companies.

Create a professional, ATS-friendly resume tailored specifically to the provided job description.

CANDIDATE INFORMATION:
Resume: ${resume || "Not provided"}

Self Description:
${selfDescription || "Not provided"}

Target Job Description:
${jobDescription}

IMPORTANT REQUIREMENTS:

1. The resume must be tailored specifically to the target role.
2. Highlight only relevant skills, projects, technologies, and achievements.
3. Use strong action verbs and quantify achievements where possible.
4. The resume must look professional and modern while remaining ATS-friendly.
5. Include these sections when information is available:
   - Header (name, email, phone, links)
   - Professional Summary
   - Technical Skills
   - Experience
   - Projects
   - Education
   - Certifications
   - Achievements
6. Use clean HTML with embedded CSS.
7. The HTML must be completely self-contained.
8. Use professional typography and spacing.
9. The final resume should fit within 1-2 printed A4 pages.
10. Do NOT include placeholders like "Lorem Ipsum" or "[Your Name]".
11. Do NOT mention AI or that this resume was generated.
12. Escape all quotes properly to ensure valid JSON.

Return ONLY a valid JSON object in exactly this format:

{
  "html": "<!DOCTYPE html><html>...</html>"
}

HTML REQUIREMENTS:
- Include <!DOCTYPE html>
- Include <html>, <head>, and <body>
- Include CSS inside a <style> tag
- Use black, white, and subtle accent colors only
- Optimize for printing
- Avoid external CSS libraries
- Avoid JavaScript
- Ensure the HTML renders correctly in Puppeteer

Return ONLY valid JSON.
`;

    const response = await generateWithFallback(prompt)

    let text = response.text.trim()
    if (text.startsWith("```")) {
        text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim()
    }

    const { html } = JSON.parse(text)
    const pdfBuffer = await generatePdfFromHtml(html)
    return pdfBuffer
}

export { getInterviewReport, generateResumePdf }