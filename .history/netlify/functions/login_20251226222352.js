export async function handler(event, context) {
  // Allow requests from any origin
  const headers = {
    "Access-Control-Allow-Origin": "*", // allows all origins
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method not allowed. Use POST." }),
    };
  }

  // Safely parse JSON
  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: "Invalid JSON" }),
    };
  }

  // Simple login check
  const response = data.username === "admin" && data.password === "1234"
    ? { statusCode: 200, body: JSON.stringify({ message: "Login successful" }) }
    : { statusCode: 401, body: JSON.stringify({ message: "Invalid credentials" }) };

  // Include CORS headers
  return { ...response, headers };
}
