import config from "./config";

async function login(form) {
  const response = await fetch(`${config.apiUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
}

export { login };