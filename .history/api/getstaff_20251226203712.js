export default async function handler(req, res) {
  // Accept both GET (for testing) and POST (for real requests)
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Prepare body for backend request
  const body = req.method === "POST" ? req.body : "";

  try {
    const backendRes = await fetch("https://103.165.119.119:8082/getstaff", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    });

    const text = await backendRes.text();
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: "Backend fetch failed", details: err.message });
  }
}
