import { recurringColumns } from "./recurring-columns";
import { TransactionData } from "@/types/api";
import Table from "../transactions/table";
import RecurringIcon from "../Icons/recurring-nav";

type Props = {
  recurringBills: TransactionData[];
};

export default function RecurringBillsTable({ recurringBills }: Props) {
  return (
    <div className="bg-white rounded-xl p-6">
      <Table
        columns={recurringColumns}
        data={recurringBills}
        emptyTitle="No recurring bills yet"
        emptyDescription="Mark transactions as recurring to track your regular payments and due dates."
        emptyIcon={
          <RecurringIcon color="currentColor" width={24} height={24} />
        }
      />
    </div>
  );
}
