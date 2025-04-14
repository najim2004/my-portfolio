"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";

export default function RichTextEditor({
  value = "",
  onChange,
  className = "",
}) {
  const [mounted, setMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "ql-link" },
      }),
      Image.configure({ inline: true }),
      Placeholder.configure({ placeholder: "Write your content here..." }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        class: "ql-editor min-h-[200px]",
      },
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!mounted || !editor) {
    return (
      <div
        className={`border rounded-md p-2 min-h-[200px] ${className}`}
        style={{ backgroundColor: "rgb(55, 65, 81)" }}
      ></div>
    );
  }

  const toggleHeading = (level: number) => {
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  return (
    <div className={`rich-text-editor ${className}`}>
      <style jsx global>{`
        .rich-text-editor .tiptap-toolbar {
          background-color: rgb(55, 65, 81);
          border-color: rgb(75, 85, 99);
          border-radius: 0.375rem 0.375rem 0 0;
          padding: 0.5rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .rich-text-editor .tiptap-toolbar select,
        .rich-text-editor .tiptap-toolbar button {
          background: none;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
          padding: 0.25rem 0.5rem;
          cursor: pointer;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }

        .rich-text-editor .tiptap-toolbar button.is-active,
        .rich-text-editor .tiptap-toolbar select:focus {
          color: rgb(192, 132, 252);
          border-color: rgb(192, 132, 252);
        }

        .rich-text-editor .ProseMirror {
          background-color: rgb(55, 65, 81);
          color: white;
          padding: 0.75rem;
          border-radius: 0 0 0.375rem 0.375rem;
          min-height: 200px;
        }

        .rich-text-editor .ProseMirror:focus {
          outline: none;
        }

        .rich-text-editor .ProseMirror p.is-editor-empty:first-child::before {
          color: rgba(255, 255, 255, 0.4);
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
          font-style: normal;
        }

        .rich-text-editor .ql-link {
          color: rgb(192, 132, 252);
          text-decoration: underline;
        }

        .rich-text-editor img {
          max-width: 100%;
          height: auto;
        }
      `}</style>

      {/* Toolbar */}
      <div className="tiptap-toolbar">
        <select
          value={
            editor.isActive("heading")
              ? editor.getAttributes("heading").level
              : "0"
          }
          onChange={(e) => toggleHeading(parseInt(e.target.value))}
        >
          <option value="0">Normal</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
          <option value="5">H5</option>
          <option value="6">H6</option>
        </select>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          title="Bold"
        >
          <strong>B</strong>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          title="Italic"
        >
          <i>I</i>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
          title="Strike"
        >
          <s>S</s>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
          title="Bullet List"
        >
          •
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
          title="Ordered List"
        >
          1.
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
          title="Align Left"
        >
          ←
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
          title="Align Center"
        >
          ↔
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
          title="Align Right"
        >
          →
        </button>

        <button
          onClick={() => {
            const url = window.prompt("Enter the URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={editor.isActive("link") ? "is-active" : ""}
          title="Insert Link"
        >
          🔗
        </button>

        <button
          onClick={() => {
            const url = window.prompt("Enter image URL");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          title="Insert Image"
        >
          🖼️
        </button>

        <button
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          title="Clear Formatting"
        >
          🧹
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
