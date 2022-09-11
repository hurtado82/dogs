import { GET_DOGS, GET_DOG_DETAIL} from "./actions"

const INITIAL_STATE = {
  getAllDogs: [],
  getDetail: {}
} 

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        getAllDogs: action.payload
      };
      case GET_DOG_DETAIL:
        return {
          ...state,
          getDetail: action.payload
        }

    default: 
    return state;
  }
}
