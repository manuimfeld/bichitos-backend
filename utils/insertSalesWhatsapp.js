/* 

const paymentMethods = {
  e: 1, // Efectivo
  ef: 1, // Efectivo
  efectivo: 1, // Efectivo
  qr: 2, // QR
  q: 2, // QR
  t: 2, // Transfrnecia
  tr: 2, // Transfrnecia
  transf: 2, // Transfrnecia
  transferencia: 2, // Transfrnecia
  d: 3, // Débito
  debito: 3, // Débito
  débito: 3, // Débito
  c: 4, // Tarjeta de crédito (sinónimo)
  crédit: 4, // Tarjeta de crédito (sinónimo)
  credit: 4, // Tarjeta de crédito (sinónimo)
  credito: 4, // Tarjeta de crédito (sinónimo)
  crédito: 4, // Tarjeta de crédito (sinónimo)
};

const processMessage = (message) => {
    // Divide el mensaje en monto y método de pago (puede haber variaciones en la separación)
    const parts = message.split(" ");
  
    // Suponemos que el monto es la primera parte y el método de pago es el resto
    const amount = parseInt(parts[0], 10);
    const method = parts.slice(1).join(" ").toLowerCase();
  
    // Obtén el ID del método de pago
    const paymentMethodId = paymentMethods[method] || null;
  
    // Retorna el objeto con el formato requerido
    return {
      amount: amount,
      customer_dni: null,
      turn: 2,
      sale_date: "2024-08-03 20:49:30.600036+00",
      created_by: 1,
      payment_method_id: paymentMethodId,
    };
  };

  SalesController:
  insertMultipleSales: async (req, res) => {
    const salesArray = req.body.messages;

    if (!Array.isArray(salesArray)) {
      return res.status(400).json({
        error:
          'El cuerpo de la solicitud debe contener un array en la propiedad "messages".',
      });
    }

    const processedMessages = salesArray.map(processMessage);

    try {
      for (const sale of processedMessages) {
        // Aquí se asume que `createSale` maneja la respuesta de forma interna
        await salesController.createSale(
          {
            body: sale,
          },
          {
            status: () => ({
              json: (response) => console.log(response), // Puedes ajustar esto según tus necesidades
            }),
          }
        );
      }
      res.status(200).json({ message: "Ventas insertadas correctamente." });
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ error: "Error al insertar ventas." });
      }
    }
  } 
    
  Routes:
  router.post("/sales", salesController.insertMultipleSales);
  
  */
