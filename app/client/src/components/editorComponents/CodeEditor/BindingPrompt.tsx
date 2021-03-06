import React, { useRef } from "react";
import styled from "styled-components";
import { Colors } from "constants/Colors";
import { EditorTheme } from "./EditorConfig";

const Wrapper = styled.span<{
  visible: boolean;
  bottomOffset: number;
  customMessage: boolean;
  editorTheme?: EditorTheme;
}>`
  padding: ${(props) => (props.customMessage ? 6 : 8)}px;
  font-size: 12px;
  color: #858282;
  box-shadow: 0px 12px 34px -6px rgba(0, 0, 0, 0.75);
  border-radius: 0px;
  background-color: ${(props) =>
    props.editorTheme === EditorTheme.DARK
      ? Colors.MINE_SHAFT
      : props.editorTheme === EditorTheme.LIGHT
      ? Colors.MERCURY
      : Colors.BLUE_CHARCOAL};
  position: absolute;
  bottom: ${(props) => -props.bottomOffset}px;
  width: 100%;
  line-height: 13px;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  z-index: 1;
`;

const CurlyBraces = styled.span`
  color: white;
  background-color: #f3672a;
  border-radius: 2px;
  padding: 2px;
  margin: 0px 2px;
`;

const BindingPrompt = (props: {
  promptMessage?: React.ReactNode | string;
  isOpen: boolean;
  editorTheme?: EditorTheme;
}): JSX.Element => {
  const promptRef = useRef<HTMLDivElement>(null);
  let bottomOffset = 30;
  const customMessage = !!props.promptMessage;
  if (promptRef.current) {
    const boundingRect = promptRef.current.getBoundingClientRect();
    bottomOffset = boundingRect.height;
  }
  if (customMessage) {
    bottomOffset = 36;
  }
  return (
    <Wrapper
      className="t--no-binding-prompt"
      ref={promptRef}
      bottomOffset={bottomOffset}
      visible={props.isOpen}
      customMessage={customMessage}
      editorTheme={props.editorTheme}
    >
      {props.promptMessage ? (
        props.promptMessage
      ) : (
        <React.Fragment>
          Type <CurlyBraces>{"{{"}</CurlyBraces> to see a list of variables
        </React.Fragment>
      )}
    </Wrapper>
  );
};

export default BindingPrompt;
