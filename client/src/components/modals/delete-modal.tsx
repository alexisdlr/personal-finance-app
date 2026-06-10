"use client";

import { useModalStore } from "@/store/modal-store";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import useDeleteBudget from "@/hooks/budgets/use-delete-budget";

type BudgetModalProps = {
  module: "budget" | "pot";
};

export default function BudgetModal({ module }: BudgetModalProps) {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const payload = useModalStore((state) => state.payload);
  const deleteBudgetMutation = useDeleteBudget();
  const budgetId = payload?.id;

  const onConfirmDelete = async (data: { id: string }) => {
    try {
      if (module === "budget") {
        await deleteBudgetMutation.mutateAsync(data);

        if (deleteBudgetMutation.isSuccess) {
          console.log("Budget deleted successfully");
        } else {
          console.error("Error deleting budget:", deleteBudgetMutation.error);
        }

        if (deleteBudgetMutation.isError) {
          console.error("Error deleting budget:", deleteBudgetMutation.error);
        }
      } else {
        console.log("Edit", {
          id: budgetId,
        });

        // await updateBudgetMutation.mutateAsync(...)
      }

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <DialogContent className="sm:max-w-[560px] bg-white rounded-lg p-6 sm:p-10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-5">
            {module === "budget" ? "Delete Budget" : "Edit Budget"}
          </DialogTitle>

          <DialogDescription className="text-base font-normal text-gray-500 ">
            {module === "budget"
              ? "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
              : "Update your budget settings."}
          </DialogDescription>
        </DialogHeader>

        <Button
          type="button"
          className="h-12 mt-2 bg-red-500 text-white hover:bg-red-600"
          onClick={() => onConfirmDelete({ id: budgetId })}
        >
          Yes, confirm deletion
        </Button>
        <Button type="button" className="h-12 mt-2" onClick={closeModal}>
          No, go back
        </Button>
      </DialogContent>
    </Dialog>
  );
}
