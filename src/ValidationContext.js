import React, { createContext } from 'react';

export const ValidationContext = createContext();

export const ValidationProvider = ({ children }) => {
  const validaciones = {
    // Debe contener exactamente 8 dígitos.
    regexChasis: /^[0-9]{8}$/,
    // Solo letras (se permite letras acentuadas y espacios).
    regexTexto: /^[A-Za-zÀ-ÿ\s]+$/
  };

  return (
    <ValidationContext.Provider value={validaciones}>
      {children}
    </ValidationContext.Provider>
  );
};