import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/m1x4g4l6m"
});

export const handler = async ({ body }) => {
  try {
    const { fileName, fileData } = JSON.parse(body);
    // fileData should be a base64 string without data mime prefix
    const uploadResult = await imagekit.upload({
      file: fileData,
      fileName,
      folder: "/images"
    });
    return {
      statusCode: 200,
      body: JSON.stringify(uploadResult)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
