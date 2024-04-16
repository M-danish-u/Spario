import React from 'react'
import Button from '../../components/commonComponents/Button'
// import { RouteCollumn } from '../../components/table/RoutesCollumn';
import Table from '../../components/table/Table';
import RouteCreateModal from './RouteCreateModal';
import { useState } from 'react';
import { useMemo } from 'react';
import { RouteProfileCollumn } from '../../components/table/RouteProfileCollumn';

const RouteProfile = () => {
    const [showModal, setShowModal] = useState(false);
    const handleModal = () => {
        setShowModal(true); // Show the modal
      };

      const routes = [
        {
          routeName: "Route 1",
          no: "01",
          store: { no: "001", storeName: "Store A" }
        },
        {
          routeName: "Route 2",
          no: "02",
          store: { no: "004", storeName: "Store D" }
        },
        {
          routeName: "Route 3",
          no: "03",
          store: { no: "007", storeName: "Store G" }
        },
        {
          routeName: "Route 4",
          no: "04",
          store: { no: "010", storeName: "Store J" }
        },
        {
          routeName: "Route 5",
          no: "05",
          store: { no: "013", storeName: "Store M" }
        },
        {
          routeName: "Route 6",
          no: "06",
          store: { no: "016", storeName: "Store P" }
        },
      ];
      
      
     
     
    const columns = useMemo(
        () => RouteProfileCollumn(),
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

export default RouteProfile