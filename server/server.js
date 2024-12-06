import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";

// Configuración del token de acceso de Mercado Pago
mercadopago.configurations.setAccessToken("APP_USR-5181144483191244-112522-0efaa87f0cd0094623fd5b1719dc6acf-2093424471");

const app = express();
const port = 8080;

// Middleware
app.use(cors({
  origin: '*', // Permitir todos los orígenes para pruebas
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Ruta principal para verificar el estado del servidor
app.get("/", (req, res) => {
  res.send("El servidor está funcionando correctamente.");
});

// Ruta para crear una preferencia de Mercado Pago
app.post("/create_preference", async (req, res) => {
  try {
    const { title, quantity, price } = req.body; // Recibiendo datos desde el frontend

    // Validar datos recibidos
    const validatedTitle = typeof title === "string" && title.trim() !== "" ? title : "Producto Genérico";
    const validatedQuantity = Number(quantity) > 0 ? Number(quantity) : 1;
    const validatedPrice = Number(price) > 0 ? Number(price) : 100000;

    const preference = {
      items: [
        {
          title: validatedTitle,
          quantity: validatedQuantity,
          unit_price: validatedPrice,
          currency_id: "COP",
        },
      ],
      payer: {
        email: "test_user_925634084@testuser.com", // Email de prueba de Mercado Pago
      },
      back_urls: {
        success: "https://planta-vida-git-develop-tatianiita2005gmailcoms-projects.vercel.app/",
        failure: "https://planta-vida-git-develop-tatianiita2005gmailcoms-projects.vercel.app/",
        pending: "https://planta-vida-git-develop-tatianiita2005gmailcoms-projects.vercel.app/",
      },
      auto_return: "approved",
    };

    // Crear preferencia en Mercado Pago
    const result = await mercadopago.preferences.create(preference);

    res.json({
      id: result.body.id,
    });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    res.status(500).json({ error: "Error al crear la preferencia" });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
