"use client";

import * as z from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import useAddPotMoney from "@/hooks/pots/use-add-pot-money";
import useWithdrawPotMoney from "@/hooks/pots/use-withdraw-pot-money";
import useFetchOverviewData from "@/hooks/overview/use-get-overview-data";
import { useModalStore } from "@/store/modal-store";
import { PotMoneySchema } from "@/lib/validator";
import { PotData } from "@/types/api";
import { formatPrice } from "@/lib/utils";

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

type PotMoneyModalProps = {
  mode: "add" | "withdraw";
};

export default function PotMoneyModal({ mode }: PotMoneyModalProps) {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const payload = useModalStore((state) => state.payload) as
    | PotData
    | null
    | undefined;

  const addPotMoneyMutation = useAddPotMoney();
  const withdrawPotMoneyMutation = useWithdrawPotMoney();
  const { data: overviewData } = useFetchOverviewData();

  const pot = payload;
  const currentBalance = overviewData?.data.balance ?? 0;
  const maxAddAmount = Math.max(
    0,
    Math.min(currentBalance, (pot?.target ?? 0) - (pot?.total ?? 0)),
  );
  const maxWithdrawAmount = pot?.total ?? 0;

  const form = useForm<z.infer<typeof PotMoneySchema>>({
    resolver: zodResolver(PotMoneySchema),
    defaultValues: { amount: 0 },
  });

  useEffect(() => {
    form.reset({ amount: 0 });
  }, [pot, form, mode]);

  const isSubmitting =
    form.formState.isSubmitting ||
    addPotMoneyMutation.isPending ||
    withdrawPotMoneyMutation.isPending;

  const onSubmit = async (data: z.infer<typeof PotMoneySchema>) => {
    if (!pot?.id) {
      toast.error("Pot not found");
      return;
    }

    if (mode === "add") {
      if (data.amount > currentBalance) {
        toast.error("Amount exceeds your current balance");
        return;
      }

      if (data.amount > maxAddAmount) {
        toast.error("Amount exceeds the remaining pot target");
        return;
      }
    } else if (data.amount > maxWithdrawAmount) {
      toast.error("Amount exceeds the total saved in this pot");
      return;
    }

    try {
      const response =
        mode === "add"
          ? await addPotMoneyMutation.mutateAsync({
              id: pot.id,
              amount: data.amount,
            })
          : await withdrawPotMoneyMutation.mutateAsync({
              id: pot.id,
              amount: data.amount,
            });

      if (response.message?.toLowerCase() === "success") {
        toast.success(
          mode === "add" ? "Money added to pot!" : "Money withdrawn from pot!",
        );
        closeModal();
      } else {
        toast.error(response.error || "Something went wrong");
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
      <DialogContent className="sm:max-w-[560px] bg-white rounded-2xl! p-6 sm:p-10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-5">
            {mode === "add"
              ? `Add to '${pot?.name ?? "Pot"}'`
              : `Withdraw from '${pot?.name ?? "Pot"}'`}
          </DialogTitle>

          <DialogDescription className="text-base font-light text-gray-500">
            {mode === "add"
              ? "Top up your pot by transferring money from your main balance. The amount added cannot exceed your current balance or the remaining target."
              : "Withdraw money from your pot back to your main balance. You can only withdraw up to the total saved in this pot."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 rounded-lg bg-beige-100 px-4 py-3 text-sm text-gray-600">
          {mode === "add" ? (
            <div className="flex flex-col gap-1">
              <span>
                Current balance:{" "}
                <strong className="text-gray-900">
                  {formatPrice(currentBalance)}
                </strong>
              </span>
              <span>
                Maximum add:{" "}
                <strong className="text-gray-900">
                  {formatPrice(maxAddAmount)}
                </strong>
              </span>
            </div>
          ) : (
            <span>
              Total saved:{" "}
              <strong className="text-gray-900">
                {formatPrice(maxWithdrawAmount)}
              </strong>
            </span>
          )}
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-4"
          >
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
                      placeholder="e.g. 100"
                      className="h-12 rounded-lg"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>

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
              ) : mode === "add" ? (
                "Confirm Addition"
              ) : (
                "Confirm Withdrawal"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
