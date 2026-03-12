import { useEffect, useState } from "react";
import { Cart } from "./components/cart";
import { Header } from "./components/header";
import { ProductItem } from "./components/product-item";
// import { products } from "./data";

import "./styles/app.css";

const CART_KEY = "shop365:cart";

export function App() {
  const [products, setProducts] = useState([]);
  const [filterSelected, setFilterSelected] = useState("all");
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(false);

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
      const itemExists = cart.find((item) => item.id === idProduct);
      let newCart = [];

      if (itemExists) {
        newCart = cart.map((item) => {
          if (item.id === idProduct) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      } else {
        const cartItem = {
          ...productSelected,
          quantity: 1,
        };

        newCart = [...cart, cartItem];
      }

      setCart(newCart);
      localStorage.setItem(CART_KEY, JSON.stringify(newCart));
    }
  }

  /** Recuperando dados do localStorage */
  useEffect(() => {
    const cartStorage = localStorage.getItem(CART_KEY);

    if (cartStorage) {
      const cartList = JSON.parse(cartStorage);

      setCart(cartList);
    }
  }, []);

  /** Recuperar produtos da api */
  useEffect(() => {
    // fetch("https://dummyjson.com/products", {
    //   method: "post",
    //   body: JSON.stringify({
    //     title: "teste",
    //     price: 250
    //   })
    // })
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          const productsFormated = data.products.map((product) => {
            return {
              id: product.id,
              title: product.title,
              price: product.price,
              category: product.category,
              thumbnail: product.thumbnail,
            };
          });

          setProducts(productsFormated);
        }
      })
      .catch(() => {
        setError(true);
        // console.log(error);
      });
  }, []);

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

          {error && (
            <div className="empty">
              <span>
                Houve um error! Nenhum produto encontrado no momento, tente mais
                tarde!
              </span>
            </div>
          )}
        </main>
      </div>

      <Cart items={cart} />
    </>
  );
}
