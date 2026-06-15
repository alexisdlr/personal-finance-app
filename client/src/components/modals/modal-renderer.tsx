// components/modals/modal-renderer.tsx

"use client";

import { useModalStore } from "@/store/modal-store";

import BudgetModal from "./budget-modal";
import DeleteModal from "./delete-modal";
import PotsModal from "./pots-modal";
import PotMoneyModal from "./pot-money-modal";
import TransactionModal from "./transaction-modal";

export default function ModalRenderer() {
  const { type, isOpen } = useModalStore();

  if (!isOpen) return null;

  switch (type) {
    case "CREATE_BUDGET":
      return <BudgetModal mode="create" />;

    case "EDIT_BUDGET":
      return <BudgetModal mode="edit" />;

    case "DELETE_BUDGET":
      return <DeleteModal module="budget" />;

    case "CREATE_POT":
      return <PotsModal mode="create" />;

    case "EDIT_POT":
      return <PotsModal mode="edit" />;

    case "ADD_MONEY":
      return <PotMoneyModal mode="add" />;

    case "WITHDRAW_MONEY":
      return <PotMoneyModal mode="withdraw" />;

    case "DELETE_POT":
      return <DeleteModal module="pot" />;

    case "CREATE_TRANSACTION":
      return <TransactionModal mode="create" />;

    case "EDIT_TRANSACTION":
      return <TransactionModal mode="edit" />;

    default:
      return null;
  }
}
