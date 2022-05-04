import React, { useState, useRef } from "react";
import Draft from "draft-js";

import { BlockStyleControls } from "./BlockStyleControls";
import { InlineStyleControls } from "./InlineControls";

import "./rich.css";

const { Editor, EditorState, RichUtils, getDefaultKeyBinding } = Draft;

const RichEditorExample = () => {
  const [editorValue, setEditorValue] = useState(EditorState.createEmpty());

  console.log(editorValue);

  const myBlock = useRef(null);

  const focus = () => {
    myBlock.focus();
  };

  const onChange = (editorState) => {
    setEditorValue(editorState);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };
  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorValue, 4 /* maxDepth */);
      if (newEditorState !== editorValue) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };
  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorValue, blockType));
  };
  const toggleInlineStyle = (inlineStyle) => {
    console.log("wasHere");
    onChange(RichUtils.toggleInlineStyle(editorValue, inlineStyle));
  };

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = "RichEditor-editor";
  var contentState = editorValue.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }
  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorValue}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorValue}
        onToggle={toggleInlineStyle}
      />
      <div className={className} onClick={focus}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorValue}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={onChange}
          placeholder="Tell a story..."
          ref={myBlock}
          spellCheck={true}
        />
      </div>
    </div>
  );
};
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

export default RichEditorExample;
