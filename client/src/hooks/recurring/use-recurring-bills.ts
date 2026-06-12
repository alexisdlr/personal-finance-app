// import useFetchOverviewData from "../overview/use-get-overview-data";

// export const useRecurringBills = () => {
//   const overviewQuery = useFetchOverviewData();
//   const recurringBills = overviewQuery.data?.data.recurringBills ?? [];
//   const totalBills = overviewQuery.data?.data.totalBills ?? 0;

//   const dueSoon = recurringBills.filter((bill) => {
//     const day = new Date(bill.date).getDate();

//     return day <= 7;
//   });

//   const dueSoonTotal = dueSoon.reduce(
//     (acc, bill) => acc + Math.abs(bill.amount),
//     0,
//   );

//   return {
//     recurringBills,
//     totalBills,
//     dueSoon,
//     dueSoonTotal,
//     dueSoonCount: dueSoon.length,

//     isLoading: overviewQuery.isLoading,
//     error: overviewQuery.error,
//   };
// };
