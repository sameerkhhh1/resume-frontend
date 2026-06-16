const { useState, createContext } = require("react");

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);

  return (
    <InterviewContext.Provider
      value={{ loading, setLoading, setReport, report, setReports, reports }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
