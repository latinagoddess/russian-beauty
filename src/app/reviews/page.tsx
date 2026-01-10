"use client";

import React, { useState } from "react";
import styles from "@/styles/Reviews.module.scss";

import comments from "@/data/comments.json";

import Modal from "@mui/material/Modal";

import { LuImagePlus } from "react-icons/lu";

import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  ImageDimensionsValidator,
} from "use-file-picker/validators";

type CommentType = {
  username: string;
  comment: string;
  image?: string;
};

function Reviews() {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const [review, setReview] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    validators: [
      new FileAmountLimitValidator({}),
      new FileTypeValidator(["jpg", "png"]),
      new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
      new ImageDimensionsValidator({}),
    ],
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors.length) {
    return <div>Error...</div>;
  }

  const handleOpen = () => {
    if (review && review !== "") {
      setModalOpen("submit");
    }
  };

  const submit = () => {
    if (
      email &&
      email !== "" &&
      username &&
      username !== "" &&
      number &&
      number !== ""
    ) {
      setModalOpen("success");
    }
  };

  const handleClose = () => setModalOpen(null);

  return (
    <main className={styles.reviews}>
      <h1>Reviews</h1>
      <div className={styles.authenticity}>
        <p>
          For more authenticity here are other reviews from reputable review boards in Canada and globally
        </p>
        <div className={styles.websites}>
          <a href={`${process.env.NEXT_PUBLIC_CERB_SITE}8bda66da-e6d3-4477-a43b-842359ed37ed/480dca8d-d8ea-4af2-9008-b26760ahsgj1`}>Review 1</a>
          <a href={`${process.env.NEXT_PUBLIC_CERB_SITE}8bda66da-e6d3-4477-a43b-842359ed37ed/0f0c0aae-a792-4b4e-8b88-203ab84c43554`}>Review 2</a>
          <a href={`${process.env.NEXT_PUBLIC_CERB_SITE}8bda66da-e6d3-4477-a43b-842359ed37ed/0f0c0aae-a792-4b4e-8b88-203ab84c43551`}>Review 3</a>
          <a href={`${process.env.NEXT_PUBLIC_CERB_SITE}8bda66da-e6d3-4477-a43b-842359ed37ed/0f0c0aae-a792-4b4e-8b88-203ab84c43572`}>Review 4</a>
          <a href={`${process.env.NEXT_PUBLIC_CERB_SITE}8bda66da-e6d3-4477-a43b-842359ed37ed/0f0c0aae-a792-4b4e-8b88-203ab84c43712`}>Review 5</a>
          <a href={`${process.env.NEXT_PUBLIC_CERB_SITE}8bda66da-e6d3-4477-a43b-842359ed37ed/0f0c0aae-a792-4b4e-8b88-203ab84c43611`}>Review 6</a>
          <a href={`${process.env.NEXT_PUBLIC_CERB_SITE}8bda66da-e6d3-4477-a43b-842359ed37ed/0f0c0aae-a792-4b4e-8b88-203ab84c62314`}>Review 7</a>
          <a href={`${process.env.NEXT_PUBLIC_CERB_SITE}8bda66da-e6d3-4477-a43b-842359ed37ed/0f0c0aae-a792-4b4e-8b88-203ab84c612651`}>Review 8</a>
          <a href={`${process.env.NEXT_PUBLIC_SPAIN_SITE}`}>Review 9</a>
          <a href={`${process.env.NEXT_PUBLIC_BRAZIL_SITE}`}>Review 10</a>
          <a href={`${process.env.NEXT_PUBLIC_CERB_SITE}8bda66da-e6d3-4477-a43b-842359ed37ed/480dca8d-d8ea-4af2-9008-b26760ahsgh9`}>Review 11</a>
          <a href={`${process.env.NEXT_PUBLIC_CERB_SITE}8bda66da-e6d3-4477-a43b-842359ed37ed/480dca8d-d8ea-4af2-9008-b26760ahsgj4`}>Review 12</a>
        </div>
      </div>
    </main>
  );
}

export default Reviews;
