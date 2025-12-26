export async function handler(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405, // Method Not Allowed
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
      body: JSON.stringify({ message: "Invalid JSON" }),
    };
  }

  // Simple login check
  if (data.username === "admin" && data.password === "1234") {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Login successful" }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Invalid credentials" }),
    };
  }
}
