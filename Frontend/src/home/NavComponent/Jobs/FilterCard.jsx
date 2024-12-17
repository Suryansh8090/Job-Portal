import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import React from "react";

function FilterCard() {
  const FilterData = [
    {
      filterType: "Location",
      arry: [
        "Delhi",
        "Banglore",
        "Noida",
        "Pune",
        "Hyderabad",
        "Mumbai",
        "Delhi NCR",
      ],
    },
    {
      filterType: "Industry",
      arry: [
        "Frontend Developer",
        "Backend Developer",
        "Fullstack Developer",
      ],
    },
    {
      filterType: "Salary",
      arry: [
      "0-40K", "40-1lakh", "1lakh t0 5lakh"
      ],
    },
  ];

  return (
    <>
    <div className="w-full bg-gray-100 p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3"/>
      <RadioGroup>
        {
          FilterData.map((data, index) => (
            <div>
              <h1 className="font-bold text-lg">{data.filterType}</h1>
              {
                data.arry.map((item, index) => {
                  return (
                    <div className="flex items-center space-x-2 my-2">
                    <RadioGroupItem value={item}/>
                    <Label>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>

    </>
  );
}

export default FilterCard;
