"use client";

import { useState } from "react";

export const usePurchaseSell = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const onSubmit = () => {
    // TODO: 판매 등록 API 호출
    console.log({ title, description, price });
  };

  return {
    title,
    description,
    price,
    onChangeTitle,
    onChangeDescription,
    onChangePrice,
    onSubmit,
  };
};

