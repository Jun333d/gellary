const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const privateApiKey = "your_private_api_key_here"; // Keep this secret!
  const folder = "images"; // Your ImageKit folder

  const response = await fetch(`https://api.imagekit.io/v1/files?path=${folder}`, {
    headers: {
      Authorization: "Basic " + Buffer.from(privateApiKey + ":").toString("base64"),
    },
  });

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: "Failed to fetch images" }),
    };
  }

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

