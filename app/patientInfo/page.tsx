"use client";

import React, { FormEvent, useState } from "react";
import { generateImage } from "../lib/openai";

function Page() {
  const [text, setText] = useState<string | undefined>("");
  const [imageURL, setImageURL] = useState<string | undefined>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (text) {
      try {
        const url = await generateImage(text);
        setImageURL(url);
      } catch (error) {
        console.log("Error Generating Image:", error);
      }
    } else {
      console.log("Prompt is empty");
    }
  };

  return (
    <div className="text-4xl mt-12 text-red-400">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="prompt"
          name="prompt"
          placeholder="Input your prompt"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>{imageURL}</div>
    </div>
  );
}

export default Page;
