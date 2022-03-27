import "./directory.styles.scss";
import "../category-item/category-item.component";
import CategoryItem from "../category-item/category-item.component";
const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
export default Directory;
