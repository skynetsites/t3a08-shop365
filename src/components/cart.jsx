import { currencyFormat } from "../utils/numberFormatters";

export function Cart({ items = [], onCartQuant }) { // adicionado "onCartQuant" nas props para controlar a quantidade dos itens do carrinho
  const total = items.reduce(
    (acumulador, itemAtual) => acumulador + itemAtual.price * itemAtual.quantity,
    0,
  ); // antes somava apenas o preço (itemAtual.price) e agora multiplica pelo quantity para calcular o total correto

  return (
    <aside className="cart-section">
      <h2 className="section-title">Meu Carrinho</h2>

      <p className="cart-label">ITENS</p>

      <div className="cart-items" id="cart-items">
        {items.map((item) => (
          <div className="cart-item" key={item.id}>
            <div 
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "1.25rem"
              }}
            >
              <div className="product-image" 
                style={{ 
                  width: "7rem", 
                  height: "7rem", 
                  padding: "1rem",
                  //marginRight: ".5rem" 
                }}
              >
                <img src={item.thumbnail} alt={item.title} /> 
                {/* adicionada imagem do produto no carrinho */}
              </div>
              <div className="item-details">
                <h4>{item.title}</h4>
                <p>{item.category}</p>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    overflow: "hidden",
                    marginTop: ".75rem",
                    borderRadius: ".3125rem",
                    border: ".0625rem solid #ccc",
                  }}
                >
                  <button
                    onClick={() => onCartQuant(item.id, -1)}
                    // botão para diminuir a quantidade do item
                    style={{
                      width: "1.875rem",
                      height: "1.875rem",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                   -
                  </button>
                  <span
                    style={{
                      minWidth: "1.25rem",
                      textAlign: "center",
                    }}
                  >
                    {item.quantity}
                    {/* exibe a quantidade atual do produto */}
                  </span>
                  <button
                    onClick={() => onCartQuant(item.id, 1)}
                    // botão para aumentar a quantidade do item
                    style={{
                      width: "1.875rem",
                      height: "1.875rem",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <span className="item-price">
              {" "}
              <span style={{ fontSize: 10, color: "#686868" }}>
                {item.quantity}x
              </span>{" "}
              {currencyFormat(item.price)}
            </span>
          </div>
        ))}

        {items.length === 0 && (
          <span className="empty-cart">
            Nenhum item adicionado até o momento!
          </span>
        )}
      </div>
      <div className="cart-divider"></div>

      <div className="cart-footer">
        <div className="total-row">
          <span>Total</span>
          <span className="total-price">{currencyFormat(total)}</span>
        </div>
        <button className="checkout-btn" disabled={items.length === 0}>
          Finalizar compra
        </button>
      </div>
    </aside>
  );
}
