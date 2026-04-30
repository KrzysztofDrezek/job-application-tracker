import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./App.css";

function App() {
  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem("jobApplications");

    if (savedApplications) {
      return JSON.parse(savedApplications);
    }

    return [];
  });

  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingApplicationId, setEditingApplicationId] = useState(null);

  const [formData, setFormData] = useState({
    company: "",
    jobTitle: "",
    dateApplied: "",
    status: "Applied",
    jobLink: "",
    notes: "",
    feedback: "",
  });

  useEffect(() => {
    localStorage.setItem("jobApplications", JSON.stringify(applications));
  }, [applications]);

  function resetForm() {
    setFormData({
      company: "",
      jobTitle: "",
      dateApplied: "",
      status: "Applied",
      jobLink: "",
      notes: "",
      feedback: "",
    });

    setEditingApplicationId(null);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (editingApplicationId) {
      const updatedApplications = applications.map((application) => {
        if (application.id === editingApplicationId) {
          return {
            ...application,
            ...formData,
          };
        }

        return application;
      });

      setApplications(updatedApplications);
      resetForm();
      return;
    }

    const newApplication = {
      id: Date.now(),
      ...formData,
    };

    setApplications([newApplication, ...applications]);
    resetForm();
  }

  function handleEdit(application) {
    setEditingApplicationId(application.id);

    setFormData({
      company: application.company,
      jobTitle: application.jobTitle,
      dateApplied: application.dateApplied,
      status: application.status,
      jobLink: application.jobLink,
      notes: application.notes,
      feedback: application.feedback,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleDelete(id) {
    const updatedApplications = applications.filter(
      (application) => application.id !== id
    );

    setApplications(updatedApplications);

    if (editingApplicationId === id) {
      resetForm();
    }
  }

  function handleExportCSV() {
    if (applications.length === 0) {
      alert("There are no applications to export.");
      return;
    }

    const headers = [
      "Company",
      "Job Title",
      "Date Applied",
      "Status",
      "Job Link",
      "Notes",
      "Feedback",
    ];

    const rows = applications.map((application) => [
      application.company,
      application.jobTitle,
      application.dateApplied,
      application.status,
      application.jobLink,
      application.notes,
      application.feedback,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => {
            const safeValue = String(value || "").replace(/"/g, '""');
            return `"${safeValue}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");

    downloadLink.href = url;
    downloadLink.download = "job-applications.csv";
    downloadLink.click();

    URL.revokeObjectURL(url);
  }

  const filteredApplications = applications.filter((application) => {
    const matchesStatus =
      statusFilter === "All" || application.status === statusFilter;

    const searchValue = searchTerm.toLowerCase();

    const matchesSearch =
      application.company.toLowerCase().includes(searchValue) ||
      application.jobTitle.toLowerCase().includes(searchValue) ||
      application.notes.toLowerCase().includes(searchValue) ||
      application.feedback.toLowerCase().includes(searchValue);

    return matchesStatus && matchesSearch;
  });

  const totalApplications = applications.length;

  const totalInterviews = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const totalRejected = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  const totalOffers = applications.filter(
    (application) => application.status === "Offer"
  ).length;

  const responseRate =
    totalApplications === 0
      ? 0
      : Math.round(((totalInterviews + totalOffers) / totalApplications) * 100);

  const statusChartData = [
    {
      name: "Applied",
      value: applications.filter((app) => app.status === "Applied").length,
    },
    {
      name: "Interview",
      value: totalInterviews,
    },
    {
      name: "Rejected",
      value: totalRejected,
    },
    {
      name: "Offer",
      value: totalOffers,
    },
  ].filter((item) => item.value > 0);

  const statusColors = {
    Applied: "#2563eb",
    Interview: "#f59e0b",
    Rejected: "#ef4444",
    Offer: "#22c55e",
  };

  return (
    <main className="app">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Portfolio Project</p>
          <h1>Job Application Tracker</h1>
          <p>
            A React application for tracking job applications, monitoring
            responses, analysing progress and exporting application data.
          </p>

          <div className="tech-stack">
            <span>React</span>
            <span>localStorage</span>
            <span>Recharts</span>
            <span>CSV Export</span>
          </div>
        </div>

        <div className="hero-panel">
          <span>Current response rate</span>
          <strong>{responseRate}%</strong>
          <p>
            Based on applications that reached interview or offer stage.
          </p>
        </div>
      </section>

      <section className="dashboard">
        <article className="stat-card">
          <span>Total Applications</span>
          <strong>{totalApplications}</strong>
          <p>All saved job applications</p>
        </article>

        <article className="stat-card">
          <span>Interviews</span>
          <strong>{totalInterviews}</strong>
          <p>Applications moved to interview</p>
        </article>

        <article className="stat-card">
          <span>Rejected</span>
          <strong>{totalRejected}</strong>
          <p>Rejected applications</p>
        </article>

        <article className="stat-card">
          <span>Offers</span>
          <strong>{totalOffers}</strong>
          <p>Successful outcomes</p>
        </article>

        <article className="stat-card highlight-card">
          <span>Response Rate</span>
          <strong>{responseRate}%</strong>
          <p>Interview + offer ratio</p>
        </article>
      </section>

      <section className="layout">
        <form className="card form-card" onSubmit={handleSubmit}>
          <div className="form-title-row">
            <div>
              <h2>
                {editingApplicationId ? "Edit Application" : "Add Application"}
              </h2>
              <p>
                {editingApplicationId
                  ? "Update the selected job application."
                  : "Save a new job application to your tracker."}
              </p>
            </div>

            {editingApplicationId && (
              <span className="editing-badge">Editing</span>
            )}
          </div>

          <label>
            Company
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. The Guardian"
              required
            />
          </label>

          <label>
            Job Title
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Junior Data Analyst"
              required
            />
          </label>

          <label>
            Date Applied
            <input
              type="date"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Status
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </label>

          <label>
            Job Link
            <input
              type="url"
              name="jobLink"
              value={formData.jobLink}
              onChange={handleChange}
              placeholder="https://example.com/job"
            />
          </label>

          <label>
            Notes
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add notes about this application"
            />
          </label>

          <label>
            Feedback
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Add feedback if received"
            />
          </label>

          <div className="form-buttons">
            <button type="submit">
              {editingApplicationId ? "Update Application" : "Add Application"}
            </button>

            {editingApplicationId && (
              <button
                className="cancel-button"
                type="button"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <section className="card chart-card">
          <div className="section-title">
            <h2>Applications by Status</h2>
            <p>Visual breakdown of your current application pipeline.</p>
          </div>

          {statusChartData.length === 0 ? (
            <div className="empty-state">
              <strong>No chart data yet</strong>
              <p>Add your first job application to generate analytics.</p>
            </div>
          ) : (
            <>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      label
                    >
                      {statusChartData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={statusColors[entry.name]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-legend">
                {statusChartData.map((item) => (
                  <div className="legend-item" key={item.name}>
                    <span
                      className="legend-color"
                      style={{ backgroundColor: statusColors[item.name] }}
                    ></span>
                    {item.name}: {item.value}
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        <section className="card list-card">
          <div className="section-header">
            <div>
              <h2>Applications</h2>
              <p>Search, filter, review and export your job applications.</p>
            </div>

            <button
              className="export-button"
              type="button"
              onClick={handleExportCSV}
            >
              Export CSV
            </button>
          </div>

          <div className="search-box">
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by company, role, notes or feedback..."
            />
          </div>

          <div className="filters">
            {["All", "Applied", "Interview", "Rejected", "Offer"].map(
              (status) => (
                <button
                  key={status}
                  type="button"
                  className={`filter-button ${
                    statusFilter === status ? "active-filter" : ""
                  }`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              )
            )}
          </div>

          <p className="results-count">
            Showing {filteredApplications.length} of {applications.length}{" "}
            applications
          </p>

          {filteredApplications.length === 0 ? (
            <div className="empty-state">
              <strong>No applications found</strong>
              <p>
                Add a new application or adjust your search and filter options.
              </p>
            </div>
          ) : (
            <div className="applications-list">
              {filteredApplications.map((application) => (
                <article className="application-item" key={application.id}>
                  <div className="application-main">
                    <div className="application-top">
                      <div>
                        <h3>{application.jobTitle}</h3>
                        <p>{application.company}</p>
                        <span>{application.dateApplied}</span>
                      </div>

                      <strong
                        className={`status ${application.status.toLowerCase()}`}
                      >
                        {application.status}
                      </strong>
                    </div>

                    <div className="application-details">
                      {application.jobLink && (
                        <a
                          href={application.jobLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View job advert
                        </a>
                      )}

                      {application.notes && (
                        <div className="detail-block">
                          <strong>Notes</strong>
                          <p>{application.notes}</p>
                        </div>
                      )}

                      {application.feedback && (
                        <div className="detail-block">
                          <strong>Feedback</strong>
                          <p>{application.feedback}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="application-actions">
                    <button
                      className="edit-button"
                      type="button"
                      onClick={() => handleEdit(application)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => handleDelete(application.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>

      <footer className="footer">
        <p>
          Built as a portfolio project using React, localStorage, Recharts and
          CSV export.
        </p>
      </footer>
    </main>
  );
}

export default App;