const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const data = require("./data");
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

//direct routing as the functionality is limited in this case
// Create a new entry
app.post("/donations", (req, res) => {
  try {
    const newDonation = req.body;
    if (!newDonation.name || !newDonation.donationType || !newDonation.date) {
      return res.status(400).send({ message: "Missing required fields" });
    }
    newDonation.id = data.length ? data[data.length - 1].id + 1 : 1;
    data.push(newDonation);
    res.status(201).send(newDonation);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

// Read all
app.get("/donations", (req, res) => {
  try {
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

// Read one by id
app.get("/donations/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }
    const donation = data.find((d) => d.id === id);
    if (donation) {
      res.send(donation);
    } else {
      res.status(404).send({ message: "Donation not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

// Full Update (PUT)
app.put("/donations/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }
    const index = data.findIndex((d) => d.id === id);
    if (index !== -1) {
      data[index] = { id, ...req.body };
      res.send(data[index]);
    } else {
      res.status(404).send({ message: "Donation not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

// Partial Update (PATCH)
app.patch("/donations/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }
    const index = data.findIndex((d) => d.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...req.body };
      res.send(data[index]);
    } else {
      res.status(404).send({ message: "Donation not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

// Delete
app.delete("/donations/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }
    const index = data.findIndex((d) => d.id === id);
    if (index !== -1) {
      const deletedDonation = data.splice(index, 1);
      res.send(deletedDonation[0]);
    } else {
      res.status(404).send({ message: "Donation not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!", error: err });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
