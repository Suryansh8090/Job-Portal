import React, { useEffect } from 'react';
import Navbar from '../layout/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../public/applicantionslice';

const Applicants = () => {
    const params = useParams(); // Get jobId from URL
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);
    
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                // Get the token from localStorage (or sessionStorage depending on where you store it)
                const token = localStorage.getItem("token"); 
                
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the token to the request headers
                    },
                });

                console.log("API Response:", res.data); // Log the response data
                dispatch(setAllApplicants(res.data.data)); // Store applicants in redux
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>
                    Applicants {applicants?.length} {/* Fix length calculation */}
                </h1>
                <ApplicantsTable jobId={params.id} /> {/* Pass jobId as a prop */}
            </div>
        </div>
    );
};

export default Applicants;
