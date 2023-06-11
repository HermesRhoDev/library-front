import { createAsyncThunk } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections } from "../actions/myCollectionAction";
import { HamburgerSVG } from "../assets/svg/hamburger";
import { axios } from "../config/axios/configAxios";
import { selectUserInfo } from "../config/redux/reduxAuth";
import { selectFetchCollections } from "../config/redux/reduxCollection";

export const Test = () => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const collections = useSelector(selectFetchCollections);
  const [collectionFavoris, setCollectionFavoris] = useState(null);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchCollections());
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (collections) {
      const favoris = collections.find(
        (collection) => collection.name === "Favoris"
      )?.id;
      setCollectionFavoris(favoris);
    }
  }, [collections]);

  const csrf = () => axios.get("sanctum/csrf-cookie");

  const addBookToFavoris = async ({
    id,
    title,
    pages_count,
    authors,
    categories,
    cover_link,
    summary,
  }) => {
    try {
      await csrf();
      const response = await axios.post(
        `api/collection/${collectionFavoris}/add-book`,
        {
          id,
          title,
          pages_count,
          authors,
          categories,
          cover_link,
          summary,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const booktest = {
    id: "601d69d6-9fee-a0fd-6f0d90a",
    title: "Book Title",
    pages_count: 200,
    authors: "John Doe",
    categories: "Fiction",
    cover_link: "https://example.com/book-cover.jpg",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };

  const renderBooks = () => {
    let arrayBooks = [];
    for (let i = 0; i <= 25; i++) {
      arrayBooks.push(
        <div
          key={i}
          className="w-full h-52 bg-white shadow-xl rounded-lg max-[640px]:shadow-none max-[640px]:rounded-none max-[640px]:bg-transparent max-[640px]:w-fit flex flex-row"
        >
          <img
            className="h-full max-w-full rounded-l-lg max-[640px]:rounded-lg w-32"
            src="http://books.google.com/books/content?id=fDszEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            alt="imgTitle"
          />
        </div>
      );
    }
    return arrayBooks;
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col">
        <div className="w-full p-5 bg-primary h-16 max-[640px]:hidden block"></div>

        <div className="w-full h-16 bg-secondary flex items-center px-4">
          <button className="max-[640px]:block hidden">{HamburgerSVG()}</button>
          <ul className="w-full flex justify-around">
            <li>Filtre</li>
            <li>Filtre</li>
            <li>Filtre</li>
            <li>Filtre</li>
          </ul>
        </div>
      </div>

      <div className="w-full bg-secondary overflow-y-scroll h-full p-5">
        <div className="w-full items-center grid 2xl:grid-cols-4 max-[768px]:grid-cols-2 grid-cols-3 gap-4 max-[640px]:justify-items-center">
          {renderBooks()}
        </div>
      </div>
    </div>
  );
};
