const fs = require("fs");

const uploadBookCover = async (req, res) => {
  const fileName = req.headers["x-file-name"];
  const fileExt = req.headers["x-file-extension"];

  if (!fileName || !fileExt) {
    return res.status(400).send("Missing file name or extension");
  }

  const filePath = `../../public/thumbnails/${fileName}.${fileExt}`;
  const fileStream = fs.createWriteStream(filePath);

  req.pipe(fileStream);

  req.on("end", () => {
    console.log(`book image uploaded successfully: ${fileName}.${fileExt}`);
    res.send("Book cover uploaded successfully!");
  });

  req.on("error", (err) => {
    console.error(`Error uploading book cover: ${err}`);
    res.status(500).send("Error uploading book cover");
  });
};

const uploadAuthorImage = async (req, res) => {
  const fileName = req.headers["x-file-name"];
  const fileExt = req.headers["x-file-extension"];

  if (!fileName || !fileExt) {
    return res.status(400).send("Missing file name or extension");
  }

  const filePath = `../../public/thumbnails/${fileName}.${fileExt}`;
  const fileStream = fs.createWriteStream(filePath);

  req.pipe(fileStream);

  req.on("end", () => {
    console.log(`author image uploaded successfully: ${fileName}.${fileExt}`);
    res.send("Book cover uploaded successfully!");
  });

  req.on("error", (err) => {
    console.error(`Error uploading book cover: ${err}`);
    res.status(500).send("Error uploading book cover");
  });
};

module.exports = {
  uploadBookCover,
  uploadAuthorImage,
};
