import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDogDetail } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function DogDetail() {
  const { name, image, weight, temperament, life_span, height } = useSelector(
    (state) => state.getDetail
  );
  const { id } = useParams()
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]);
  return (
    <div>
      <h2>Detail</h2>
      {weight ? (
        <div>
          <h2>{name}</h2>
          <img src={image.url} width="600" alt={name} />
          <p>Temperament: {temperament}</p>
          <p>Age: {life_span}</p>
          <p>Weight: {weight?.metric}</p>
          <p>Height: {height?.metric}</p>
        </div>
      ) : null}
    </div>
  );
}
