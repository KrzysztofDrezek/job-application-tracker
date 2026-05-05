import express from "express";
import cors from "cors";
import db from "./database.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/applications", (req, res) => {
  db.all("SELECT * FROM applications", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

app.post("/api/applications", (req, res) => {
  const {
    company,
    jobTitle,
    dateApplied,
    status,
    jobLink,
    notes,
    feedback,
  } = req.body;

  const sql = `
    INSERT INTO applications 
    (company, jobTitle, dateApplied, status, jobLink, notes, feedback)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [company, jobTitle, dateApplied, status, jobLink, notes, feedback],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        id: this.lastID,
        company,
        jobTitle,
        dateApplied,
        status,
        jobLink,
        notes,
        feedback,
      });
    }
  );
});

app.put("/api/applications/:id", (req, res) => {
  const { id } = req.params;

  const {
    company,
    jobTitle,
    dateApplied,
    status,
    jobLink,
    notes,
    feedback,
  } = req.body;

  const sql = `
    UPDATE applications
    SET company = ?, jobTitle = ?, dateApplied = ?, status = ?, jobLink = ?, notes = ?, feedback = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [company, jobTitle, dateApplied, status, jobLink, notes, feedback, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        id: Number(id),
        company,
        jobTitle,
        dateApplied,
        status,
        jobLink,
        notes,
        feedback,
      });
    }
  );
});

app.delete("/api/applications/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM applications WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Deleted successfully", id: Number(id) });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});