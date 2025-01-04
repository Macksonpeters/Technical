"use client";

import React, { useEffect, useState } from "react";
import { Heading, SubHeading } from "../common/customheadings/headers";
import AccountCard from "./components/accountCard";
import Card from "../common/cards/card";
import { RecentTransactions } from "./components/recentTransactions";
import { LoanHistory } from "./components/loanHistory";
import NavigationBar from "../navigation/navbar";
import { useGetHook } from "@/hooks/apihooks";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTransactionDetails,
  updateUserDetails,
} from "@/redux/features/user/userSlice";
import Loading from "../common/loading/loading";
import ErrorContainer from "../common/errors/errorContainer";
import TransactionHistory from "./components/transactionHistory";

interface ErrorState {
  userDetailsError: boolean;
  transactionError: boolean;
}

interface RootState {
  user: {
    userDetails: {
      name: string;
      totalTransactions: number;
      successfulTransactions: number;
      failedTransactions: number;
      accountName: string;
      accountBalance: string;
      firstName: string;
      id: string;
    };
    refetchValue: number;
    transactionDetails: any | [];
  };
}

const Dashboard = () => {
  const { userDetails, transactionDetails, refetchValue } = useSelector(
    (state: RootState) => state.user
  );

  const getGreeting = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 12) {
      return "Good morning";
    } else if (hours < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const [errors, setErrors] = useState<ErrorState>({
    userDetailsError: false,
    transactionError: false,
  });

  const setError = (field: keyof ErrorState, value: boolean) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: value }));
  };

  const getUserdetailsUrl =
    "https://6776d48912a55a9a7d0cfc47.mockapi.io/api/overview/technical";
  const getTransactionsUrl =
    "https://6776d48912a55a9a7d0cfc47.mockapi.io/api/overview/recentTransactionsAndLoans";
  const GetUserDetailsMutate = useGetHook();
  const GetTransactionsMutate = useGetHook();
  const dispatch = useDispatch();

  const handleGetUserDetails = async () => {
    try {
      const response = await GetUserDetailsMutate.mutateAsync(
        getUserdetailsUrl
      );

      if (response) {
        const userDetails = response?.[0];
        dispatch(updateUserDetails(userDetails));
      } else {
        setError("userDetailsError", true);
      }
    } catch (error) {
      setError("userDetailsError", true);
    }
  };

  const handleGetLoanAndRecentTransactions = async () => {
    try {
      const response = await GetTransactionsMutate.mutateAsync(
        getTransactionsUrl
      );

      if (response) {
        const data = response;
        dispatch(updateTransactionDetails(data));
      } else {
        setError("transactionError", true);
      }
    } catch (error) {
      setError("transactionError", true);
    }
  };

  useEffect(() => {
    handleGetUserDetails();
  }, []);

  useEffect(() => {
    handleGetLoanAndRecentTransactions();
  }, [refetchValue]);

  const cardData = [
    { text: "Transactions Count", value: userDetails?.totalTransactions },
    { text: "Successful Count", value: userDetails?.successfulTransactions },
    { text: "Failed Count", value: userDetails?.failedTransactions },
    { text: "Unresolved Count", value: userDetails?.id },
  ];

  return (
    <div>
      <div className="flex justify-between items-center w-full flex-col lg:flex-row">
        <div>
          <Heading
            text={
              <div className="flex items-center w-[max-content] gap-1">
                {" "}
                {getGreeting()},{" "}
                {GetUserDetailsMutate.isPending ? (
                  <Loading pending={true} />
                ) : (
                  userDetails?.firstName
                )}
              </div>
            }
            customStyle="text-[25px] font-[700]"
          />
          <SubHeading
            text="Track, organize and  oversee activities here."
            customStyle="text-[#667185] font-[400]"
          />
        </div>
        <NavigationBar />
      </div>
      <div className="w-full h-[1px] bg-[#E1E4EA] mt-[20px]"></div>{" "}
      <div
        id="overview"
        className="flex py-10 gap-10 items-center flex-col lg:flex-row lg:gap-5"
      >
        <div className="lg:w-[40%]">
          {GetUserDetailsMutate.isPending ? (
            <Loading pending={true} />
          ) : (
            <>
              {errors.userDetailsError ? (
                <ErrorContainer />
              ) : (
                <AccountCard
                  accountBalance={Number(userDetails?.accountBalance)}
                  accountName={userDetails?.name}
                />
              )}
            </>
          )}
        </div>

        <div className="lg:w-[60%]">
          <div className="flex flex-wrap gap-5 items-center justify-center lg:justify-start">
            {cardData.map((card, index) => (
              <Card
                key={index}
                text={card.text}
                value={card.value}
                backgroundColor={
                  index % 2 === 0 ? "bg-[#ecf1f1]" : "bg-[#F7EFE8]"
                }
                pending={GetUserDetailsMutate.isPending}
                error={errors.userDetailsError}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-0 lg:gap-5 lg:flex-row">
        <div className="lg:w-[40%]">
          <RecentTransactions
            recentTransactions={transactionDetails}
            pending={GetTransactionsMutate.isPending}
            error={errors.transactionError}
          />
        </div>
        <div id="loan" className="lg:w-[60%]">
          <LoanHistory
            loanHistory={transactionDetails}
            pending={GetTransactionsMutate.isPending}
            error={errors.transactionError}
          />
        </div>
      </div>
      <div id="transactions">
        <TransactionHistory
          transactions={transactionDetails}
          pending={GetTransactionsMutate.isPending}
          error={errors.transactionError}
        />
      </div>
    </div>
  );
};

export default Dashboard;
