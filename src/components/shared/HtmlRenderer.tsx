import React from "react";

interface HtmlRendererProps {
  html: string;
}

const HtmlRenderer: React.FC<HtmlRendererProps> = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default HtmlRenderer;
