import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function TextEditor({ setPostData, postData }) {
  const [quill, setQuill] = useState();

  useEffect(() => {
    if (quill == null) return;
    if (postData == null) {
      quill.root.innerText = "";
      return;
    }
    if (quill.root.innerText === postData) return;
    quill.root.innerText = postData;
  }, [quill, postData]);

  useEffect(() => {
    if (quill == null) return;
    quill.on("text-change", () => {
      setPostData(quill.root.innerText);
    });
  }, [quill]);

  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "blockquote", "code-block"],
    ["clean"],
  ];

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerText = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
      placeholder: "Write your review here...",
    });

    setQuill(q);
  }, []);

  return <div id="container" className=" bg-corn-silk" ref={wrapperRef}></div>;
}
