import { formatPrice } from "@/lib/utils";
import { Budget, BudgetWithData, Transaction } from "@/types/global";
import { Edit, Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LatestSpending from "./latest-sepending";
import { useModalStore } from "@/store/modal-store";
import { useIsDemoUser } from "@/hooks/use-is-demo-user";
import { TransactionData } from "@/types/api";

type BudgetCardProps = {
  budget: BudgetWithData;
  transactions: TransactionData[];
  theme: string;
};

const BudgetCard = ({ budget, transactions, theme }: BudgetCardProps) => {
  const { openModal } = useModalStore();
  const { isReadOnly } = useIsDemoUser();
  const spent = transactions
    .filter(
      (transaction) =>
        transaction.category === budget.category && transaction.amount < 0,
    )
    .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

  return (
    <div className="max-w-150 w-full h-full">
      <div className="bg-white p-4 md:p-8 rounded-2xl shadow-md flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center h-full">
              <div
                className="size-4 rounded-full"
                style={{ backgroundColor: `${theme}` }}
              ></div>
              <h2 className="text-xl font-bold">{budget.category}</h2>
            </div>
            {!isReadOnly && (
              <div className="ml-auto relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      {" "}
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white rounded-xl shadow-md p-2">
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="cursor-pointer font-light"
                        onClick={() =>
                          openModal("EDIT_BUDGET", {
                            id: budget.id,
                            category: budget.category,
                            maximum: budget.maximum,
                            theme: budget.theme,
                          })
                        }
                      >
                        Edit Budget
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-200 my-0.5 max-w-[90%] mx-auto" />

                      <DropdownMenuItem
                        className="cursor-pointer font-light text-red-500"
                        onClick={() =>
                          openModal("DELETE_BUDGET", { id: budget.id })
                        }
                      >
                        Delete Budget
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
          <span className="text-sm my-4 text-gray-500">
            Maximum of {formatPrice(budget.maximum)}
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-4 bg-gray-200 rounded-XL overflow-hidden">
          <div
            className="h-full "
            style={{
              backgroundColor: `${theme}`,
              width: `${(spent / budget.maximum) * 100}%`,
            }}
          ></div>
        </div>
        <div className="grid grid-cols-2 items-center">
          <div className="flex gap-2 items-center h-12 mt-4">
            <div
              className="w-1 h-full rounded-xl"
              style={{ backgroundColor: `${theme}` }}
            />
            <div className="flex flex-col items-start gap-2">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="text-md font-semibold">
                {formatPrice(spent)}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center h-12 mt-4">
            <div className="w-1 h-full rounded-xl bg-gray-200" />
            <div className="flex flex-col items-start gap-2">
              <span className="text-sm text-gray-500">Remaining</span>
              <span className="text-md font-semibold">
                {formatPrice(budget.maximum - spent)}
              </span>
            </div>
          </div>
        </div>
        <LatestSpending
          transactions={transactions.filter(
            (transaction) => transaction.category === budget.category,
          )}
        />
      </div>
    </div>
  );
};

export default BudgetCard;
