import React, { useMemo, useState } from 'react'
import Button from '../../components/commonComponents/Button'
import { RoutesCollumn } from '../../components/table/RoutesCollumn';
import Table from '../../components/table/Table';
import RouteCreateModal from './RouteCreateModal';
import { useNavigate } from 'react-router-dom';

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
      const handleViewStore = async (store) => {
      console.log(store,'store');
      setSelectedStore(store)
        navigate("/admin/routeprofile");
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

      <Table heading={""} DATA={routes} COLUMNS={columns} />
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