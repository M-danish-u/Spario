import React, { useEffect } from 'react'
import Button from '../../components/commonComponents/Button'
// import { RouteCollumn } from '../../components/table/RoutesCollumn';
import Table from '../../components/table/Table';
import RouteCreateModal from './RouteCreateModal';
import { useState } from 'react';
import { useMemo } from 'react';
import { RouteProfileCollumn } from '../../components/table/RouteProfileCollumn';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRouteStore, getSingleStore } from '../../redux/featuer/admin/AdminSlice';
import { useNavigate } from 'react-router-dom';

const RouteProfile = () => {
    const [showModal, setShowModal] = useState(false);
    const handleModal = () => {
        setShowModal(true); // Show the modal
      };

      const handleViewInvoices = async (store) => {
        console.log(store,'ccc');
        if (!store || !store.id) {
            console.error('Invalid executive object or ID');
            return;
        }
    
        try {
            // Dispatch action to get single college
            await dispatch(getSingleStore(store.id));
    
            // Log college ID
            console.log(store.id, 'store ID');
    
            // Navigate to college detail page
            navigate("/admin/routestoreprofile");
        } catch (error) {
            console.error('Error fetching store data:', error);
            // Handle error gracefully, such as displaying a message to the user
        }
    };
      
      
      const dispatch=useDispatch()
      const navigate=useNavigate()

      useEffect(() => {
        dispatch(getSingleRouteStore());
        
        
      }, [dispatch]); // Dependency array ensures the effect runs only when dispatch changes
    
  
      const routeStores = useSelector((state) => state?.admin?.RouteStoresProfile?.route || []);
  
     console.log(routeStores,'eeeee');

    const columns = useMemo(
        () => RouteProfileCollumn(handleViewInvoices),
        []

        
      );
      
  return (
    <div>
        <div className='w-full h-8 bg-re justify-end flex'>

        <div  className=''onClick={handleModal}>
        <Button title="+ Add Route" />
        </div>

      </div>
      <h2 className="font-medium text-xl text-[#343C6A] ">Stores</h2>

      <div className='mt-3 '>
      <Table heading={""} DATA={routeStores.stores} COLUMNS={columns} />
      </div>


      {showModal && (
        <RouteCreateModal
          // college={selectedCollege}
          onClose={() => setShowModal(false)} // Pass a function to close the modal
        />
      )}
    </div>
  )
}

export default RouteProfile