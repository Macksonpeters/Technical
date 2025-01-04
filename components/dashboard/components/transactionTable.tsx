import NoTransactionFound from "@/components/common/errors/noTransactionFound";
import TableFilterModal from "@/components/modal/tableFilter";
import TableSortModal from "@/components/modal/tableSort";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

interface TableProps {
  transactions: any[];
}

const TransactionTable = ({ transactions }: TableProps) => {
  const tableHeader = [
    "id",
    "Purpose",
    "Amount",
    "Beneficiary",
    "Date",
    "Transaction Type",
  ];

  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm();

  const watchFields = watch();

  useWatch({
    name: "openFilter",
    defaultValue: false,
    control: control,
  });

  useWatch({
    name: "openSort",
    defaultValue: false,
    control: control,
  });

  useWatch({
    name: "transactions",
    defaultValue: transactions,
    control: control,
  });

  const handleClickFilter = () => {
    setValue("openFilter", true);
  };

  const handleClickSort = () => {
    setValue("openSort", true);
  };

  const handleReset = () => {
    setValue("transactions", transactions);
  };

  useEffect(() => {
    setValue("transactions", transactions);
  }, []);

  const isopen = getValues("openFilter");

  return (
    <form>
      <div className="flex gap-2 items-center sm:justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="border border-[#003F41] text-[#003F41] rounded-lg px-4 py-1 text-[14px]"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleClickFilter}
          className="border border-[#003F41] text-[#003F41] rounded-lg px-4 py-1 text-[14px]"
        >
          Filter
        </button>
        <button
          onClick={handleClickSort}
          type="button"
          className="border border-[#82664e] text-[#82664e] rounded-lg px-4 py-1 text-[14px]"
        >
          Sort
        </button>
      </div>
      {getValues("transactions")?.length > 0 ? (
        <Table className="table mt-5">
          <TableHeader>
            <TableRow>
              {tableHeader.map((header: any, index: any) => {
                return (
                  <TableHead
                    key={index}
                    className={`text-[#82664e] bg-[#F7EFE8] font-[700]`}
                  >
                    {header}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          <TableBody className="text-[13.5px] text-[#003F41]">
            {getValues("transactions")?.map((item: any, index: any) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item?.id}</TableCell>
                  <TableCell>{item?.loanPurpose}</TableCell>
                  <TableCell>{item?.amount}</TableCell>
                  <TableCell>{item?.receiver}</TableCell>
                  <TableCell className="">
                    {item?.date &&
                      new Date(item?.date)?.toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell
                    className={`font-[600] ${
                      !item?.transactionType?.includes("female")
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {item?.transactionType?.includes("female")
                      ? "Credit"
                      : "Debit"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <NoTransactionFound />
      )}

      <TableFilterModal
        setValue={setValue}
        getValues={getValues}
        isOpen={getValues("openFilter")}
        originalTransactions={transactions}
      />
      <TableSortModal
        setValue={setValue}
        getValues={getValues}
        isOpen={getValues("openSort")}
      />
    </form>
  );
};

export default TransactionTable;
