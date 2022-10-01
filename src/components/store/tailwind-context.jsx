import React from "react";

const TailwindContext = React.createContext();

export const TailwindContextProvider = (props) => {
  const h1Size = "text-4xl lg:text-5xl font-bold leading-tight mb-6";
  const sectionPaddingX = "px-12";
  const sectionPaddingY = "py-12";

  return (
    <TailwindContext.Provider value={{ h1Size, sectionPaddingX, sectionPaddingY }}>
      {props.children}
    </TailwindContext.Provider>
  );
};

export default TailwindContext;
