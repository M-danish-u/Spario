import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStores, getSingleStore } from '../../redux/featuer/admin/AdminSlice';
import { StoreCollumn } from '../../components/table/StoreCollumn';
import CreateStoreModal from './CreateStoreModal';
import Button from '../../components/commonComponents/Button';
import StoreEditModal from './StoreEditModal';
import Table3 from '../../components/table/executive/Table3';
import Table4 from '../../components/table/Table4';


const Store = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [editShowModal, setEditShowModal] = useState(false);
    const [editingStore, setEditingStore] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const handleViewStore = async (store) => {
        if (!store || !store.id) {
            console.error('Invalid store object or ID');
            return;
        }

        try {
            await dispatch(getSingleStore(store.id));
            console.log(store.id, 'store ID');
            navigate("/admin/storeprofile");
        } catch (error) {
            console.error('Error fetching store data:', error);
        }
    };

    const handleEdit = (store) => {
        setEditingStore(store);
        setEditShowModal(true);
    };

    const columns = useMemo(
        () => StoreCollumn(handleViewStore, handleEdit),
        []
    );

    const handleModal = () => {
        setShowModal(true);
    };

    const storeData = useSelector((state) => state?.admin?.AllStoreData?.stores || []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAllStores());
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching store data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <div className='p-4 relative '>
            <div className='w-full  z-10 flex justify-end  ' >
                <div onClick={handleModal}>
                    <Button className='' title="+ Add Store" />
                </div>
            </div>
            <div className='mt-4 bg-re-400'>
                {isLoading ? (
                    <p>Loading...</p> // Display loading message or spinner while data is being fetched
                ) : (
                    <Table4 heading={""} DATA={storeData} COLUMNS={columns} />
                )}
            </div>
            {showModal && (
                <CreateStoreModal
                    onClose={() => setShowModal(false)}
                />
            )}
            {editShowModal && (
                <StoreEditModal
                    store={editingStore}
                    onEditClose={() => setEditShowModal(false)}
                />
            )}
        </div>
    );
};

export default Store;
