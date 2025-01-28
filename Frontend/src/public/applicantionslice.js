import { createSlice } from "@reduxjs/toolkit";

const applicantionSlice = createSlice({
    name: 'application',
    initialState: {
        allApplicants:[],
    },
    reducers: {
        setAllApplicants:(state, action) => {
            state.allApplicants = action.payload
        }
    }
})

export const {setAllApplicants} = applicantionSlice.actions
export default applicantionSlice.reducer