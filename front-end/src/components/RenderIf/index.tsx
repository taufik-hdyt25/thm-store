import React from "react";

interface IProps {
  readonly children: JSX.Element;
  readonly isTrue: boolean;
}
const RenderIf: React.FC<IProps> = ({ children, isTrue }): JSX.Element | null =>
  isTrue ? children : null;

  export default React.memo(RenderIf);