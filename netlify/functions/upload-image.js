// /netlify/functions/upload-image.js

import fetch from 'node-fetch';

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { file, fileName } = JSON.parse(event.body);

  const folder = "images";
  const API_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

  const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${API_KEY}:`).toString("base64"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      file,
      fileName,
      folder,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      statusCode: res.status,
      body: JSON.stringify({ error: data.message || "Upload failed" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
