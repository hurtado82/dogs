import Card from "./Card";
import { getDogDetail } from "../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function DogDetail() {
  const DETAIL = useSelector(state => state.getDetail)
  const { id } = useParams()
  const DISPATCH = useDispatch()
  useEffect(() => {
    DISPATCH(getDogDetail(id));
  }, [DISPATCH, id]);
  console.log("DETAIL:", DETAIL);
  return (
    <div>
      <h2>Detail</h2>
      {DETAIL.weight ? (
        <div>
          <h2>Name: {DETAIL.name}</h2>
          <img src={DETAIL.image.url} width="300" alt={DETAIL.name} />
          <p>Temperament: {DETAIL.temperament}</p>
          <p>Age: {DETAIL.life_span}</p>
          <p>Weight: {DETAIL.weight?.metric}</p>
          <p>Height: {DETAIL.height?.metric}</p>
        </div>
      ) : null}
    </div>
  );
}
