// For local testing with ngrok
fetch("https://unforetold-tropological-rachell.ngrok-free.dev/getlocation", {
  method: "POST", // or GET depending on your backend
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({ key1: "value1" }).toString(),
})
  .then(res => res.text())
  .then(data => console.log(data))
  .catch(err => console.error(err));
