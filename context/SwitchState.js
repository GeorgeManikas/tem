import { useReducer } from "react";
import { SwitchContext } from "./SwitchContext";
import reducer from "./reducer";

const SwitchState = ({ children }) => {
  const initialState = {
    products: [],
    families: [],
    currentProduct: {},
    suggestedProducts: [],
    currentFamily: 1,
    offers: [],
    currentOffer: {},
    offerProducts: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SwitchContext.Provider value={{ state, dispatch }}>
      {children}
    </SwitchContext.Provider>
  );
};

export default SwitchState;
