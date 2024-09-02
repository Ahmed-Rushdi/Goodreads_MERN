const axios = require("axios");
const cheerio = require("cheerio");

function removeSquareBrackets(text) {
  return text.replace(/\[.*?\]/g, "");
}

async function fetchBookData(isbn) {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
  );
  const book = response.data.items[0].volumeInfo;

  let authorBio = "";
  let authorImage = "";
  let authorBirth = "";
  if (book.authors && book.authors.length > 0) {
    const authorInfo = await fetchAuthorBioAndImage(book.authors[0]);
    authorBio = authorInfo.bio;
    authorImage = authorInfo.image;
    authorBirth = authorInfo.birth;
  }

  return {
    title: book.title,
    isbn13: isbn,
    author: {
      name: book.authors ? book.authors[0] : "Unknown Author",
      bio: removeSquareBrackets(authorBio) || "Bio not available",
      image: authorImage || "Image not available",
      birthDate: authorBirth || "",
    },
    categories: book.categories || [],
    description: book.description || "No description available.",
    publisher: book.publisher || "Unknown Publisher",
    publishedDate: book.publishedDate || "Unknown Date",
    pageCount: book.pageCount || 0,
    thumbnail: book.imageLinks
      ? book.imageLinks.thumbnail
      : "No image available",
    language: book.language || "en",
    averageRating: book.averageRating || 0,
    ratingsCount: book.ratingsCount || 0,
  };
}

// Function to scrape author bio and image from Wikipedia
async function fetchAuthorBioAndImage(authorName) {
  const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(
    authorName.replace(" ", "_")
  )}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract the author's bio
    const bio = $(
      "#mw-content-text > div.mw-content-ltr.mw-parser-output > p:nth-child(7)"
    )
      .first()
      .text()
      .trim();
    const birth = $(
      "#mw-content-text > div.mw-content-ltr.mw-parser-output > table > tbody > tr:nth-child(3) > td > span > span"
    )
      .first()
      .text()
      .trim();

    // Extract the author's image URL
    let image = "";
    const imageElement = $("#mw-content-text .infobox img").first();
    if (imageElement.length) {
      image = `https:${imageElement.attr("src")}`;
    }

    return { bio, image, birth };
  } catch (error) {
    console.error(
      `Error fetching Wikipedia data for ${authorName}:`,
      error.message
    );
    return { bio: "Bio not available", image: "Image not available" };
  }
}

exports.scrapeBook = async (req, res) => {
  const { isbn } = req.body;
  console.log(req.body);

  if (!isbn) {
    return res.status(400).json({ error: "ISBN is required" });
  }

  try {
    const book = await fetchBookData(isbn);
    const postResponse = await axios.post(
      "https://goodreadsmern-production.up.railway.app/api/books",
      book
    );
    res.status(postResponse.status).json(postResponse.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error processing request: ${error.message}` });
  }
};
