import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  const data = req.body;
  const filePath = path.resolve("./public/results.json");

  let results = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
    try {
      results = JSON.parse(fileData);
    } catch {
      results = [];
    }
  }

  results.push(data);
  fs.writeFileSync(filePath, JSON.stringify(results, null, 2));

  res.status(200).send("Saved");
}
