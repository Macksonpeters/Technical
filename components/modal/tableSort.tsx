"use client";

import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";

import { Heading, SubHeading } from "../common/customheadings/headers";

interface Props {
  isOpen: boolean;
  setValue: (
    name: string,
    value: any,
    options?: { shouldValidate?: boolean; shouldDirty?: boolean }
  ) => void;
  getValues: (name: string) => any;
}

const TableSortModal = ({ isOpen, setValue, getValues }: Props) => {
  const sortType = [
    { value: "date", label: "Date" },
    { value: "amount", label: "Amount" },
    { value: "transactionType", label: "Transaction type" },
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setValue("sortType", selectedValue);
  };

  const handleSort = () => {
    const sortType = getValues("sortType");
    const transactions = getValues("transactions");
    if (!transactions) return;

    const sortedTransactions =
      sortType === "date"
        ? transactions?.sort((a: any, b: any) => {
            const dateA = new Date(a?.date).getTime();
            const dateB = new Date(b?.date).getTime();
            return dateB - dateA;
          })
        : sortType === "amount"
        ? transactions?.sort((a: any, b: any) => {
            const amountA = a?.amount;
            const amountB = b?.amount;
            return amountB - amountA;
          })
        : sortType == "transactionType" &&
          transactions.sort((a: any, b: any) => {
            if (a.transactionType < b.transactionType) {
              return -1;
            }
            if (a.transactionType > b.transactionType) {
              return 1;
            }
            return 0;
          });

    setValue("transactions", sortedTransactions);
    setValue("openSort", false);
    setValue(sortType, true);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={() => setValue("openSort", false)}>
        <DialogContent className="max-w-[90%] rounded-[10px] sm:max-w-[500px] outline-none px-5 lg:px-10 py-[5%] flex flex-col justify-center items-center overflow-y-scroll max-h-[99vh]">
          <DialogTitle></DialogTitle>
          <div className="flex flex-col items-center mx-auto">
            <div className="text-center">
              {" "}
              <Heading
                text={"Sort Transactions"}
                customStyle="text-[24px] font-[700] text-[#003F41] pb-2"
              />
            </div>
            <div className="text-center">
              <SubHeading
                text={"Sort transaction history"}
                customStyle="text-[#667185] font-[400]"
              />
            </div>
          </div>

          <p>Sort By</p>

          <div className="flex items-center ps-[4px] pe-[10px] mb-[15px] mt-[4px] h-[48px] text-sm border border-[#C4C4C4] ring-0 rounded-[8px] w-full  outline-[#C4C4C4] outline-[1px]">
            <select
              onChange={handleSelectChange}
              required
              className="bg-white px-[12px] h-[43px] text-sm border-none ring-0 w-full outline-none"
            >
              <option value="">Select Sort Criteria</option>
              {sortType.map((type: any, index: any) => {
                return (
                  <option key={index} value={type.value}>
                    {type?.label}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="button"
            onClick={handleSort}
            className="mt-4 bg-[#003F41] w-full text-white py-2 rounded-lg"
          >
            Proceed
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableSortModal;
