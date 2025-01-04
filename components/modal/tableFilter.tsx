"use client";

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
  originalTransactions: any[];
}

const TableFilterModal = ({
  isOpen,
  setValue,
  getValues,
  originalTransactions,
}: Props) => {
  const transactionType = [
    { value: "credit", label: "credit" },
    { value: "debit", label: "debit" },
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setValue("transactionType", selectedValue);
  };

  const handleFilter = () => {
    const transactionType = getValues("transactionType");
    const transactions = getValues("transactions");
    if (!transactions) return;
    const filteredDetails = originalTransactions?.filter((item: any) =>
      transactionType === "credit"
        ? item?.transactionType?.includes("female")
        : !item?.transactionType?.includes("female")
    );
    setValue("transactions", filteredDetails);
    setValue("openFilter", false);
    console.log("Filtered transactions:", filteredDetails);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={() => setValue("openFilter", false)}>
        <DialogContent className="max-w-[90%] rounded-[10px] sm:max-w-[500px] outline-none px-5 lg:px-10 py-[5%] flex flex-col justify-center items-center overflow-y-scroll max-h-[99vh]">
          <DialogTitle></DialogTitle>
          <div className="flex flex-col items-center mx-auto">
            <div className="text-center">
              {" "}
              <Heading
                text={"Filter Transactions"}
                customStyle="text-[24px] font-[700] text-[#003F41] pb-2"
              />
            </div>
            <div className="text-center">
              <SubHeading
                text={"Filter transaction history"}
                customStyle="text-[#667185] font-[400]"
              />
            </div>
          </div>

          <div className="flex items-center ps-[4px] pe-[10px] mb-[15px] mt-[4px] h-[48px] text-sm border border-[#C4C4C4] ring-0 rounded-[8px] w-full  outline-[#C4C4C4] outline-[1px]">
            <select
              onChange={handleSelectChange}
              required
              className="bg-white px-[12px] h-[43px] text-sm border-none ring-0 w-full outline-none"
            >
              <option value="">Select Tenure</option>
              {transactionType.map((type: any, index: any) => {
                return (
                  <option key={index} value={type.value} className="capitalize">
                    {type?.label}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="button"
            onClick={handleFilter}
            className="mt-4 bg-[#003F41] w-full text-white py-2 rounded-lg"
          >
            Proceed
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableFilterModal;
