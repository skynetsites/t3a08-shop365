export function currencyFormat(value) {
    return new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}