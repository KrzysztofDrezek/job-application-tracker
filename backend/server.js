import process from "node:process";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "./database.js";

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Job Application Tracker API is running");
});

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [name, email, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ error: "User already exists" });
    }

    const token = jwt.sign(
      { id: this.lastID, name, email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: this.lastID,
        name,
        email,
      },
    });
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.get(sql, [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
});

app.get("/api/auth/me", verifyToken, (req, res) => {
  res.json({
    user: req.user,
  });
});

app.get("/api/applications", verifyToken, (req, res) => {
  db.all(
    "SELECT * FROM applications WHERE userId = ? ORDER BY dateApplied DESC",
    [req.user.id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json(rows);
    }
  );
});

app.post("/api/applications", verifyToken, (req, res) => {
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
    (userId, company, jobTitle, dateApplied, status, jobLink, notes, feedback)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      req.user.id,
      company,
      jobTitle,
      dateApplied,
      status,
      jobLink,
      notes,
      feedback,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        id: this.lastID,
        userId: req.user.id,
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

app.put("/api/applications/:id", verifyToken, (req, res) => {
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
    WHERE id = ? AND userId = ?
  `;

  db.run(
    sql,
    [
      company,
      jobTitle,
      dateApplied,
      status,
      jobLink,
      notes,
      feedback,
      id,
      req.user.id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        id: Number(id),
        userId: req.user.id,
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

app.delete("/api/applications/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM applications WHERE id = ? AND userId = ?",
    [id, req.user.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ message: "Deleted successfully", id: Number(id) });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});