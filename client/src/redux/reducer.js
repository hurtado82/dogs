import { GET_DOGS, GET_DOG_DETAIL, INPUT_SEARCH, SELECT_OPTION} from "./actions"

const initialState = {
  getAllDogs: [],
  getDetail: {},
  inputSearch: "",
  selectOption: ""
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
    case INPUT_SEARCH:
      return {
        ...state,
        inputSearch: action.payload,
      };
    case SELECT_OPTION:
      return {
        ...state,
        selectOption: action.payload,
      };
    default:
      return state;
  }
}
