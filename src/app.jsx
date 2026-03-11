import { useState } from "react";
import { Cart } from "./components/cart";
import { Header } from "./components/header";
import { ProductItem } from "./components/product-item";
import { products } from "./data";

import "./styles/app.css";

export function App() {
  const [filterSelected, setFilterSelected] = useState("all");
  const [cart, setCart] = useState([]);

  const productsFilters =
    filterSelected === "all"
      ? products
      : products.filter((product) => product.category === filterSelected);

  function handleOnChange(event) {
    setFilterSelected(event.target.value);
    // console.log(event.target.value);
  }

  function handleAddCart(idProduct) {
    const productSelected = products.find(
      (product) => product.id === idProduct,
    );

    if (productSelected) {
      setCart([...cart, productSelected]);
    }
    // console.log("id do produto", idProduct);
  }

  return (
    <>
      <div className="content-area">
        <Header />
        <main className="products-section">
          <h1 className="section-title">Produtos</h1>

          <div className="filters">
            <div className="filters-btns">
              <button
                className={filterSelected === "all" ? "active" : undefined}
                onClick={() => setFilterSelected("all")}
              >
                All
              </button>
              <button
                className={filterSelected === "beauty" ? "active" : undefined}
                onClick={() => setFilterSelected("beauty")}
              >
                Beauty
              </button>
              <button
                className={
                  filterSelected === "fragrances" ? "active" : undefined
                }
                onClick={() => setFilterSelected("fragrances")}
              >
                Fragrances
              </button>
              <button
                className={
                  filterSelected === "furniture" ? "active" : undefined
                }
                onClick={() => setFilterSelected("furniture")}
              >
                Furniture
              </button>
              <button
                className={
                  filterSelected === "groceries" ? "active" : undefined
                }
                onClick={() => setFilterSelected("groceries")}
              >
                Groceries
              </button>
            </div>
            <select value={filterSelected} onChange={handleOnChange}>
              <option value="all">All</option>
              <option value="beauty">Beauty</option>
              <option value="fragrances">Fragrances</option>
              <option value="furniture">Furniture</option>
              <option value="groceries">Groceries</option>
            </select>
          </div>

          <div className="products-grid" id="products-list">
            {productsFilters.map((product) => (
              <ProductItem
                key={`${product.id}-${product.title}`}
                title={product.title}
                price={product.price}
                category={product.category}
                thumbnail={product.thumbnail}
                onAddCart={() => handleAddCart(product.id)}
              />
            ))}
          </div>
        </main>
      </div>

      <Cart items={cart} />
    </>
  );
}
