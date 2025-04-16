"use client";

import { JSX, useEffect, useState } from "react";
import { useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  title: string;
  children: React.ReactNode;
}

const ToolbarButton = ({
  onClick,
  isActive,
  title,
  children,
}: ToolbarButtonProps): JSX.Element => (
  <button
    onClick={onClick}
    className={isActive ? "is-active" : ""}
    title={title}
    type="button"
  >
    {children}
  </button>
);

export default function RichTextEditor({
  value = "",
  onChange,
  className = "",
}: RichTextEditorProps): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);

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
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
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

  useEffect(() => {
    if (editor) {
      const element = editor.view.dom;
      element.addEventListener("click", handleImageEdit);

      return () => {
        element.removeEventListener("click", handleImageEdit);
      };
    }
  }, [editor]);

  const toggleHeading = (level: 1 | 2 | 3 | 4 | 5 | 6 | 0): void => {
    if (!editor) return;

    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
        .run();
    }
  };

  const handleInsertLink = (): void => {
    if (!editor) return;

    const url = window.prompt("Enter the URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleInsertImage = (): void => {
    if (!editor) return;

    const url = window.prompt("Enter image URL");
    if (url) {
      const width = window.prompt(
        "Enter image width (e.g., 300px or 100%)",
        "auto"
      );
      const height = window.prompt("Enter image height (e.g., 200px)", "auto");
      const position = window.prompt(
        "Enter image position (left/center/right)",
        "center"
      );

      let alignStyle = "margin: 1em auto;"; // Default center alignment
      if (position === "left") {
        alignStyle = "margin: 1em 0;";
      } else if (position === "right") {
        alignStyle = "margin: 1em 0 1em auto;";
      }

      editor
        .chain()
        .focus()
        .setImage({
          src: url,
          alt: "Image",
          title: "Click to edit",
        })
        .run();

      // Set additional attributes after image is inserted
      const imageElement = editor.view.dom.querySelector(
        "img:last-of-type"
      ) as HTMLImageElement;
      if (imageElement) {
        imageElement.style.cssText = `
          width: ${width || "auto"};
          height: ${height || "auto"};
          cursor: pointer;
          ${alignStyle}
        `;
        imageElement.classList.add("editable-image");
      }
    }
  };

  const handleImageEdit = (event: MouseEvent) => {
    const target = event.target as HTMLImageElement;
    if (target.tagName === "IMG") {
      const newWidth = window.prompt(
        "Enter new width",
        target.style.width || "auto"
      );
      const newHeight = window.prompt(
        "Enter new height",
        target.style.height || "auto"
      );

      if (newWidth || newHeight) {
        target.style.width = newWidth || target.style.width;
        target.style.height = newHeight || target.style.height;
      }
    }
  };

  if (!mounted || !editor) {
    return (
      <div
        className={`border rounded-md p-2 min-h-[200px] ${className}`}
        style={{ backgroundColor: "rgb(55, 65, 81)" }}
      />
    );
  }

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

        .rich-text-editor .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 1em 0 0.5em;
        }

        .rich-text-editor .ProseMirror h2 {
          font-size: 1.75em;
          font-weight: bold;
          margin: 0.83em 0;
        }

        .rich-text-editor .ProseMirror h3 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.67em 0;
        }

        .rich-text-editor .ProseMirror h4 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
        }

        .rich-text-editor .ProseMirror h5 {
          font-size: 1.1em;
          font-weight: bold;
          margin: 0.4em 0;
        }

        .rich-text-editor .ProseMirror h6 {
          font-size: 1em;
          font-weight: bold;
          margin: 0.3em 0;
        }

        .rich-text-editor .ProseMirror ul,
        .rich-text-editor .ProseMirror ol {
          padding-left: 1.5em;
          margin: 1em 0;
        }

        .rich-text-editor .ProseMirror ul li {
          list-style-type: disc;
          margin: 0.5em 0;
        }

        .rich-text-editor .ProseMirror ol li {
          list-style-type: decimal;
          margin: 0.5em 0;
        }

        .rich-text-editor .ProseMirror img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1em 0;
          border-radius: 0.375rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .rich-text-editor .ProseMirror img:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }

        .rich-text-editor .ProseMirror .editable-image {
          border: 2px solid transparent;
        }

        .rich-text-editor .ProseMirror .editable-image:hover {
          border-color: rgb(192, 132, 252);
        }

        .rich-text-editor .ProseMirror p {
          margin: 0.5em 0;
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
          onChange={(e) =>
            toggleHeading(
              parseInt(e.target.value, 10) as 0 | 1 | 2 | 3 | 4 | 5 | 6
            )
          }
        >
          <option value="0">Normal</option>
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <option key={level} value={level.toString()}>
              H{level}
            </option>
          ))}
        </select>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold"
        >
          <strong>B</strong>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic"
        >
          <i>I</i>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="Strike"
        >
          <s>S</s>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet List"
        >
          •
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Ordered List"
        >
          1.
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          title="Align Left"
        >
          ←
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          title="Align Center"
        >
          ↔
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          title="Align Right"
        >
          →
        </ToolbarButton>

        <ToolbarButton
          onClick={handleInsertLink}
          isActive={editor.isActive("link")}
          title="Insert Link"
        >
          🔗
        </ToolbarButton>

        <ToolbarButton onClick={handleInsertImage} title="Insert Image">
          🖼️
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          title="Clear Formatting"
        >
          🧹
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
