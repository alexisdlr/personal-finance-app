"use client";
import * as z from "zod";
import useCreateBudget from "@/hooks/budgets/use-create-budget";
import { useEffect } from "react";
import { useModalStore } from "@/store/modal-store";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { BUDGET_THEMES } from "@/lib/budget-options";
import { CreatePotSchema } from "@/lib/validator";

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

type PotsModalProps = {
  mode: "create" | "edit";
};

export default function PotsModal({ mode }: PotsModalProps) {
  const { payload, closeModal, isOpen } = useModalStore((state) => state);
  const createBudgetMutation = useCreateBudget();
  const updateBudgetMutation = useUpdateBudget();
  const pot = payload;
  console.log(pot);
  const form = useForm<z.infer<typeof CreatePotSchema>>({
    resolver: zodResolver(CreatePotSchema),
    defaultValues: {
      name: pot?.name ?? "",
      target: pot?.target ?? 0,
      theme: pot?.theme ?? "",
    },
  });
  useEffect(() => {
    if (pot) {
      form.reset({
        name: pot.name,
        target: pot.target,
        theme: pot.theme,
      });
    } else {
      form.reset({
        name: "",
        target: 0,
        theme: "",
      });
    }
  }, [pot, form]);

  const onSubmit = async (data: z.infer<typeof CreatePotSchema>) => {
    try {
      // if (mode === "create") {
      //   const response = await createBudgetMutation.mutateAsync(data);
      //   console.log(response);
      //   if (response.newBudget || response.message == "Success") {
      //     console.log("Budget created successfully");
      //     toast.success(response.message || "Budget Created!");
      //   } else {
      //     console.error("Error creating budget:", response.error);
      //     toast.error("Error creating budget");
      //   }

      //   if (response.error) {
      //     console.error("Error creating budget:", response.error);
      //   }
      // } else {
      //   const dataMutation = {
      //     id: pot.id,
      //     ...data,
      //   };
      //   console.log("Edit", dataMutation);

      //   const response = await updateBudgetMutation.mutateAsync(dataMutation);

      //   if (response.updatedBudget || response.message == "Success") {
      //     console.log("Budget updated successfully");
      //     toast.success(response.message || "Budget Updated!");
      //   } else {
      //     console.error("Error updating budget:", response.error);
      //     toast.error("Error updating budget");
      //   }

      //   if (response.error) {
      //     console.error("Error updated budget:", response.error);
      //   }
      // }

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
      <DialogContent className="sm:max-w-[560px] bg-white !rounded-2xl p-6 sm:p-10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-5">
            {mode === "create" ? "Add New Pot" : "Edit Pot"}
          </DialogTitle>

          <DialogDescription className="text-base font-light text-gray-500 ">
            {mode === "create"
              ? "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
              : "If your saving targets change, feel free to update your pots."}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-gray-500">
                    Pot Name
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. Rainy Days"
                      className="h-12 rounded-lg"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* MAXIMUM */}
            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-gray-500">
                    Target
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
                "Add Pot"
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
