import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/m1x4g4l6m/"
});

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {
    const { fileName, fileData } = JSON.parse(event.body);

    const uploadResponse = await imagekit.upload({
      file: fileData, // base64 string
      fileName,
      folder: "/images"
    });

    return {
      statusCode: 200,
      body: JSON.stringify(uploadResponse)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};


