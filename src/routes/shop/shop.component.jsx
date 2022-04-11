import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
 
import { fetchCategoriesStart } from "../../store/categories/category.action";

import "./shop.styles.scss";
const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
