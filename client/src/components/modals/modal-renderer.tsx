// components/modals/modal-renderer.tsx

"use client";

import { useModalStore } from "@/store/modal-store";

import BudgetModal from "./budget-modal";
import DeleteModal from "./delete-modal";
// import PotModal from "./pot-modal";

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
    // case "CREATE_POT":
    // return <PotModal mode="create" />;

    default:
      return null;
  }
}
