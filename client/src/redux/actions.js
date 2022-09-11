export const GET_DOGS = "GET_DOGS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";

export function getDogs() {
  return function(dispatch) {
    fetch("http://localhost:3001/dogs")
    .then((res) => res.json())
    .then((dogs) => {
      dispatch({ type: GET_DOGS, payload: dogs });
    }); 
  }
}

export function getDogDetail(id) {
  return function(dispatch) {
    fetch(`http://localhost:3001/dogs/${id}`)
    .then((res) => res.json())
    .then((detail) => {
      dispatch({ type: GET_DOG_DETAIL, payload: detail });
    }); 
  }
}