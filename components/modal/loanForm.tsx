"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";

import { Heading, SubHeading } from "../common/customheadings/headers";
import { SubmitButton } from "../common/buttons/buttons";
import { useForm } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import { ShowToast } from "../common/toast.tsx/taost";
import { usePostHook } from "@/hooks/apihooks";
import { useDispatch } from "react-redux";
import { updateRefetchValue } from "@/redux/features/user/userSlice";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  loanHistoryCount: number;
}

const LoanFormModal = ({ isOpen, setIsOpen, loanHistoryCount }: Props) => {
  const { register, handleSubmit, watch, setValue, getValues, reset } =
    useForm();
  const watchedFields = watch();
  const dispatch = useDispatch();
  const loanUrl =
    "https://6776d48912a55a9a7d0cfc47.mockapi.io/api/overview/recentTransactionsAndLoans";
  const RequestLoanMutate = usePostHook(loanUrl);

  const tenure = [
    { value: 1, label: "1 month" },
    { value: 3, label: "3 months" },
    { value: 6, label: "6 months" },
    { value: 12, label: "12 months" },
    { value: 15, label: "15 months" },
    { value: 18, label: "18 months" },
  ];

  const handleRequestLoan = async (data: any) => {
    if (!loanHistoryCount) {
      return ShowToast(
        "History not available, you can't request a new loan.. try again later",
        "error"
      );
    }

    const amount = (5.39 + loanHistoryCount)?.toLocaleString();
    const date = new Date();
    const id = loanHistoryCount + 1;
    const tenure = Number(data.tenure);

    try {
      const payload = {
        transactionType: "male",
        receiver: "Gerlach",
        amount,
        loanAmount: data.amount,
        loanPurpose: data.purpose,
        activeLoan: false,
        date,
        id,
        tenure,
      };

      const response = await RequestLoanMutate.mutateAsync(payload);

      if (response) {
        dispatch(updateRefetchValue(id));
        ShowToast("Successful, loan request received..", "success");
        reset();
        setIsOpen(!isOpen);
      } else {
        return ShowToast("Oops an error occurred.. try again later", "error");
      }
    } catch (error) {
      return ShowToast("Oops an error occurred.. try again later", "error");
    }
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90%] rounded-[10px] sm:max-w-[500px] outline-none px-5 lg:px-10 py-[5%] flex flex-col justify-center items-center overflow-y-scroll max-h-[99vh]">
          <DialogTitle></DialogTitle>
          <div className="flex flex-col items-center mx-auto">
            <div className="text-center">
              {" "}
              <Heading
                text={"New Loan"}
                customStyle="text-[24px] font-[700] text-[#003F41] pb-2"
              />
            </div>
            <div className="text-center">
              <SubHeading
                text={"Fill in details to access loan facilities"}
                customStyle="text-[#667185] font-[400]"
              />
            </div>
          </div>
          <form onSubmit={handleSubmit(handleRequestLoan)} className="w-full">
            <label
              htmlFor="amount"
              className="block font-[500] pb-1 text-[15px]"
            >
              Amount
            </label>

            <CurrencyInput
              name="transferamount"
              placeholder="Enter loan amount "
              decimalsLimit={2}
              value={getValues("amount")}
              onValueChange={(value) => setValue("amount", value)}
              className="border border-[#C4C4C4] outline-none px-[10px] rounded-[8px] w-full h-[43px] mb-[15px] "
            />

            <label
              htmlFor="tenure"
              className="block font-[500] pb-1 text-[15px]"
            >
              Tenure (1 - 48 months)
            </label>

            <div className="flex items-center ps-[4px] pe-[10px] mb-[15px] mt-[4px] h-[48px] text-sm border border-[#C4C4C4] ring-0 rounded-[8px] w-full  outline-[#C4C4C4] outline-[1px]">
              <select
                {...register("tenure", {
                  required: true,
                })}
                required
                className="bg-white px-[12px] h-[43px] text-sm border-none ring-0 w-full outline-none"
              >
                <option value="">Select Tenure</option>
                {tenure.map((type: any, index: any) => {
                  return (
                    <option key={index} value={type.value}>
                      {type?.label}
                    </option>
                  );
                })}
              </select>
            </div>

            <label
              htmlFor="purpose"
              className="block font-[500] pb-1 text-[15px]"
            >
              Purpose
            </label>

            <input
              {...register("purpose", {})}
              type="text"
              className="border border-[#C4C4C4] outline-none px-[10px] rounded-[8px] w-full h-[43px] mb-[32px] "
              placeholder="Enter purpose"
              required={true}
            />

            <SubmitButton
              text="Proceed"
              isValid={
                watchedFields?.amount &&
                watchedFields?.tenure &&
                watchedFields?.purpose
              }
              width={`w-full`}
              pending={RequestLoanMutate.isPending}
            />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoanFormModal;
