import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllExecutive, getSingleExecutive, executiveStatusChange } from "../../redux/featuer/admin/AdminSlice";
import { ExecutiveCollumn } from "../../components/table/ExicutiveCollumn";
import ExecutiveCreateModal from "./ExecutiveCreateModal";
import ExecutiveEditModal from "./ExecutiveEditModal";
import Button from "../../components/commonComponents/Button";
import Table3 from '../../components/table/executive/Table3';

const Executive = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [editShowModal, setEditShowModal] = useState(false);
    const [editingExecutive, setEditingExecutive] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAllExecutive());
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching executive data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    const executiveData = useSelector((state) => state?.admin?.AllExecutiveData?.executives || []);

    const handleModal = () => {
        setShowModal(true);
    };

    const handleViewExecutive = async (executive) => {
        if (!executive || !executive.id) {
            console.error('Invalid executive object or ID');
            return;
        }

        try {
            await dispatch(getSingleExecutive(executive.id));
            navigate("/admin/executiveprofile");
        } catch (error) {
            console.error('Error fetching executive data:', error);
        }
    };

    const handleStatus = async (executive) => {
        if (!executive || !executive.id) {
            console.error('Invalid executive object or ID');
            return;
        }

        try {
            await dispatch(executiveStatusChange(executive.id));
            window.location.reload(); // Reload the page to reflect the changes
        } catch (error) {
            console.error('Error changing executive status:', error);
        }
    };

    const handleEdit = (executive) => {
        setEditingExecutive(executive);
        setEditShowModal(true);
    };

    const columns = useMemo(
        () => ExecutiveCollumn(handleViewExecutive, handleEdit, handleStatus),
        []
    );

    return (
        <div className="relative p-4">
            <div className='w-full g-red-400 z-10 flex justify-end '>
                <div onClick={handleModal}>
                    <Button className='' title="+ Add Executive" />
                </div>
            </div>
            <div className="mt-4 md:mt-0 md:pt-4">
                {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                        <p className="text-gray-600">Loading...</p> {/* Display loading message or spinner while data is being fetched */}
                    </div>                ) : (
                    <Table3 heading={""} DATA={executiveData} COLUMNS={columns} />
                )}
            </div>
            {showModal && (
                <ExecutiveCreateModal
                    onClose={() => setShowModal(false)} // Pass a function to close the modal
                />
            )}
            {editShowModal && (
                <ExecutiveEditModal
                    executive={editingExecutive}
                    onEditClose={() => setEditShowModal(false)} // Pass a function to close the modal
                />
            )}
        </div>
    );
};

export default Executive;
