import { GET_CONTROL, GET_DOGS, GET_DOG_DETAIL, SELECT_OPTION, SELECT_ORDER_BY} from "./actions"

const initialState = {
  getAllDogs: [],
  getDetail: {},
  selectOrderBy: "",
  selectOption: "",
  getControl: []
}; 

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        getAllDogs: action.payload,
      };
    case GET_DOG_DETAIL:
      return {
        ...state,
        getDetail: action.payload,
      };
    case SELECT_ORDER_BY:
      return {
        ...state,
        selectOrderBy: action.payload,
      };
    case SELECT_OPTION:
      return {
        ...state,
        selectOption: action.payload,
      };
    case GET_CONTROL:
      return {
        ...state,
        getControl: action.payload,
      };
    default:
      return state;
  }
}
