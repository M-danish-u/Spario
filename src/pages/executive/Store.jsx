import React, { useEffect } from 'react'
import { useMemo } from 'react';
import { ExecutiveStoreCollumn } from '../../components/table/executive/ExicutiveStoreCollumn';
import Table from '../../components/table/Table';
import Table2 from '../../components/table/Table2';
import { useState } from 'react';
import StoreAmoundAddModal from './StoreAmountAddModal';
import { useNavigate } from 'react-router-dom';
import Table3 from '../../components/table/executive/Table3';
import { useDispatch, useSelector } from 'react-redux';
import { getExecutiveStore, getSingleExecutiveStore,  } from '../../redux/featuer/executive/ExecutiveSlice';

const Store = () => {

    const navigate=useNavigate()
    const [AmountshowModal, setAmountShowModal] = useState(false);
    const [selectedStore , setSelectedStore]=useState({})

    const executive_id=useSelector((state)=>state?.executiveAuth?.executive.id)
  // console.log(executive_id,'iiiiiiiiii');

  

  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(getExecutiveStore(executive_id));

    
  }, [dispatch]); // Dependency array ensures the effect runs only when dispatch changes

  
  const storeData = useSelector((state) => state?.executive?.StoreData || []);

  // const dashBoardData = useSelector((state) => state?.executive?.DashboardData || []);


  console.log(storeData);

    // const handleViewStore = async (college) => {

    //     navigate("/executive/storeprofile");
    //   };
    
      const handleViewStore = async (store) => {
        console.log(store,'ccc');
        if (!store || !store.id) {
            console.error('Invalid executive object or ID');
            return;
        }
    
        try {
            // Dispatch action to get single college
            await dispatch(getSingleExecutiveStore(store.id));
    
            // Log college ID
            console.log(store.id, 'store ID');
    
            // Navigate to college detail page
            navigate("/executive/storeprofile");
        } catch (error) {
            console.error('Error fetching store data:', error);
            // Handle error gracefully, such as displaying a message to the user
        }
    };

      const handleAddAmount = (store) => {
        console.log(store,'tttttttt');
        setSelectedStore(store)
        setAmountShowModal(true); // Show the modal
       
      };
    // const storeData=[{no:'1',storeName:'Store 1',customerName:'Customer 1', total:'500000',due:'30000',paid:'3000',exicutive:'Exivutive 1' },
    // {no:'2',storeName:'Store 2',customerName:'Customer 2', total:'500000',due:'30000',paid:'3000',exicutive:'Exivutive 2',route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1', },
    // {no:'3',storeName:'Store 3',customerName:'Customer 3', total:'500000',due:'30000',paid:'3000',exicutive:'Exivutive 3' ,route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1',},
    // {no:'4',storeName:'Store 4',customerName:'Customer 4', total:'500000',due:'40000',paid:'3000',exicutive:'Exivutive 4' ,route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1',},
    // {no:'5',storeName:'Store 5',customerName:'Customer 5', total:'500000',due:'30000',paid:'3000',exicutive:'Exivutive 5' ,route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1',},
    // {no:'6',storeName:'Store 6',customerName:'Customer 6', total:'600000',due:'30000',paid:'3000',exicutive:'Exivutive 6' ,route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1',},
    // {no:'7',storeName:'Store 7',customerName:'Customer 7', total:'700000',due:'30000',paid:'3000',exicutive:'Exivutive 7' ,route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1',},
    // {no:'8',storeName:'Store 8',customerName:'Customer 8', total:'800000',due:'30000',paid:'3000',exicutive:'Exivutive 8' ,route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1',},
    // {no:'9',storeName:'Store 9',customerName:'Customer 9', total:'900000',due:'30000',paid:'3000',exicutive:'Exivutive 9' ,route:'calicut',mobile1:'1234567890',mobile2:'0987654321',address:'address 1',},]


    const columns = useMemo(
        () => ExecutiveStoreCollumn(handleViewStore,handleAddAmount),
        []
      );
  return (
    <div>
 <Table3 heading={"Store Details"} DATA={storeData.stores} COLUMNS={columns}   />

 {AmountshowModal && (
        <StoreAmoundAddModal
        store={selectedStore}
       
          onClose={() => setAmountShowModal(false)} // Pass a function to close the modal
        />
      )}
    </div>
  )
}

export default Store