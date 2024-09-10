const express = require("express");
const { LocalStorage } = require("node-localstorage");
const app = express();
const PORT = 3000;

//Initialize LocalStorage

const localStorage = new LocalStorage("./scratch");

// Example of setting an item in LocalStorage
localStorage.setItem("key", "thing you are trying to save");

app.use(express.json());

// GET ROUTE to retrieve stored item
app.get("/item/:key", (req, res) => {
  let key = req.params.key;
  let storedItem = localStorage.getItem(key);
  if (storedItem) {
    res.json({ key: storedItem });
  } else {
    res.status(404).json({ error: `Item with key '${key}' not found` });
  }
});

// POST ROUTE to store an item
app.post("/item", (req, res) => {
  let key = req.body.key;
  let value = req.body.value;
  localStorage.setItem(key, value);
  res.json({ message: `Item with key '${key}' stored successfully` });
});

app.delete("/item/:key", (req, res) => {
  const key = req.params.key;
  const storedItem = localStorage.getItem(key);

  if (storedItem) {
    localStorage.removeItem(key);
    res.json({ message: `Item with key '${key}' deleted successfully` });
  } else {
    res.status(404).json({ error: `Item with key '${key}' not found` });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
    return;
  }
  console.log(`running express api at localhost:${PORT}`);
});
