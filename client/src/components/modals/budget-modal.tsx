"use client";
import * as z from "zod";
import useCreateBudget from "@/hooks/budgets/use-create-budget";
import { useEffect } from "react";
import { useModalStore } from "@/store/modal-store";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { BUDGET_CATEGORIES, BUDGET_THEMES } from "@/lib/budget-options";
import { CreateBudgetSchema } from "@/lib/validator";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

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
import useUpdateBudget from "@/hooks/budgets/use-update-budget";
import toast from "react-hot-toast";

type BudgetModalProps = {
  mode: "create" | "edit";
};

export default function BudgetModal({ mode }: BudgetModalProps) {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const payload = useModalStore((state) => state.payload);
  const createBudgetMutation = useCreateBudget();
  const updateBudgetMutation = useUpdateBudget();
  const budget = payload;

  const form = useForm<z.infer<typeof CreateBudgetSchema>>({
    resolver: zodResolver(CreateBudgetSchema),
    defaultValues: {
      category: budget?.category ?? "",
      maximum: budget?.maximum ?? 0,
      theme: budget?.theme ?? "",
    },
  });
  useEffect(() => {
    if (budget) {
      form.reset({
        category: budget.category,
        maximum: budget.maximum,
        theme: budget.theme,
      });
    } else {
      form.reset({
        category: "",
        maximum: 0,
        theme: "",
      });
    }
  }, [budget, form]);

  const onSubmit = async (data: z.infer<typeof CreateBudgetSchema>) => {
    try {
      if (mode === "create") {
        const response = await createBudgetMutation.mutateAsync(data);
        console.log(response);
        if (response.newBudget || response.message == "Success") {
          console.log("Budget created successfully");
          toast.success(response.message || "Budget Created!");
        } else {
          console.error("Error creating budget:", response.error);
          toast.error("Error creating budget");
        }

        if (response.error) {
          console.error("Error creating budget:", response.error);
        }
      } else {
        const dataMutation = {
          id: budget.id,
          ...data,
        };

        const response = await updateBudgetMutation.mutateAsync(dataMutation);

        if (response.updatedBudget || response.message == "Success") {
          toast.success(response.message || "Budget Updated!");
        } else {
          toast.error("Error updating budget");
        }
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
      <DialogContent className="sm:max-w-140 bg-white rounded-2xl! p-6 sm:p-10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-5">
            {mode === "create" ? "Add New Budget" : "Edit Budget"}
          </DialogTitle>

          <DialogDescription className="text-base font-light text-gray-500 ">
            {mode === "create"
              ? "Choose a category to set a spending budget. These categories can help you monitor spending."
              : "As your budgets change, feel free to update your spending limits."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-4"
          >
            {/* CATEGORY */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-gray-500">
                    Budget Category
                  </FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full p-3">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectGroup>
                        {BUDGET_CATEGORIES.map((category) => (
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

            {/* MAXIMUM */}
            <FormField
              control={form.control}
              name="maximum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-gray-500">
                    Maximum Spend
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 2000"
                      className="h-12 rounded-lg"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* THEME */}
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-gray-500">
                    Theme
                  </FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full p-3">
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectGroup>
                        {BUDGET_THEMES.map((theme) => (
                          <SelectItem key={theme.name} value={theme.hexCode}>
                            <div className="flex items-center gap-2">
                              <div
                                className="size-3 rounded-full"
                                style={{ backgroundColor: theme.hexCode }}
                              />
                              <span>{theme.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-2 h-12 bg-black text-white rounded-lg font-bold text-md py-4"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : mode === "create" ? (
                "Add Budget"
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
