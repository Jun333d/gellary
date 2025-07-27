// /netlify/functions/list-images.js

export async function handler() {
  const API_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

  const res = await fetch("https://api.imagekit.io/v1/files?path=%2Fimages", {
    headers: {
      Authorization: "Basic " + Buffer.from(`${API_KEY}:`).toString("base64"),
    },
  });

  if (!res.ok) {
    return {
      statusCode: res.status,
      body: JSON.stringify({ error: "Failed to fetch images." }),
    };
  }

  const data = await res.json();
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
}
