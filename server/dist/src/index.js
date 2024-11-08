"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
/* ROUTE IMPORTS */
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const auth_middleware_1 = require("./middleware/auth-middleware");
const error_handler_1 = require("./middleware/error-handler");
const pots_routes_1 = __importDefault(require("./routes/pots.routes"));
const overview_routes_1 = __importDefault(require("./routes/overview.routes"));
/* CONFIGURATIONS */
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL, // Agrega la URL de tu frontend de Next.js, por ejemplo, "http://localhost:3000"
    credentials: true // Permite el envío de cookies y encabezados de autenticación
}));
/* ROUTES */
app.use("/api", auth_routes_1.default); // http://localhost:8000/api/login
app.use("/api/pots", auth_middleware_1.authenticateToken, pots_routes_1.default);
app.use("/api/overview", auth_middleware_1.authenticateToken, overview_routes_1.default);
// app.use("/products", productRoutes); // http://localhost:8000/products
// app.use("/users", userRoutes); // http://localhost:8000/users
// app.use("/expenses", expenseRoutes); // http://localhost:8000/expenses
app.use(error_handler_1.errorHandler);
/* SERVER */
const port = Number(process.env.PORT) || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
