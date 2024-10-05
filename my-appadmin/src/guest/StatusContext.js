// StatusContext.js
import React, { createContext, useContext, useState } from 'react';

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const [statusId, setStatusId] = useState(null);

  return (
    <StatusContext.Provider value={{ statusId, setStatusId }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
