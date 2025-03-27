
type Props = {
  recurringData: {
    paidBills: number;
    dueSoon: number;
    totalUpcoming: number;
  }
}

const colors: {
  [key: string]: string;
} = {
  paidBills: "#277C78",
  dueSoon: "#82C9D7",
  totalUpcoming: "#F2CDAC",
}

const RecurringBills = ({ recurringData }: Props) => {
  return (
    <div className="w-full h-full flex flex-col gap-3 justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 bg-beige-100 py-5 px-4 rounded-lg shadow-md border-l-2" style={{ borderColor: colors.paidBills }}>
          <div className="flex justify-between w-full  " >
            <p className="text-grey-500">Paid Bills:</p>
            <p className="text-black font-bold">${recurringData.paidBills}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 bg-beige-100 py-5 px-4 rounded-lg shadow-md border-l-2" style={{ borderColor: colors.dueSoon }}>
          <div className="flex justify-between w-full " >
            <p className="text-grey-500">Due Soon:</p>
            <p className="text-black font-bold">${recurringData.dueSoon}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 bg-beige-100 py-5 px-4 rounded-lg shadow-md border-l-2" style={{ borderColor: colors.totalUpcoming }}>
          <div className="flex justify-between w-full  " >
            <p className="text-grey-500">Total Upcoming:</p>
            <p className="text-black font-bold">${recurringData.totalUpcoming}</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default RecurringBills