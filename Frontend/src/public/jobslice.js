import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singlejob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    locationFilter: [],
    roleFilter: [], // Changed from industryFilter to roleFilter
    salaryFilter: "", // Added salaryFilter
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singlejob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    // Added roleFilter and salaryFilter
    setLocationFilter: (state, action) => {
      state.locationFilter = action.payload;
    },
    setRoleFilter: (state, action) => {
      state.roleFilter = action.payload; // Handle roleFilter
    },
    setSalaryFilter: (state, action) => {
      state.salaryFilter = action.payload; // Handle salaryFilter
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  setLocationFilter,
  setRoleFilter, // Exported action for roleFilter
  setSalaryFilter, // Exported action for salaryFilter
} = jobSlice.actions;

export default jobSlice.reducer;
