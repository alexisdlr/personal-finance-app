import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
/* ROUTE IMPORTS */
import authRoutes from "./routes/auth.routes";
import { authenticateToken } from "./middleware/auth-middleware";
import { errorHandler } from "./middleware/error-handler";
import potRoutes from "./routes/pots.routes";
import overviewRoutes from "./routes/overview.routes";
import checkSessionRoutes from "./routes/check_session.routes";
/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Agrega la URL de tu frontend de Next.js, por ejemplo, "http://localhost:3000"
    credentials: true, // Permite el envío de cookies y encabezados de autenticación
  })
);

/* ROUTES */

app.use("/api", authRoutes); // http://localhost:8000/api/login
app.use("/api/pots", authenticateToken, potRoutes);
app.use("/api/overview", authenticateToken, overviewRoutes);
app.use("/api",checkSessionRoutes);
// app.use("/products", productRoutes); // http://localhost:8000/products
// app.use("/users", userRoutes); // http://localhost:8000/users
// app.use("/expenses", expenseRoutes); // http://localhost:8000/expenses
app.use(errorHandler);

/* SERVER */

const { PORT: port = "" } = process.env;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
