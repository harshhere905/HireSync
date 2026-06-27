import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  generateResumePdf,
  deleteInterviewReport,
} from "../services/interview.api.js";

import { useContext } from "react";
import { InterviewContext } from "../../interview/interview.context.jsx";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } = context;

  const generateReport = async ({ title, jobDescription, selfDescription, resumeFile }) => {
    setLoading(true);
    try {
      const response = await generateInterviewReport({ title, jobDescription, selfDescription, resumeFile });
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (error) {
      console.log("HOOK ERROR:", error);
      console.log("SERVER ERROR:", error?.response?.data);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (id) => {
    setLoading(true);
    try {
      const response = await getInterviewReportById(id);
      setReport(response.report);
      return response.report;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getReports = async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      setReports(response.reports);
      return response.reports;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (id) => {
    try {
      await deleteInterviewReport({ interviewId: id });
      setReports((prev) => prev.filter((r) => r._id !== id));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    try {
      const response = await generateResumePdf({ interviewReportId });
      const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fix: useEffect REMOVED from hook
  // Interview.jsx aur Home.jsx khud apne useEffect se call karenge
  // Hook mein useEffect hone se double fetch + state clash hota tha

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    deleteReport,
    getResumePdf,
  };
};