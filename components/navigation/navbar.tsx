"use client";

import Link from "next/link";
import React from "react";
import NavHighlighter from "../../public/images/navigation/navigator highlight.svg";
import CustomerIcon from "../../public/images/navigation/customers.svg";
import DashboardIcon from "../../public/images/navigation/dashboardicon.svg";
import FacilityIcon from "../../public/images/navigation/facilityicon.svg";

import Image from "next/image";

const NavigationBar = () => {
  const mainBarSection = [
    {
      name: "Overview",
      route: "/#overview",
      icon: DashboardIcon,
    },
    {
      name: "Loan",
      route: "/#loan",
      icon: CustomerIcon,
    },
    {
      name: "Transactions",
      route: "/#transactions",
      icon: FacilityIcon,
    },
  ];

  return (
    <div className="overflow-hidden px-[15px] py-[15px]">
      <div className="flex">
        <div className="flex w-full gap-[6px]">
          {mainBarSection.map((item: any, index: number) => {
            return (
              <div className="flex items-center mx-[-15px]" key={index}>
                <Link
                  href={item.route}
                  className={`py-[10px] w-full px-[10px] text-[15px] text-[#003F41] mx-[19px] font-[600] rounded-[8px] flex items-center gap-2 mb-1 `}
                >
                  <Image
                    src={item.icon}
                    priority
                    className="w-[20px]"
                    alt={item.name + "icon"}
                  />
                  <p className="hover:border-b hover:border-[#003F41]">
                    {item.name}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col w-full gap-4"></div>
      </div>
    </div>
  );
};

export default NavigationBar;
