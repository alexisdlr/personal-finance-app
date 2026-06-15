"use client";

import * as z from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import useCreatePot from "@/hooks/pots/use-create-pot";
import useUpdatePot from "@/hooks/pots/use-update-pot";
import { useModalStore } from "@/store/modal-store";
import { BUDGET_THEMES } from "@/lib/budget-options";
import { CreatePotSchema } from "@/lib/validator";
import { PotData } from "@/types/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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

type PotsModalProps = {
  mode: "create" | "edit";
};

const getDefaultValues = (
  pot?: PotData | null,
): z.infer<typeof CreatePotSchema> => ({
  name: pot?.name ?? "",
  target: pot?.target ?? 0,
  theme: pot?.theme ?? "",
});

export default function PotsModal({ mode }: PotsModalProps) {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const payload = useModalStore((state) => state.payload) as
    | PotData
    | null
    | undefined;

  const createPotMutation = useCreatePot();
  const updatePotMutation = useUpdatePot();
  const pot = payload;

  const form = useForm<z.infer<typeof CreatePotSchema>>({
    resolver: zodResolver(CreatePotSchema),
    defaultValues: getDefaultValues(pot),
  });

  useEffect(() => {
    form.reset(getDefaultValues(pot));
  }, [pot, form]);

  const isSubmitting =
    form.formState.isSubmitting ||
    createPotMutation.isPending ||
    updatePotMutation.isPending;

  const onSubmit = async (data: z.infer<typeof CreatePotSchema>) => {
    try {
      if (mode === "create") {
        const response = await createPotMutation.mutateAsync(data);

        if (response.message?.toLowerCase() === "success") {
          toast.success(response.message || "Pot created!");
          closeModal();
        } else {
          toast.error(response.error || "Error creating pot");
        }
      } else {
        if (!pot?.id) {
          toast.error("Pot not found");
          return;
        }

        const response = await updatePotMutation.mutateAsync({
          id: pot.id,
          ...data,
        });

        if (response.message?.toLowerCase() === "success") {
          toast.success(response.message || "Pot updated!");
          closeModal();
        } else {
          toast.error(response.error || "Error updating pot");
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
      <DialogContent className="sm:max-w-[560px] bg-white !rounded-2xl p-6 sm:p-10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-5">
            {mode === "create" ? "Add New Pot" : `Edit '${pot?.name}'`}
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
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-gray-500">
                    Theme
                  </FormLabel>

                  <Select onValueChange={field.onChange} value={field.value}>
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
              className="cursor-pointer mt-2 h-12 bg-black text-white rounded-lg font-bold text-md py-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
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
