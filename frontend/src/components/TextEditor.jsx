import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

import Quill from "quill";
import "quill/dist/quill.snow.css";

const TextEditor = forwardRef(({ setPostData, postData }, ref) => {
  const [quill, setQuill] = useState();
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (quill) {
        quill.focus();
      }
    },
  }));
  useEffect(() => {
    if (quill == null || editorRef.current == null) return;

    // Set the initial content from postData
    if (postData !== null && quill.root.innerHTML !== postData) {
      quill.root.innerHTML = postData;
    }

    // Update postData on text change
    quill.on("text-change", () => {
      setPostData(quill.root.innerHTML);
    });
  }, [quill, postData, setPostData]);

  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "blockquote", "code-block"],
    ["clean"],
  ];

  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper == null) return;

      if (editorRef.current) {
        // Clear previous editor instance if any
        editorRef.current.innerHTML = "";
      }

      const editor = document.createElement("div");
      wrapper.appendChild(editor);
      editorRef.current = editor;

      const q = new Quill(editor, {
        theme: "snow",
        modules: {
          toolbar: TOOLBAR_OPTIONS,
        },
        placeholder: "Write your review here...",
      });

      setQuill(q);

      // Pass the Quill instance through the ref
      if (ref) {
        ref.current = q;
      }
    },
    [ref]
  );

  return <div id="container" className="bg-corn-silk" ref={wrapperRef}></div>;
});

export default TextEditor;
