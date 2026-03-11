<div align="center">
  <img src="./public/logotipo.png" alt="Logotipo Shop365" width="280">
</div>

Template de e-commerce **Shop365** em **React**, desenvolvido na **Trilha 3, Fase 1, Aula 3** da Jornada Dev. O projeto parte da **estrutura em HTML e CSS** construída anteriormente e foi **migrado para React** para praticar **eventos**, **estado**, **renderização condicional** e **imutabilidade** (arrays e objetos).

---

## Contexto

Este repositório contém a versão em React do Shop365, com foco nos seguintes temas:

| #   | Tema                         | Descrição                                                    |
|-----|------------------------------|--------------------------------------------------------------|
| 17  | Events                       | Tratamento de eventos (onClick, onChange) em componentes     |
| 18  | Mudança de estado condicional| Atualizar state conforme ações do usuário                    |
| 19  | Renderização Condicional     | Exibir UI com base em estado (filtros, classes ativas)      |
| 21  | Múltiplos States             | Uso de mais de um `useState` quando necessário              |
| 22  | Imutabilidade                | Atualizar estado sem mutar o valor anterior                 |
| 23  | Imutabilidade de Matrizes    | Adicionar/remover em arrays com cópias (ex.: spread)         |
| 24  | State de Matrizes            | Estado como array (ex.: itens do carrinho)                   |
| 25  | Imutabilidade de objeto      | Atualizar objetos criando novos (ex.: spread em objetos)     |
| 26  | State de Objetos             | Estado como objeto (ex.: item do carrinho com quantidade)   |

O layout e o design system seguem o protótipo **Shop365** no Figma.

---

## Dados utilizados

Os produtos vêm do arquivo **`src/data.js`**, que exporta um array de objetos no formato compatível com a [DummyJSON – Products](https://dummyjson.com/docs/products#products-all) (id, title, price, category, thumbnail). Você pode trocar por `fetch` em `GET https://dummyjson.com/products` quando quiser consumir a API diretamente.

---

## Protótipo (Figma)

- **Projeto:** [Shop365](https://www.figma.com/design/03N1kcCxpOtDmaa1KrHu2F/Shop365?node-id=0-1&t=WTChjrHOK6rRCPtd-1)

---

## O que já foi implementado no código

### `src/app.jsx`
- **State `filterSelected`** — Controla o filtro de categoria (all, beauty, fragrances, furniture, groceries).
- **Lista filtrada** — `productsFilters` deriva do state: lista completa ou filtrada por `product.category`.
- **Eventos** — `onClick` nos botões de filtro e `onChange` no `<select>` chamam `setFilterSelected` (mudança de estado condicional).
- **Renderização condicional** — Classe `active` nos botões conforme `filterSelected`; grid de produtos reage ao filtro.
- **Lista de produtos** — `.map()` nos `productsFilters` renderizando `<ProductItem>` com `key`, title, price, category, thumbnail.

### `src/components/product-item.jsx`
- **Card do produto** — Recebe `title`, `category`, `price`, `thumbnail` como props.
- **Formatação de preço** — `Intl.NumberFormat` em pt-BR.
- **Botão "Adicionar ao carrinho"** — Presente na UI (próximo passo: conectar a um state de carrinho).

### `src/components/cart.jsx`
- **Layout do carrinho** — Seção lateral com itens, total e botão "Finalizar compra".
- Itens e total ainda **estáticos**; ao implementar o carrinho dinâmico, use **state de matrizes** (array de itens) e **imutabilidade** ao adicionar/remover.

### `src/components/header.jsx`
- **Header** — Logo Shop365.

### `src/data.js`
- **`products`** — Array de produtos (beauty, fragrances, furniture, groceries) para listagem e filtros.

---

## Desafio: carrinho dinâmico com state e imutabilidade

**Objetivo:** ao clicar em **"Adicionar ao carrinho"** no card do produto, o item deve **aparecer no carrinho** (barra lateral) e o total deve ser recalculado.

Sugestões alinhadas aos conceitos da aula:

1. **State de matrizes** — Um state `cartItems` (array) no `App` ou em um componente pai, com itens no formato `{ id, title, brand ou category, price, quantity }`.
2. **Imutabilidade de matrizes** — Ao adicionar: `setCartItems([...cartItems, newItem])` ou, para aumentar quantidade, criar novo array (ex.: com `.map()` ou encontrar índice e substituir só esse item).
3. **Imutabilidade de objeto** — Ao atualizar quantidade ou qualquer campo de um item, criar novo objeto (ex.: `{ ...item, quantity: item.quantity + 1 }`) e novo array, nunca mutar o state diretamente.
4. **Events** — Passar um callback (ex.: `onAddToCart(product)`) do `App` para `ProductItem`; no clique do botão, chamar esse callback.
5. **Renderização condicional** — Carrinho vazio: mostrar mensagem ou esconder total; botão "Finalizar compra" habilitado apenas quando `cartItems.length > 0`.
6. **Múltiplos states** — Se fizer sentido, separar total em um state derivado ou calcular a partir de `cartItems` na renderização.

Assim você pratica **Events**, **mudança de estado condicional**, **renderização condicional**, **state de matrizes/objetos** e **imutabilidade**.

---

## Estrutura do projeto

```
aula3-shop365/
├── index.html              # Página HTML (root, scripts)
├── src/
│   ├── main.jsx            # Entrada React (createRoot, <App />)
│   ├── app.jsx             # App: state do filtro, eventos, lista e <Cart />
│   ├── data.js             # Array de produtos
│   ├── components/
│   │   ├── header.jsx      # Header com logo
│   │   ├── product-item.jsx# Card do produto (props, botão adicionar)
│   │   └── cart.jsx        # Carrinho (lateral)
│   └── styles/
│       ├── app.css
│       ├── main.css
│       └── variables.css
├── package.json
└── README.md
```

---

## Como rodar

1. Clone ou baixe o projeto.
2. Instale as dependências: `npm install`
3. Suba o servidor de desenvolvimento: `npm run dev`
4. Acesse no navegador o endereço indicado (em geral `http://localhost:5173`).
5. Para build de produção: `npm run build`

---

## Trilha e data

- **Trilha:** 3  
- **Fase:** 1  
- **Aula:** 3  
- **Conteúdo:** migração do template Shop365 (HTML/CSS) para React, com foco em eventos, estado, renderização condicional, múltiplos states e imutabilidade (matrizes e objetos).
