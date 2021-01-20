import {
  FETCH_PRODUCTS,
  FETCH_FAMILIES,
  SET_CURRENT_FAMILY,
  SET_CURRENT_PRODUCT,
  SET_SUGGESTED_PRODUCT,
  REFRESH_PRODUCT_LIST,
  FETCH_OFFERS,
  SET_CURRENT_OFFER,
  ADD_OFFER_PRODUCT,
} from "./types";

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case FETCH_FAMILIES:
      return {
        ...state,
        families: action.payload,
      };
    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload,
      };
    case SET_CURRENT_FAMILY:
      return {
        ...state,
        currentFamily: action.payload,
      };
    case SET_SUGGESTED_PRODUCT:
      return {
        ...state,
        suggestedProducts: action.payload,
      };
    case REFRESH_PRODUCT_LIST: {
      const fetcher = async () => {
        const res = await fetch(`api/pricelist/getAllPrices`);
        const data = await res.json();
        return data;
      };
      return {
        ...state,
        products: fetcher(),
        suggestedProducts: fetcher(),
      };
    }
    case FETCH_OFFERS:
      return {
        ...state,
        offers: action.payload,
      };
    case SET_CURRENT_OFFER: {
      return {
        ...state,
        currentOffer: action.payload,
      };
    }
    case ADD_ITEM: {
      return {
        ...state,
        offerProducts: [...state.offerProducts, action.payload],
      };
    }
    default:
      throw new Error("Invalid action type");
  }
};

export default reducer;
