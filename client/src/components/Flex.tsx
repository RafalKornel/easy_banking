import { CSSProperties, PropsWithChildren } from "react";

type Props = {
  direction?: CSSProperties["flexDirection"];
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
  gap?: CSSProperties["gap"];
  additionalStyling?: CSSProperties;
};

export const Flex = ({
  direction = "column",
  gap,
  align,
  justify,
  additionalStyling,

  children,
}: PropsWithChildren<Props>) => (
  <div
    style={{
      display: "flex",
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      gap,
      ...additionalStyling,
    }}
  >
    {children}
  </div>
);
