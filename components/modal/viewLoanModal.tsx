"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Heading, SubHeading } from "../common/customheadings/headers";
import { TbRadioactiveFilled } from "react-icons/tb";

interface Props {
  isOpen: boolean;
  setIsOpen?: any;
  item: any;
}

const ViewLoanModal = ({ isOpen, setIsOpen, item }: Props) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90%] rounded-[10px] sm:max-w-[500px] outline-none px-5 lg:px-10 py-[5%] flex flex-col justify-center items-center overflow-y-scroll max-h-[99vh]">
          <DialogTitle></DialogTitle>
          <div className="flex flex-col items-center mx-auto">
            <div className="text-center">
              {" "}
              <Heading
                text={"Loan Details"}
                customStyle="text-[24px] font-[700] text-[#003F41] pb-2"
              />
            </div>
            <div className="text-center">
              <SubHeading
                text={"Loan facility details"}
                customStyle="text-[#667185] font-[400]"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <p className="flex items-center">
              <TbRadioactiveFilled
                className={`text-[20px] ${
                  !item?.transactionType?.includes("female")
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              />{" "}
            </p>
            <p className="text-[15px]">
              Loan Purpose :{" "}
              <span className="font-[700] text-[#003F41]">
                {item.loanPurpose} Loan
              </span>{" "}
            </p>
            <p className={` text-[15px]  `}>
              Loan Amount :{" "}
              <span
                className={`text-[17px] font-[700] ${
                  !item?.transactionType?.includes("female")
                    ? "text-red-500"
                    : "text-[#003F41]"
                }`}
              >
                {item?.loanAmount}
              </span>
            </p>
            <p className="text-[15px]">
              Loan Status :{" "}
              <span className="font-[700] text-green-500">Active</span>{" "}
            </p>
          </div>
          <DialogClose className="mt-4 bg-[#003F41] w-full text-white py-2 rounded-lg">
            Close
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewLoanModal;
