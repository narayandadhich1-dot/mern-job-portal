import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "location",
    array: ["Delhi NCR", "Hyderabad", "Pune", "Bangalore", "Chennai"],
  },
  {
    filterType: "industry",
    array: ["IT", "Finance", "Marketing", "HR", "Operations"],
  },
  {
    filterType: "salary",
    array: ["0-3", "3-6", "6-10", "10-15", "15-100"],
  },
];

const FilterCard = ({ filters, setFilters }) => {
  const handleChange = (type, value) => {
    setFilters((prev) => {
      const currentCategory = prev[type];
      const updatedCategory = currentCategory.includes(value)
        ? currentCategory.filter((item) => item !== value)
        : [...currentCategory, value];

      return { ...prev, [type]: updatedCategory };
    });
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-5">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      {filterData.map((data, index) => (
        <div key={index} className="mt-3">
          <h1 className="font-bold text-md capitalize">{data.filterType}</h1>
          {data.array.map((item, idx) => {
            const itemId = `id${index}-${idx}`;
            return (
              <div key={itemId} className="flex items-center space-x-2 my-2">
                <Checkbox
                  id={itemId}
                  checked={filters[data.filterType].includes(item)}
                  onCheckedChange={() => handleChange(data.filterType, item)}
                />
                {/* UPDATE THIS LINE BELOW */}
                <Label htmlFor={itemId} className="cursor-pointer">
                  {data.filterType === "salary"
                    ? `${item.replace("-", " to ")} LPA`
                    : item}
                </Label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
