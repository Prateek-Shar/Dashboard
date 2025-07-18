import { createContext } from "react";

export interface Prop {
  Catagory : string;
  Amount : number
}

export type DetailType = {
  detailDaily: Prop[];
  detailByMonth: Prop[];
  detailByYear: Prop[];

  setDetailDaily: React.Dispatch<React.SetStateAction<Prop[]>>;
  setDetailByMonth: React.Dispatch<React.SetStateAction<Prop[]>>;
  setDetailByYear: React.Dispatch<React.SetStateAction<Prop[]>>;
};

export const DetailContext = createContext<DetailType>({
  detailDaily: [],
  detailByMonth: [],
  detailByYear: [],
  setDetailDaily: () => {},
  setDetailByMonth: () => {},
  setDetailByYear: () => {},
});