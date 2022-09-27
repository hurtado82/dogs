import { useEffect } from "react";
import { useParams } from "react-router-dom";
import defaultDog from "../images/default.jpg"
import { getDogDetail } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function DogDetail() {
  const { name, image, weight, temperament, life_span, height, age } = useSelector(
    (state) => state.getDetail
  );
  const { id } = useParams()
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]);
  return (
    <div>
      {weight ? (
        <div>
          <h2>{name}</h2>
          <img src={image ? image.url : defaultDog} width="600" alt={name} />
          <p>Temperament: {temperament}</p>
          <p>Age: {life_span || age}</p>
          <p>Weight: {weight?.metric || weight}</p>
          <p>Height: {height?.metric || height}</p>
        </div>
      ) : null}
    </div>
  );
}
