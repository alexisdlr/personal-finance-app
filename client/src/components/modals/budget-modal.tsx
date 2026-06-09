"use client";

import * as z from "zod";
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
import { useModalStore } from "@/store/modal-store";
type BudgetModalProps = {
  mode: "create" | "edit";
};
import { useEffect } from "react";
export default function BudgetModal({ mode }: BudgetModalProps) {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const payload = useModalStore((state) => state.payload);

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
        console.log("Create", data);

        // await createBudgetMutation.mutateAsync(data);
      } else {
        console.log("Edit", {
          id: budget.id,
          ...data,
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
          <DialogTitle className="text-3xl font-bold">
            {mode === "create" ? "Add New Budget" : "Edit Budget"}
          </DialogTitle>

          <DialogDescription className="text-base font-normal text-gray-500 mt-4">
            {mode === "create"
              ? "Choose a category to set a spending budget."
              : "Update your budget settings."}
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
                          <SelectItem key={theme} value={theme}>
                            {theme}
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
              className="h-12 mt-2"
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
