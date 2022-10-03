export const GET_DOGS = "GET_DOGS";
export const GET_CONTROL = "GET_CONTROL";
export const SELECT_OPTION = "SELECT_OPTION";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const SELECT_ORDER_BY = "SELECT_ORDER_BY";

export function getDogs(byName) {
  return function(dispatch) {   
    if(byName){
      fetch(`http://localhost:3001/dogs?name=${byName}`)
        .then((res) => res.json())
        .then((dogs) => {
          dispatch({ type: GET_DOGS, payload: dogs });
        }).catch(error => console.log(error)); 
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

export function selectOrderBy(str) {
  return function (dispatch) {
    dispatch({ type: SELECT_ORDER_BY, payload: str });
  };
}

export function selectOption(option) {
  return function (dispatch) {
    dispatch({ type: SELECT_OPTION, payload: option });
  };
}

export function getControl() {
  return function(dispatch) {
    fetch("http://localhost:3001/control")
      .then((res) => res.json())
      .then((result) => dispatch({ type: GET_CONTROL, payload: result }));
  }
}