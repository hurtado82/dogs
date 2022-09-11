import { GET_DOGS } from "./actions"

const INITIAL_STATE = {
  getAllDogs: []
} 

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        getAllDogs: action.payload

      };

    default: 
    return state;
  }
}
