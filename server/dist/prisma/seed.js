"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const data_json_1 = __importDefault(require("./data.json"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Insertar balance
        const balance = yield prisma.balance.create({
            data: {
                current: data_json_1.default.balance.current,
                income: data_json_1.default.balance.income,
                expenses: data_json_1.default.balance.expenses,
                user: { connect: { id: 6 } }, // Conectar con el usuario
            },
        });
        // Insertar transacciones
        for (const transaction of data_json_1.default.transactions) {
            yield prisma.transaction.create({
                data: {
                    avatar: transaction.avatar,
                    name: transaction.name,
                    category: transaction.category,
                    date: new Date(transaction.date),
                    amount: transaction.amount,
                    recurring: transaction.recurring,
                    user: { connect: { id: 6 } }, // Conectar con el usuario
                    balance: { connect: { id: balance.id } }, // Conectar con el balance
                },
            });
        }
        // Insertar presupuestos
        for (const budget of data_json_1.default.budgets) {
            yield prisma.budget.create({
                data: {
                    category: budget.category,
                    maximum: budget.maximum,
                    theme: budget.theme,
                    user: { connect: { id: 6 } }, // Conectar con el usuario
                },
            });
        }
        // Insertar pots
        for (const pot of data_json_1.default.pots) {
            yield prisma.pot.create({
                data: {
                    name: pot.name,
                    target: pot.target,
                    total: pot.total,
                    theme: pot.theme,
                    user: { connect: { id: 6 } }, // Conectar con el usuario
                    balance: { connect: { id: balance.id } }, // Conectar con el balance
                },
            });
        }
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
