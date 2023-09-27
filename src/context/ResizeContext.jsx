import React, { createContext, useState, useMemo } from "react";
export const ReducerNavbarContext = createContext(null);
function ResizeContext({ children }) {
  const [toggleNavBar, setToggleNavBar] = useState(false);
  
  
 
 
  
 

  const values = useMemo(() => {
    return {
      toggleNavBar,
    
      resizeNavBar: () => {
        setToggleNavBar((prevNavBar) => !prevNavBar);
      },
  
    };
  }, [toggleNavBar]);


  return (
    <ReducerNavbarContext.Provider value={values}>
      {children}
    </ReducerNavbarContext.Provider>
  );
}

export default ResizeContext;
