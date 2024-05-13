import React from 'react'
import { useState } from 'react';
import Button from '../../components/commonComponents/Button';
import AddReturnModal from './AddReturnModal';
import { ReturnCollumn } from '../../components/table/ReturnCollumn';
import { useMemo } from 'react';
import Table3 from '../../components/table/executive/Table3';
import { useDispatch, useSelector } from 'react-redux';
import { getExecutiveReturns } from '../../redux/featuer/executive/ExecutiveSlice';
import { useEffect } from 'react';

const Return = () => {
    const [showReturnModal, setShowReturnModal] = useState(false);

    const handleInvoiceModal = () => {
        setShowReturnModal(true); // Show the modal
      };

      const executive_id = useSelector((state) => state?.adminAuth?.admin?.id);
      console.log(executive_id,'tttt');
      const returnData = useSelector((state) => state?.executive?.ReturnData);
      const loading = useSelector((state) => state?.executive?.loading);
      const dispatch = useDispatch();
    console.log(returnData,'return');
      useEffect(() => {
        // Fetch executive transactions when component mounts
        dispatch(getExecutiveReturns(executive_id));
      }, [dispatch, executive_id]);
    


      const columns = useMemo(
        () => ReturnCollumn(),
        []
      );
  return (
    <div>
        <div className='w-full  gap-4 g-red-500 md:pr-5 justify-end flex md:mb-2'>
        <div onClick={handleInvoiceModal}>
        <Button title="+ Add Return" />
        </div>
        </div>

        {/* <Table3 heading={""} DATA={returnData || []} COLUMNS={columns} /> */}
        {loading ? (
          <div className="flex items-center justify-center h-32">
                    <p className="text-gray-600">Loading...</p> 
                </div>                ) : (
                <Table3 heading={""} DATA={returnData || []} COLUMNS={columns} />
            )}

        {showReturnModal && (
        <AddReturnModal
          onClose={() => setShowReturnModal(false)} // Pass a function to close the modal
        />
      )}
        </div>
  )
}

export default Return