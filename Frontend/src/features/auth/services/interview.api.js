import axios from "axios";

const api = axios.create({
    baseURL: "https://5fac-2405-201-680a-f03e-1d59-f218-5d25-b2c5.ngrok-free.app",
    withCredentials: true,
})

export const generateInterviewReport = async ({title, jobDescription, selfDescription, resumeFile }) => {

    const formData = new FormData()
    formData.append("title", title)
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resumeFile)

    const response = await api.post("/api/v1/interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data

}

export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/v1/interview/report/${interviewId}`)
    return response.data
}

export const getAllInterviewReports = async () => {
    const response = await api.get("/api/v1/interview/reports")

    return response.data
}

export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.post(`/api/v1/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })

    return response.data
}

export const deleteInterviewReport = async ({ interviewId }) => {
    const response = await api.delete(`/api/v1/interview/report/${interviewId}`)
    return response.data
}