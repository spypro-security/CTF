import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import EnrollForm from "./EnrollForm";
import workshopFolders from "../config/workshopFolders";

const WorkshopCurriculum = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sourceFromQuery = searchParams.get("source") || "";
  const sourceWorkshop = location?.state?.title || sourceFromQuery || "";

  // PDF modal state for listing files from public folders
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [pdfFolder, setPdfFolder] = useState("");

  // Dynamic mapping using centralized config `src/config/workshopFolders.js`
  const getAction = (type, cardKey) => {
    // match source workshop title robustly (case/whitespace insensitive)
    const normalizedSource = (sourceWorkshop || "").toLowerCase().trim();
    const sourceKey = Object.keys(workshopFolders).find(
      (k) => (k || "").toLowerCase().trim() === normalizedSource
    );
    const mapping = sourceKey ? workshopFolders[sourceKey]?.[type] : undefined;

    if (!sourceKey && sourceWorkshop) {
      // Not a fatal error, but warn to help debugging when mappings aren't picked up
      // eslint-disable-next-line no-console
      console.warn(`No workshop mapping found for "${sourceWorkshop}"`);
    }

    const entry = mapping?.[cardKey];
    if (entry) {
      // Allow either a string path or an object { path, files }
      if (typeof entry === "string") {
        return { type: "folder", path: entry };
      }
      return { type: "folder", path: entry.path, files: entry.files };
    }

    // Fallback links when no special folder is configured
    if (type === "software") {
      return {
        type: "link",
        path: cardKey === "5-days" ? "/Software%20Solutions/index.html" : "/3-day-software.html",
      };
    }

    return {
      type: "link",
      path: cardKey === "5-days" ? "/Core%20Solutions/index.html" : "/3-day-core.html",
    };
  };

  const openSoftwarePdfs = async (action) => {
    // action may be a string path or an object { path, files }
    const folder = typeof action === "string" ? action : action.path;
    const configuredFiles = action && action.files;

    // Debug
    // eslint-disable-next-line no-console
    console.debug("openSoftwarePdfs called", { sourceWorkshop, folder, hasConfigured: !!configuredFiles });

    // If there are files provided in config, use them directly
    if (configuredFiles && configuredFiles.length) {
      setPdfFiles(configuredFiles);
      setPdfFolder(folder);
      setShowPdfModal(true);
      return;
    }

    const fallback = folder.toLowerCase().includes("5 day")
      ? "/Software%20Solutions/index.html"
      : "/3-day-software.html";

    // Only allow folder modal flow for CyberSecurity Workshop; otherwise open fallback links
    if (sourceWorkshop !== "CyberSecurity Workshop") {
      window.open(`${window.location.origin}${fallback}`, "_blank");
      return;
    }

    // clear previous state
    setPdfFiles([]);
    setPdfFolder("");

    const jsonUrl = `${encodeURI(folder)}/files.json`;
    try {
      const res = await fetch(jsonUrl);
      if (!res.ok) {
        // If server doesn't return JSON listing, open the fallback software page instead of the folder
        window.open(`${window.location.origin}${fallback}`, "_blank");
        return;
      }
      const files = await res.json();
      setPdfFiles(files);
      setPdfFolder(folder);
      setShowPdfModal(true);
    } catch (e) {
      // Fetch failed -> open fallback software page
      window.open(`${window.location.origin}${fallback}`, "_blank");
    }
  };

  // open core PDFs similarly (guarded for IoT Integrated with AI)
  const openCorePdfs = async (action) => {
    // action may be a string path or an object { path, files }
    const folder = typeof action === "string" ? action : action.path;
    const configuredFiles = action && action.files;

    // Debug
    // eslint-disable-next-line no-console
    console.debug("openCorePdfs called", { sourceWorkshop, folder, hasConfigured: !!configuredFiles });

    // If there are files provided in config, use them directly
    if (configuredFiles && configuredFiles.length) {
      setPdfFiles(configuredFiles);
      setPdfFolder(folder);
      setShowPdfModal(true);
      return;
    }

    const fallback = folder.toLowerCase().includes("5 day")
      ? "/Core%20Solutions/index.html"
      : "/3-day-core.html";

    // Only allow folder modal flow for IoT Integrated with AI Workshop; otherwise open fallback links
    if (sourceWorkshop !== "IoT Integrated with AI Workshop") {
      window.open(`${window.location.origin}${fallback}`, "_blank");
      return;
    }

    // clear previous state
    setPdfFiles([]);
    setPdfFolder("");

    const jsonUrl = `${encodeURI(folder)}/files.json`;
    try {
      const res = await fetch(jsonUrl);
      if (!res.ok) {
        // If server doesn't return JSON listing, open the fallback core page instead of the folder
        window.open(`${window.location.origin}${fallback}`, "_blank");
        return;
      }
      const files = await res.json();
      setPdfFiles(files);
      setPdfFolder(folder);
      setShowPdfModal(true);
    } catch (e) {
      // Fetch failed -> open fallback core page
      window.open(`${window.location.origin}${fallback}`, "_blank");
    }
  };

  // Friendly modal title based on selected folder
  const lower = pdfFolder.toLowerCase();
  const modalTitle = lower.includes("3 day")
    ? (lower.includes("core") ? "3-Day Core PDFs" : "3-Day Software PDFs")
    : lower.includes("5 day")
    ? (lower.includes("core") ? "5-Day Core PDFs" : "5-Day Software PDFs")
    : "Workshop PDFs";

  const handleEnrollClick = (workshopType) => {
    setSelectedWorkshop(workshopType);
    setShowForm(true);
  }; 

  return (
    <>
      {/* CSS inside same file */}
      <style>{`
        .workshop-container {
          padding: 40px;
          background: #f7f9fc;
          min-height: 100vh;
        }
        .title {
          text-align: center;
          font-size: 32px;
          color: #5b5be0;
          margin-bottom: 40px;
        }
        .cards {
          display: flex;
          gap: 30px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .card {
          background: #fff;
          padding: 30px;
          border-radius: 16px;
          width: 420px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
        .pdf-title {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 20px;
          color: #444;
        }
        .button-group {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }
        .btn {
          background: #6366f1;
          color: #fff;
          border: none;
          padding: 12px 18px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          text-decoration: none;
          text-align: center;
        }
        .btn:hover {
          background: #4f46e5;
        }
        .btn.outline {
          background: #fff;
          color: #6366f1;
          border: 2px solid #6366f1;
        }
        .btn.outline:hover {
          background: #eef2ff;
        }
        .btn.full {
          width: 100%;
          margin-top: 20px;
        }
      `}</style>

      <div className="workshop-container">
        <h1 className="title">Workshop Curriculum</h1>

        <div className="cards">
          {/* 5 Days Workshop */}
          <div className="card">
            <h2>📘 5 Days Workshop</h2>
            <p className="pdf-title">
              Core & Software Solutions Workshop Program
            </p>

            <div className="button-group">
              {(() => {
                if (sourceWorkshop === "CyberSecurity Workshop") return null;
                const action = getAction("core", "5-days");
                if (action.type === "folder") {
                  return (
                    <button
                      className="btn"
                      onClick={() => openCorePdfs(action)}
                    >
                      Core Workshop PDF
                    </button>
                  );
                }
                return (
                  <a
                    href={action.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    Core Workshop PDF
                  </a>
                );
              })()}

              {(() => {
                const action = getAction("software", "5-days");
                if (action.type === "folder") {
                  return (
                    <button
                      className="btn outline"
                      onClick={() => openSoftwarePdfs(action)}
                    >
                      Software Workshop PDF
                    </button>
                  );
                }

                return (
                  <a
                    href={action.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn outline"
                  >
                    Software Workshop PDF
                  </a>
                );
              })()} 

              <button
                className="btn full"
                onClick={() => handleEnrollClick("5 Days")}
              >
                Enroll for 5 Days
              </button>
            </div>
          </div>

          {/* 3 Days Workshop */}
          <div className="card">
            <h2>📗 3 Days Workshop</h2>
            <p className="pdf-title">
              Core & Software Solutions Workshop Program
            </p>

            <div className="button-group">
              {(() => {
                if (sourceWorkshop === "CyberSecurity Workshop") return null;
                const action = getAction("core", "3-days");
                if (action.type === "folder") {
                  return (
                    <button
                      className="btn"
                      onClick={() => openCorePdfs(action)}
                    >
                      Core Workshop PDF
                    </button>
                  );
                }
                return (
                  <a
                    href={action.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    Core Workshop PDF
                  </a>
                );
              })()}

              {(() => {
                const action = getAction("software", "3-days");
                if (action.type === "folder") {
                  return (
                    <button
                      className="btn outline"
                      onClick={() => openSoftwarePdfs(action)}
                    >
                      Software Workshop PDF
                    </button>
                  );
                }

                return (
                  <a
                    href={action.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn outline"
                  >
                    Software Workshop PDF
                  </a>
                );
              })()} 

              <button
                className="btn full"
                onClick={() => handleEnrollClick("3 Days")}
              >
                Enroll for 3 Days
              </button>
            </div>
          </div>
        </div>

        {/* Enroll Form Modal */}
        {showForm && (
          <EnrollForm
            workshopType={selectedWorkshop}
            onClose={() => setShowForm(false)}
          />
        )}

        {/* PDF listing modal (for showing folder PDFs) */}
        {showPdfModal && (
          <div className="pdf-modal-overlay" onClick={() => setShowPdfModal(false)}>
            <div className="pdf-modal" onClick={(e) => e.stopPropagation()}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h3>{modalTitle}</h3>
                <button
                  className="btn outline"
                  onClick={() => {
                    setShowPdfModal(false);
                    setPdfFiles([]);
                    setPdfFolder("");
                  }}
                >
                  Close
                </button>
              </div>

              <ul style={{listStyle: 'none', padding: 0, marginTop: 12}}>
                {pdfFiles.length ? (
                  pdfFiles.map((f, i) => (
                    <li key={i} style={{marginBottom: 10}}>
                      <a
                        href={`${encodeURI(pdfFolder)}/${encodeURIComponent(f.file || f)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{background: 'transparent', color: '#4f46e5', padding: 0, border: 'none', textDecoration: 'underline'}}
                      >
                        {f.name || f}
                      </a>
                    </li>
                  ))
                ) : (
                  <li>No files found.</li>
                )}
              </ul>
            </div>
          </div>
        )}

        <style>{`
          .pdf-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          .pdf-modal {
            background: #fff;
            padding: 20px;
            border-radius: 12px;
            max-width: 720px;
            width: 90%;
            box-shadow: 0 25px 50px rgba(0,0,0,0.2);
          }
        `}</style>
      </div>
    </>
  );
};

export default WorkshopCurriculum;
