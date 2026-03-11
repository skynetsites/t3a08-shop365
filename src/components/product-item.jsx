export function ProductItem({ title, category, price, thumbnail, onAddCart }) {
  const priceFormat = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={thumbnail} alt="Produto" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-brand">{category}</p>
        <div className="product-footer">
          <span className="product-price">{priceFormat}</span>
          <button className="add-cart-btn" onClick={onAddCart}>
            <i className="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
