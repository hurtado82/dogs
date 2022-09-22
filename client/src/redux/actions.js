export const GET_DOGS = "GET_DOGS";
export const INPUT_SEARCH = "INPUT_SEARCH";
export const SELECT_OPTION = "SELECT_OPTION";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";

export function getDogs(byName) {
  return function(dispatch) {   
    if(byName){
      fetch(`http://localhost:3001/dogs?name=${byName}`)
        .then((res) => res.json())
        .then((dogs) => {
          dispatch({ type: GET_DOGS, payload: dogs });
        }); 
    }else {
      fetch(`http://localhost:3001/dogs`)
        .then((res) => res.json())
        .then((dogs) => {
          dispatch({ type: GET_DOGS, payload: dogs });
      }); 
    }
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

// export function inputSearch(str) {
//   return function(dispatch) {
//     dispatch({ type: INPUT_SEARCH, payload: str });
//   }
// }

export function selectOption(option) {
  return function (dispatch) {
    dispatch({ type: SELECT_OPTION, payload: option });
  };
}