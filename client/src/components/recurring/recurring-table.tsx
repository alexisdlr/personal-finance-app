import { recurringColumns } from "./recurring-columns";
import { Transaction } from "@/types/global";
import Table from "../transactions/table";

type Props = {
  recurringBills: Transaction[];
};

export default function RecurringBillsTable({ recurringBills }: Props) {
  console.log(recurringBills);
  return (
    <div className="bg-white rounded-xl p-6">
      <Table columns={recurringColumns} data={recurringBills} />
    </div>
  );
}
