"use client";

import * as z from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import useCreateTransaction from "@/hooks/transactions/use-create-transaction";
import useUpdateTransaction from "@/hooks/transactions/use-update-transaction";
import { useModalStore } from "@/store/modal-store";
import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
} from "@/lib/budget-options";
import { CreateTransactionSchema } from "@/lib/validator";
import { TransactionData } from "@/types/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DatePicker,
  formatFormDate,
  parseFormDate,
} from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TransactionModalProps = {
  mode: "create" | "edit";
};

const getTodayDate = () => formatFormDate(new Date());

const toInputDate = (date: string) => {
  const parsed = parseFormDate(date.split("T")[0]);

  return parsed ? formatFormDate(parsed) : getTodayDate();
};

const getDefaultValues = (
  transaction?: TransactionData | null,
): z.infer<typeof CreateTransactionSchema> => ({
  type: transaction
    ? transaction.amount < 0
      ? "expense"
      : "income"
    : "expense",
  name: transaction?.name ?? "",
  amount: transaction ? Math.abs(transaction.amount) : 0,
  category: transaction?.category ?? "",
  date: transaction?.date ? toInputDate(transaction.date) : getTodayDate(),
  recurring: transaction?.recurring ?? false,
});

export default function TransactionModal({ mode }: TransactionModalProps) {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const payload = useModalStore((state) => state.payload) as
    | TransactionData
    | null
    | undefined;

  const createTransactionMutation = useCreateTransaction();
  const updateTransactionMutation = useUpdateTransaction();
  const transaction = payload;

  const form = useForm<z.infer<typeof CreateTransactionSchema>>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: getDefaultValues(transaction),
  });

  useEffect(() => {
    form.reset(getDefaultValues(transaction));
  }, [transaction, form]);

  const isSubmitting =
    form.formState.isSubmitting ||
    createTransactionMutation.isPending ||
    updateTransactionMutation.isPending;

  const onSubmit = async (data: z.infer<typeof CreateTransactionSchema>) => {
    try {
      if (mode === "create") {
        const response = await createTransactionMutation.mutateAsync(data);

        if (response.message?.toLowerCase() === "success") {
          toast.success(response.message || "Transaction created!");
          closeModal();
        } else {
          toast.error(response.error || "Error creating transaction");
        }
      } else {
        if (!transaction?.id) {
          toast.error("Transaction not found");
          return;
        }

        const response = await updateTransactionMutation.mutateAsync({
          id: transaction.id,
          ...data,
        });

        if (response.message?.toLowerCase() === "success") {
          toast.success(response.message || "Transaction updated!");
          closeModal();
        } else {
          toast.error(response.error || "Error updating transaction");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <DialogContent className="sm:max-w-140 bg-white rounded-2xl! p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-4">
            {mode === "create" ? "Add New Transaction" : "Edit Transaction"}
          </DialogTitle>

          <DialogDescription className="text-base font-light text-gray-500">
            {mode === "create"
              ? "Record your income or expenses to keep your finances up to date."
              : "Update the details of this transaction."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-4"
          >
            {/* TRANSACTION TYPE */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-gray-500">
                    Transaction Type
                  </FormLabel>

                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full p-3">
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectGroup>
                        {TRANSACTION_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* RECIPIENT / SENDER */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-gray-500">
                    Recipient / Sender
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="e.g. John Doe"
                      className="h-12 rounded-lg"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* AMOUNT */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-gray-500">
                    Amount
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="e.g. 100.00"
                      className="h-12 rounded-lg"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CATEGORY */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-gray-500">
                    Category
                  </FormLabel>

                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full p-3">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectGroup>
                        {TRANSACTION_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TRANSACTION DATE */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-xs font-bold text-gray-500">
                    Transaction Date
                  </FormLabel>

                  <FormControl>
                    <DatePicker
                      value={parseFormDate(field.value)}
                      onChange={(date) =>
                        field.onChange(date ? formatFormDate(date) : "")
                      }
                      placeholder="Select transaction date"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* RECURRING */}
            <FormField
              control={form.control}
              name="recurring"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal text-gray-700">
                    This is a recurring transaction
                  </FormLabel>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-2 h-12 bg-black text-white rounded-lg font-bold text-md py-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : mode === "create" ? (
                "Add Transaction"
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
