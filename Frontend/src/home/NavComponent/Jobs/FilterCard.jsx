import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLocationFilter, setRoleFilter } from "@/public/jobslice"; // Action for location and role filters

function FilterCard() {
  const [selectedLocation, setSelectedLocation] = useState([]); // State to hold selected locations
  const [selectedRole, setSelectedRole] = useState([]); // State to hold selected roles

  // List of available locations and roles to filter by
  const locations = [
    "Delhi", "Banglore", "Noida", "Pune", "Hyderabad", "Mumbai", 
    "Delhi NCR", "Lucknow", 
  ];

  const roles = ["Frontend Developer", "Backend Developer", "Fullstack Developer"]; // Available roles

  const dispatch = useDispatch();

  // Handle changes in Location selection
  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation((prev) =>
      prev.includes(location)
        ? prev.filter((item) => item !== location) // Remove location if it's already selected
        : [...prev, location] // Add location if it's not selected
    );
  };

  // Handle changes in Role selection
  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole((prev) =>
      prev.includes(role)
        ? prev.filter((item) => item !== role) // Remove role if it's already selected
        : [...prev, role] // Add role if it's not selected
    );
  };

  // Update Redux state when filters change
  useEffect(() => {
    dispatch(setLocationFilter(selectedLocation)); // Dispatch location filter change
    dispatch(setRoleFilter(selectedRole)); // Dispatch role filter change
  }, [selectedLocation, selectedRole, dispatch]);

  return (
    <div className="w-full bg-gray-100 p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />

      {/* Location Filter */}
      <div className="my-4">
        <h2 className="font-bold">Location</h2>
        {locations.map((location, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={location}
              onChange={handleLocationChange}
              id={`location-${index}`}
              className="accent-blue-500"
            />
            <label htmlFor={`location-${index}`}>{location}</label>
          </div>
        ))}
      </div>

      {/* Role Filter */}
      <div className="my-4">
        <h2 className="font-bold">Role</h2>
        {roles.map((role, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={role}
              onChange={handleRoleChange}
              id={`role-${index}`}
              className="accent-blue-500"
            />
            <label htmlFor={`role-${index}`}>{role}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterCard;
