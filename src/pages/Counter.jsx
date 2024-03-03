import { useDispatch, useSelector } from "react-redux";
import { decrease, increase, setCount } from "../redux/slices/counterSlice";

const Counter = () => {
  // dispatch mantığı değişmyor classıc reduxla aynı
  const dispatch = useDispatch();
  //abone olma mantığı classıc redux ile aynı
  const store = useSelector((store) => store.counterReducer);

  // console.log(store);
  console.log(store);
  return (
    <div className="vh-100 w-full d-flex justify-content-center align-items-center">
      <div className="d-flex justify-content-center align-items-center gap-4">
        <button onClick={() => dispatch(decrease())} className="btn btn-danger">
          -
        </button>
        <span className="lead fw-bold">{store.count}</span>
        <button
          onClick={() => dispatch(increase())}
          className="btn btn-success"
        >
          +
        </button>
        <input
          type="number"
          className="w-25"
          onChange={(e) => dispatch(setCount(Number(e.target.value)))}
        />
      </div>
    </div>
  );
};
//! number yazmak yerine +e.target.value yazınca js onu yine number olarak alıyor kısa yol.yani setCount(+e.target.value) yazabiliriz.
export default Counter;
