import React, { useEffect, useMemo, useState } from 'react';
import Button from '../../components/commonComponents/Button';
import { RoutesCollumn } from '../../components/table/RoutesCollumn';
import Table3 from '../../components/table/executive/Table3';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoute, getSingleRouteStore } from '../../redux/featuer/admin/AdminSlice';
import RouteCreateModal from './RouteCreateModal'

const Route = () => {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleModal = () => {
        setShowModal(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all routes
                await dispatch(getAllRoute());
                setIsLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching route data:', error);
                setIsLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, [dispatch]); // Dependency array ensures the effect runs only when dispatch changes

    const routeData = useSelector((state) => state?.admin?.AllRouteData?.routes || []);

    const handleViewStore = async (route) => {
        console.log(route, 'ccc');
        if (!route || !route.id) {
            console.error('Invalid executive object or ID');
            return;
        }

        try {
            // Dispatch action to get single route
            await dispatch(getSingleRouteStore(route.id));

            // Log route ID
            console.log(route.id, 'route ID');

            // Navigate to route detail page
            navigate("/admin/routeprofile");
        } catch (error) {
            console.error('Error fetching route data:', error);
            // Handle error gracefully, such as displaying a message to the user
        }
    };

    const columns = useMemo(() => RoutesCollumn(handleViewStore), []);

    return (
        <div>
            <div className='w-full md:mt-4 g-red-400 justify-end flex'>
                <div className='' onClick={handleModal}>
                    <Button title="+ Add Route" />
                </div>
            </div>

            <div className='md:mt-8 '>
                {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                        <p className="text-gray-600">Loading...</p> {/* Display loading message or spinner while data is being fetched */}
                    </div>                ) : (
                    <Table3 heading={""} DATA={routeData} COLUMNS={columns} />
                )}
            </div>

            {showModal && (
                <RouteCreateModal
                    onClose={() => setShowModal(false)} // Pass a function to close the modal
                />
            )}
        </div>
    );
};

export default Route;
