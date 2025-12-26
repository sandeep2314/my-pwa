export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const backendRes = await fetch("https://103.165.119.119:8082/getstaff", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: req.body,
  });

  const text = await backendRes.text();
  res.status(200).send(text);
}
