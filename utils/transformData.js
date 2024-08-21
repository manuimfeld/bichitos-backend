const paymentMethodMap = {
  1: "Efectivo",
  2: "Transferencia",
  3: "Débito",
  4: "Crédito",
};

const providersMap = {
  1: "Señor Gonzales",
  2: "Merlo",
  3: "CYH",
  4: "Sergio",
  5: "Ulises",
};

const turnMap = {
  Mañana: 1,
  Tarde: 2,
};

function transformSale(sale) {
  return {
    ...sale,
    payment_method: paymentMethodMap[sale.payment_method_id] || "Desconocido",
    turn: turnMap[sale.turn] || "Desconocido",
  };
}

function reverseTransformSale(sale) {
  return {
    ...sale,
    payment_method_id:
      Object.keys(paymentMethodMap).find(
        (key) => paymentMethodMap[key] === sale.payment_method
      ) || null,
    created_by:
      Object.keys(providersMap).find(
        (key) => providersMap[key] === sale.created_by
      ) || null,
    turn:
      Object.keys(turnMap).find((key) => turnMap[key] === sale.turn) || null,
  };
}

module.exports = {
  transformSale,
  reverseTransformSale,
};
