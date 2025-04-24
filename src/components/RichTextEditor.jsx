// import React, { useRef } from "react";
// import JoditEditor from "jodit-react";

// const RichTextEditor = ({input,setInput}) => {
//   const handleChange = (content)=>{
//     setInput({...input,description:content})
//   }
//   const editor = useRef(null);

//   const config = {
//     buttons: ["bold", "italic", "underline", "|", "ul", "ol"], // Add more if needed
//     toolbarAdaptive: false, // Prevents multi-line toolbar
//     toolbarSticky: false, // Disables sticky behavior
//     toolbarButtonSize: "small", // Makes buttons smaller to fit in one row
//     showCharsCounter: false,
//     showWordsCounter: false,
//     showXPathInStatusbar: false, // Hide status bar
//     showPlaceholder: false,
//     readonly: false, // Keep it editable
//     // height: "100px",   // Try changing this to a reasonable value
//     minHeight: "50px",
//     maxHeight: "120px",
//   };

//   return (
//     <div className="min-h-[50px] max-h-[120px] overflow-y-auto border rounded-lg">
//       <JoditEditor 
//         value={input.description} 
//         onChange={handleChange} 
//         ref={editor} 
//         config={config} 
//       />
//     </div>
//   );
  
//   // return <JoditEditor value={input.description} onChange={handleChange} ref={editor} config={config} />;
// };


// export default RichTextEditor;





















import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, ListIcon, ListOrderedIcon, QuoteIcon, CodeIcon, Heading1Icon, Heading2Icon } from "lucide-react";

const RichTextEditor = ({input,setInput}) => {
  const [content, setContent] = useState("");
  const handleChange = (content)=>{
    setInput({...input,description:content})
  }
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Heading.configure({ levels: [1, 2] }),
      BulletList,
      OrderedList,
      Blockquote,
      CodeBlock,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setContent(newContent);
      setInput({ ...input, description: newContent }); // Update input state
    },
    autofocus: true,
  });
  

  if (!editor) return null;

  return (
    <div >
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 bg-gray-100 p-3 rounded-t-md border-b">
        <ToolbarButton editor={editor} command="toggleBold" Icon={BoldIcon} />
        <ToolbarButton editor={editor} command="toggleItalic" Icon={ItalicIcon} />
        <ToolbarButton editor={editor} command="toggleUnderline" Icon={UnderlineIcon} />
        <ToolbarButton editor={editor} command="toggleStrike" Icon={StrikethroughIcon} />
        <ToolbarButton editor={editor} command="toggleBulletList" Icon={ListIcon} />
        <ToolbarButton editor={editor} command="toggleOrderedList" Icon={ListOrderedIcon} />
        <ToolbarButton editor={editor} command="toggleBlockquote" Icon={QuoteIcon} />
        <ToolbarButton editor={editor} command="toggleCodeBlock" Icon={CodeIcon} />
        <ToolbarButton editor={editor} command="toggleHeading" Icon={Heading1Icon} options={{ level: 1 }} />
        <ToolbarButton editor={editor} command="toggleHeading" Icon={Heading2Icon} options={{ level: 2 }} />
      </div>

      {/* Editor Content */}
      <div className="p-4 border border-gray-300 rounded-b-md  bg-white">
        <EditorContent editor={editor} className="prose " value={input.description} onChange={handleChange} />
      </div>
    </div>
  );
};

// Toolbar Button Component
const ToolbarButton = ({ editor, command, Icon, options = {} }) => (
  <button
    onClick={() => editor.chain().focus()[command](options).run()}
    className="p-2 rounded-md hover:bg-gray-200 transition"
  >
    <Icon size={18} className="text-gray-700" />
  </button>
);

export default RichTextEditor;
