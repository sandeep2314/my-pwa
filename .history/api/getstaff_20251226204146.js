export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const backendRes = await fetch(
      "https://unforetold-tropological-rachell.ngrok-free.dev/getstaff",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: req.body,
      }
    );

    const text = await backendRes.text();
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: "Backend fetch failed", details: err.message });
  }
}
