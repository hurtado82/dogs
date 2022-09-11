// import { useDispatch, useSelector } from "react-redux";
export default function Card(props) {
  // const dogs = useSelector((state) => state.getAllDogs);
  return (
    <div>
      <div>Name: {props.name}</div>
      <img src={props.image} width="300" />
    </div>
  );
}
