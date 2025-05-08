# Atividade 01 - HTML DOM - Programação para Web

## Professor: Augusto César Oliveira
## Disciplina: Programação IV
## Discente: Gabriel Gomes Barbosa

# 🍰 Vitrine de Sobremesas com Carrinho de Compras

Este projeto é uma aplicação web responsiva que exibe uma lista de sobremesas, permitindo aos usuários adicionar itens ao carrinho de compras, ajustar quantidades e visualizar um resumo do pedido. O sistema foi desenvolvido como parte de uma atividade prática com foco em manipulação de dados, DOM e interatividade usando HTML, CSS e JavaScript puro.

## ✅ Funcionalidades

- 📦 **Renderização dinâmica de produtos**  
  Os produtos são carregados automaticamente a partir de um arquivo externo `data.json` e exibidos no layout da loja.

- ➕➖ **Adicionar e remover itens do carrinho**  
  Cada produto possui um botão “Adicionar” que insere o item no carrinho. Também é possível remover ou diminuir sua quantidade diretamente do carrinho.

- 🔢 **Ajuste de quantidades**  
  O usuário pode aumentar ou diminuir a quantidade de cada item no carrinho com os botões "+" e "−".

- 💰 **Cálculo automático de subtotais e total**  
  O sistema calcula automaticamente:
  - Subtotal individual por produto (quantidade × preço)
  - Total geral do pedido

- 🧾 **Resumo do pedido com modal de confirmação**  
  Ao clicar em “Finalizar Pedido”, um modal exibe todos os itens adicionados com suas quantidades, subtotais e o valor total da compra.

- ♻️ **Limpeza do carrinho após confirmação**  
  Após a finalização, o carrinho é esvaziado e a aplicação fica pronta para um novo pedido.

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3 (Flexbox & Grid)
- JavaScript (DOM, Events, JSON Fetch)

