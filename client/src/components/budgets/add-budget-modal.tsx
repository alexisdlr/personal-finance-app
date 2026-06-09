"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type AddBudgetModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddBudgetModal({
  open,
  onOpenChange,
}: AddBudgetModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] bg-white rounded-lg p-6 sm:p-10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Add New Budget
          </DialogTitle>

          <DialogDescription className="text-base font-normal text-gray-500 mt-4">
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-5 mt-4">
          {/* CATEGORY */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500">
              Budget Category
            </label>

            <Select>
              <SelectTrigger className="w-full p-3">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="bills">Bills</SelectItem>
                  <SelectItem value="dining-out">Dining Out</SelectItem>
                  <SelectItem value="personal-care">Personal Care</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* MAXIMUM */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500">
              Maximum Spend
            </label>

            <Input
              type="number"
              placeholder="e.g. 2000"
              className="h-12 rounded-lg border px-4"
            />
          </div>

          {/* THEME */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500">Theme</label>

            <Select>
              <SelectTrigger className="w-full p-3">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="navy">Navy</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="h-12 mt-2">
            Add Budget
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
