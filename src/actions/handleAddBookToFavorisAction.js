import { addBookToFavoris } from "./addBookToFavorisAction";

export const handleAddBookToFavorisAction = (
  googleBook,
  dispatch,
  collectionFavoris
) => {
  try {
    if (googleBook && googleBook.volumeInfo) {
      const { title, imageLinks, description } = googleBook.volumeInfo;
      const id = googleBook.id;
      const categories = googleBook["volumeInfo"]["categories"]?.shift();
      const authors = googleBook["volumeInfo"]["authors"]?.shift();
      const pageCount = googleBook.volumeInfo.pageCount || 0;

      addBookToFavoris(
        dispatch,
        {
          id,
          title,
          pageCount,
          authors,
          categories,
          cover_link: imageLinks && imageLinks.thumbnail,
          summary: description,
        },
        collectionFavoris
      );
    } else {
      console.log("googleBook is undefined");
    }
  } catch (error) {
    console.log(error);
  }
};
