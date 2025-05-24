// VisibilidadContext.jsx
import React, { createContext, useState } from 'react';

const VisibilidadContext = createContext();

export function VisibilidadProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibilidad = () => setIsVisible(prev => !prev);

  return (
    <VisibilidadContext.Provider value={{ isVisible, toggleVisibilidad }}>
      {children}
    </VisibilidadContext.Provider>
  );
}

export default VisibilidadContext;
