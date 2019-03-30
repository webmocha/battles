const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const path = req.path;
  const npmPath = path.replace("/api/npm/", "");
  const npmUrl = `https://api.npmjs.org/${npmPath}`;
  try {
    const response = await fetch(npmUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(400).send("Invalid request");
  }
};
