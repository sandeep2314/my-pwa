export async function handler(event, context) {
  const data = JSON.parse(event.body);

  // simple fake login check
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
