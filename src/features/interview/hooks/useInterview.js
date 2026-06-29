import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router-dom";
import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
  generateResumePdf,
} from "../services/interview.api";

const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();
  if (!context) {
    throw new Error("useInterview must be used within an interviewProvider");
  }
  const { loading, setLoading, report, reports, setReport, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    let responce = null;
    try {
      responce = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(responce.interviewReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return responce.interviewReport;
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    let responce = null;
    try {
      responce = await getInterviewReportById(interviewId);
      setReport(responce.interviewReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    if (!responce) return null;
    return responce.interviewReport;
  };

  const getAllReports = async () => {
    setLoading(true);
    let responce = null;
    try {
      responce = await getAllInterviewReports();
      setReports(responce.interviewReports);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return responce.interviewReports;
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateResumePdf({ interviewReportId });
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getAllReports();
    }
  }, [interviewId]); // eslint-disable-line react-hooks/exhaustive-deps
  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getAllReports,
    getResumePdf,
  };
};

export default useInterview;
