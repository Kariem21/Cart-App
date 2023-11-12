import { useNavigate } from "react-router-dom";

const Categories = ({categories}) => {
  const nav = useNavigate();
  return (
    <div className="AllDivOfBtns">
      <div className="DivBtn">
        <button
          onClick={() => {
            nav(`/products`, { state: { categories: categories } });
          }}
          className="BTN"
        >
          Suggested Products
        </button>{" "}
      </div>
      {categories?.map((category, index) => (
        <div className="DivBtn" key={index}>
          <button
            className="BTN"
            onClick={() => {
              nav(`/category/${category}`, {
                state: { category: category, categories: categories },
              });
            }}
          >
            {category}
          </button>
        </div>
      ))}
    </div>
  );
};
export default Categories;
