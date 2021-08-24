import React, { useEffect, useState } from 'react';
import AppLayout from '../../container/appLayout/AppLayout';
import axios from '../../utils/axios';
import Loader from '../../utils/Loader';
import DataTable from './DataTable';

export interface OrdersData {
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: string;
    orderTime: string;
    _id: string;
    valID: string;
    tranID: string;
    name: string;
    address: string;
    givenNumber: string;
    qty: number | string;
    product: {
        _id: string;
        name: string;
        dis: string;
        price: number | string;
        image: string;
    };
    userNumber: string;
}

const Orders = () => {
    const [apiData, setApiData] = useState<OrdersData[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    const [update, setUpdate] = useState(0);

    const forceUpdate = () => setUpdate((i) => i + 1);

    useEffect(() => {
        const apiResponse = async () => {
            const token = `Bearer ${localStorage.getItem('token')}`;

            setIsLoading(true);

            try {
                const response = await axios.get('/shop/order', {
                    headers: { Authorization: token },
                });

                if (response) setIsLoading(false);

                setApiData(response.data);
            } catch (err) {
                setIsLoading(false);
                // eslint-disable-next-line no-alert
                alert(err?.response?.data?.message ?? 'Something went wrong');
            }
        };
        apiResponse();
    }, [update]);

    return (
        <AppLayout dawerOpen shopOpen>
            <Loader open={isLoading} />
            <DataTable apiData={apiData} forceUpdate={forceUpdate} />
        </AppLayout>
    );
};

export default Orders;
