export const GET_DOGS = "GET_DOGS";

export function getDogs() {
    return function(dispatch) {
    fetch("http://localhost:3001/dogs")
      .then((res) => res.json())
      .then((dogs) => {
        dispatch({ type: GET_DOGS, payload: dogs });
      }); 
    
  }
}