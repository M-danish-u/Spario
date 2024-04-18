import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../components/commonComponents/Button'
import { RoutesCollumn } from '../../components/table/RoutesCollumn';
import Table from '../../components/table/Table';
import RouteCreateModal from './RouteCreateModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoute, getSingleRouteStore } from '../../redux/featuer/admin/AdminSlice';

const Route = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedStore,setSelectedStore]=useState([])
    const navigate=useNavigate()
    const handleModal = () => {
        setShowModal(true); // Show the modal
      };

    const routes = [
        {
          routeName: "Route 1",
          no:'01',
          stores: [
            { storeName: "Store A" },
            { storeName: "Store B" },
            { storeName: "Store C" },
          ],
        },
        {
          routeName: "Route 2",
          no:'02',
          stores: [
            { storeName: "Store D" },
            { storeName: "Store E" },
            { storeName: "Store F" },
          ],
        },
        {
          routeName: "Route 3",
          no:'03',
          stores: [
            { storeName: "Store G" },
            { storeName: "Store H" },
            { storeName: "Store I" },
          ],
        },
        {
          routeName: "Route 4",
          no:'04',
          stores: [
            { storeName: "Store J" },
            { storeName: "Store K" },
            { storeName: "Store L" },
          ],
        },
        {
          routeName: "Route 5",
          no:'05',
          stores: [
            { storeName: "Store M" },
            { storeName: "Store N" },
            { storeName: "Store O" },
          ],
        },
        {
          routeName: "Route 6",
          no:'06',
          stores: [
            { storeName: "Store P" },
            { storeName: "Store Q" },
            { storeName: "Store R" },
          ],
        },
      ];

      const dispatch=useDispatch()

      useEffect(() => {
        dispatch(getAllRoute());
        
        
      }, [dispatch]); // Dependency array ensures the effect runs only when dispatch changes
    
  
      const routeData = useSelector((state) => state?.admin?.AllRouteData?.routes || []);
  
      // console.log(executiveData);

      // const handleViewStore = async (store) => {
      // console.log(store,'store');
      // setSelectedStore(store)
      //   navigate("/admin/routeprofile");
      // };
    

      const handleViewStore = async (route) => {
        console.log(route,'ccc');
        if (!route || !route.id) {
            console.error('Invalid executive object or ID');
            return;
        }
    
        try {
            // Dispatch action to get single college
            await dispatch(getSingleRouteStore(route.id));
    
            // Log college ID
            console.log(route.id, 'route ID');
    
            // Navigate to college detail page
            navigate("/admin/routeprofile");
        } catch (error) {
            console.error('Error fetching store data:', error);
            // Handle error gracefully, such as displaying a message to the user
        }
    };
     
      const columns = useMemo(
        () => RoutesCollumn(handleViewStore),
        []
    );
      
  return (
    <div>
        <div className='w-full h-8 bg-re justify-end flex'>

        <div  className=''onClick={handleModal}>
        <Button title="+ Add Route" />
        </div>

      </div>
      <h2 className="font-medium text-xl text-[#343C6A] ">Routes</h2>

      <div className='mt-3 '>

      <Table heading={""} DATA={routeData} COLUMNS={columns} />
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

export default Route