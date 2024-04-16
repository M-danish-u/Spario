import React, { useMemo, useState } from 'react'
import Table from '../../components/table/Table'
import { StoreCollumn } from '../../components/table/StoreCollumn';
import CreateStoreModal from './CreateStoreModal';
import Button from '../../components/commonComponents/Button';
import StoreEditModal from './StoreEditModal';
import { useNavigate } from "react-router-dom";

const Store = () => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [editShowModal, setEditShowModal] = useState(false);
    const [edingStore,setEditingStore]=useState({})
    
    const handleViewStore = async (college) => {
      
        navigate("/admin/storeprofile");
      };
    
    
      const handleEdit = (store) => {
       console.log(store,'eeeeeeeeeee');
       setEditingStore(store)
        setEditShowModal(true); // Show the modal
      };

    const storeData=[{no:'1',storeName:'Store 1',customerName:'Customer 1', total:'500000',due:'30000',exicutive:'Exivutive 1' },
    {no:'2',storeName:'Store 2',customerName:'Customer 2', total:'500000',due:'30000',exicutive:'Exivutive 2',route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1', },
    {no:'3',storeName:'Store 3',customerName:'Customer 3', total:'500000',due:'30000',exicutive:'Exivutive 3' ,route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1',},
    {no:'4',storeName:'Store 4',customerName:'Customer 4', total:'500000',due:'40000',exicutive:'Exivutive 4' ,route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1',},
    {no:'5',storeName:'Store 5',customerName:'Customer 5', total:'500000',due:'30000',exicutive:'Exivutive 5' ,route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1',},
    {no:'6',storeName:'Store 6',customerName:'Customer 6', total:'600000',due:'30000',exicutive:'Exivutive 6' ,route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1',},
    {no:'7',storeName:'Store 7',customerName:'Customer 7', total:'700000',due:'30000',exicutive:'Exivutive 7' ,route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1',},
    {no:'8',storeName:'Store 8',customerName:'Customer 8', total:'800000',due:'30000',exicutive:'Exivutive 8' ,route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1',},
    {no:'9',storeName:'Store 9',customerName:'Customer 9', total:'900000',due:'30000',exicutive:'Exivutive 9' ,route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1',},]

    const columns = useMemo(
        () => StoreCollumn(handleViewStore,handleEdit),
        []
      );
      const handleModal = () => {
        setShowModal(true); // Show the modal
        
      };

    //   const handleEditModal = () => {
    //     setEditShowModal(true); // Show the modal
        
    //   };
    
  return (
    <div className='p-5 relative '>
        {/* <div className='w-full bg-red-0 z-10 flex justify-end absolute right-6 top-6' >
            <div onClick={handleModal}>
        <Button className='' title="+ Add Store" />
        </div>
        </div> */}
        <div className=''>

             <Table heading={""} DATA={storeData} COLUMNS={columns} />
             </div>
             {showModal && (
        <CreateStoreModal
          // college={selectedCollege}
          onClose={() => setShowModal(false)} // Pass a function to close the modal
        />
      )}

{editShowModal && (
        <StoreEditModal
          store={edingStore}
          onEditClose={() => setEditShowModal(false)} // Pass a function to close the modal
        />
      )}
    </div>
  )
}

export default Store