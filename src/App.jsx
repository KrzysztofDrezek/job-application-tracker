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

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newApplication = {
      id: Date.now(),
      ...formData,
    };

    setApplications([newApplication, ...applications]);

    setFormData({
      company: "",
      jobTitle: "",
      dateApplied: "",
      status: "Applied",
      jobLink: "",
      notes: "",
      feedback: "",
    });
  }

  function handleDelete(id) {
    const updatedApplications = applications.filter(
      (application) => application.id !== id
    );

    setApplications(updatedApplications);
  }

  const filteredApplications =
    statusFilter === "All"
      ? applications
      : applications.filter((application) => application.status === statusFilter);

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
        <div>
          <p className="eyebrow">Portfolio Project</p>
          <h1>Job Application Tracker</h1>
          <p>
            Track your job applications, monitor responses and understand your
            job search progress.
          </p>
        </div>
      </section>

      <section className="dashboard">
        <article className="stat-card">
          <span>Total Applications</span>
          <strong>{totalApplications}</strong>
        </article>

        <article className="stat-card">
          <span>Interviews</span>
          <strong>{totalInterviews}</strong>
        </article>

        <article className="stat-card">
          <span>Rejected</span>
          <strong>{totalRejected}</strong>
        </article>

        <article className="stat-card">
          <span>Offers</span>
          <strong>{totalOffers}</strong>
        </article>

        <article className="stat-card highlight-card">
          <span>Response Rate</span>
          <strong>{responseRate}%</strong>
        </article>
      </section>

      <section className="layout">
        <form className="card form-card" onSubmit={handleSubmit}>
          <h2>Add Application</h2>

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

          <button type="submit">Add Application</button>
        </form>

        <section className="card chart-card">
          <h2>Applications by Status</h2>

          {statusChartData.length === 0 ? (
            <p className="empty-text">No data available for chart yet.</p>
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
              <p>Filter and review your job applications.</p>
            </div>
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

          {filteredApplications.length === 0 ? (
            <p className="empty-text">No applications found for this filter.</p>
          ) : (
            <div className="applications-list">
              {filteredApplications.map((application) => (
                <article className="application-item" key={application.id}>
                  <div>
                    <h3>{application.jobTitle}</h3>
                    <p>{application.company}</p>
                    <span>{application.dateApplied}</span>
                  </div>

                  <div className="application-actions">
                    <strong
                      className={`status ${application.status.toLowerCase()}`}
                    >
                      {application.status}
                    </strong>

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
    </main>
  );
}

export default App;