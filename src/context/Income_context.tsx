// context/IncomeContext.tsx
import React, { createContext, useContext } from 'react';

type IncomeContextType = {
  updateChart: () => void;
};

const IncomeContext = createContext<IncomeContextType | null>(null);

export const useIncome = () => {
  const context = useContext(IncomeContext);
  if (!context) throw new Error("useIncome must be used within IncomeProvider");
  return context;
};

export const IncomeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const updateChart = () => {
    console.log("Chart update function called from context");
    // add any shared logic here
  };

  return (
    <IncomeContext.Provider value={{ updateChart }}>
      {children}
    </IncomeContext.Provider>
  );
};
