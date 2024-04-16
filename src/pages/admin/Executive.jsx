import React  from "react";
import { ExecutiveCollumn } from "../../components/table/ExicutiveCollumn";
import Table from "../../components/table/Table";
import Button from "../../components/commonComponents/Button";
import { useState,useMemo } from "react";
import ExecutiveCreateModal from "./ExecutiveCreateModal";
import ExecutiveEditModal from "./ExecutiveEditModal";
import { useNavigate } from "react-router-dom";

const Executive = () => {
const navigate=useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [editShowModal, setEditShowModal] = useState(false);
    const [edingExecutive,setEditingExecutive]=useState({})

    const handleModal = () => {
        setShowModal(true); // Show the modal
      };

      const handleViewExecutive = async (college) => {
      
        navigate("/admin/executiveprofile");
      };
    

      const handleEdit = (executive) => {
        console.log(executive,'eeeeeeeeeee');
        setEditingExecutive(executive)
         setEditShowModal(true); // Show the modal
       };

       const executives = [
        { 
            no: 1,
            executiveName: "Executive 1",
            mobile1: "1234567890",
            mobile2: "9876543210",
            username: "executive1_username",
            address: "Executive 1 Address",
            numOfStore: 5,
            dueAmount: 1000,
            totalAmount: 5000,
            status: "Active",
        },
        { 
            no: 2,
            executiveName: "Executive 2",
            mobile1: "1234567890",
            mobile2: "9876543210",
            username: "executive2_username",
            address: "Executive 2 Address",
            numOfStore: 3,
            dueAmount: 500,
            totalAmount: 3000,
            status: "Inactive",
        },
        { 
            no: 3,
            executiveName: "Executive 3",
            mobile1: "1234567890",
            mobile2: "9876543210",
            username: "executive3_username",
            address: "Executive 3 Address",
            numOfStore: 7,
            dueAmount: 1500,
            totalAmount: 7000,
            status: "Active",
        },
        { 
            no: 4,
            executiveName: "Executive 4",
            mobile1: "1234567890",
            mobile2: "9876543210",
            username: "executive4_username",
            address: "Executive 4 Address",
            numOfStore: 2,
            dueAmount: 200,
            totalAmount: 1000,
            status: "Active",
        },
        { 
            no: 5,
            executiveName: "Executive 5",
            mobile1: "1234567890",
            mobile2: "9876543210",
            username: "executive5_username",
            address: "Executive 5 Address",
            numOfStore: 4,
            dueAmount: 800,
            totalAmount: 4000,
            status: "Inactive",
        },
        { 
            no: 6,
            executiveName: "Executive 6",
            mobile1: "1234567890",
            mobile2: "9876543210",
            username: "executive6_username",
            address: "Executive 6 Address",
            numOfStore: 6,
            dueAmount: 1200,
            totalAmount: 6000,
            status: "Active",
        },
        { 
            no: 7,
            executiveName: "Executive 7",
            mobile1: "1234567890",
            mobile2: "9876543210",
            username: "executive7_username",
            address: "Executive 7 Address",
            numOfStore: 1,
            dueAmount: 100,
            totalAmount: 500,
            status: "Inactive",
        },
        { 
            no: 8,
            executiveName: "Executive 8",
            mobile1: "1234567890",
            mobile2: "9876543210",
            username: "executive8_username",
            address: "Executive 8 Address",
            numOfStore: 9,
            dueAmount: 1800,
            totalAmount: 9000,
            status: "Active",
        },
        { 
            no: 9,
            executiveName: "Executive 9",
            mobile1: "1234567890",
            mobile2: "9876543210",
            username: "executive9_username",
            address: "Executive 9 Address",
            numOfStore: 8,
            dueAmount: 1600,
            totalAmount: 8000,
            status: "Active",
        },
    ];
    

  const columns = useMemo(
    () => ExecutiveCollumn(handleViewExecutive,handleEdit),
    []
  );

  return (
    <div className="relative p-5">
         <div className='w-full bg-red-0 z-10 flex justify-end absolute right-6 top-6' >
            <div onClick={handleModal}>
        <Button className='' title="+ Add Executive" />
        </div>
        </div>
      <Table heading={""} DATA={executives} COLUMNS={columns} />

      {showModal && (
        <ExecutiveCreateModal
          // college={selectedCollege}
          onClose={() => setShowModal(false)} // Pass a function to close the modal
        />
      )}

{editShowModal && (
        <ExecutiveEditModal
          executive={edingExecutive}
          onEditClose={() => setEditShowModal(false)} // Pass a function to close the modal
        />
      )}
    </div>

    
  );
};

export default Executive;
