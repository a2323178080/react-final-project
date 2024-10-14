import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import OrderModal from "../../../components/order-modal";
// @ts-ignore
import { Modal } from "bootstrap";
import {Pagination,message} from 'antd';

interface User {
    name: string;
    email: string;
    address?: string;
}

interface Order {
    id: number;
    user: User | null;
    total: number;
    is_paid: string;
    paid_date: number | null;
    message: string;
    products?: {
        id: number;
        product: {
            title: string;
        };
        qty: number;
    }[];
}

interface PaginationInfo {
    total_pages: number;
}
export default function AdminOrders(){
    const [orders, setOrders] = useState<Order[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>({total_pages: 0});
    const [tempOrder, setTempOrder] = useState<Order | null>(null);
    const orderModal = useRef<Modal | null>(null);
    useEffect(() => {
        orderModal.current = new Modal('#orderModal', {
            backdrop: 'static',
        });
        getOrders();
    }, []);
    const getOrders = async (page = 1) => {
        const res = await axios.get(
            // 取得訂單
            `/admin/orders?page=${page}&pageSize=5`
        );
        setOrders(res?.data?.orders);
        setPagination(res.data.pagination);
    }
    const openOrderModal = (order: Order) => {
        setTempOrder(order);
        orderModal.current.show();
    }
    const closeOrderModal = () => {
        setTempOrder(null);
        orderModal.current.hide();
    }
    const [current, setCurrent] = useState<number>(1);
    const switchPage = (page: number) => {
        getOrders(page)
        setCurrent(page);
    };
    return(
    <div className="p-3">
        <OrderModal
            closeProductModal={closeOrderModal}
            getOrders={getOrders}
            tempOrder={tempOrder as any}
        />
        <h3>訂單列表</h3>
        <hr />
        <table className='table'>
            <thead>
            <tr>
                <th scope='col'>訂單 id</th>
                <th scope='col'>購買用戶</th>
                <th scope='col'>訂單金額</th>
                <th scope='col'>付款狀態</th>
                <th scope='col'>付款日期</th>
                <th scope='col'>留言訊息</th>
                <th scope='col'>編輯</th>
            </tr>
            </thead>
            <tbody>
            {orders
                ?.reverse()
                ?.map((order) => {
                return (
                    <tr key={order?.id}>
                        <td>{order?.id}</td>
                        <td>
                            <span>{order?.user?.name}</span>&emsp;
                            <span>email:{order?.user?.email}</span>
                        </td>
                        <td>${order?.total}</td>
                        <td>
                            {order.is_paid ? (
                                <span className='text-success fw-bold'>付款完成</span>
                            ) : (
                                '未付款'
                            )}
                        </td>
                        <td>
                            {order.paid_date
                                ? new Date(order.paid_date * 1000).toLocaleString()
                                : '-'}
                        </td>
                        <td>{order?.message}</td>
                        <td>
                            <button
                                type='button'
                                className='btn btn-primary btn-sm'
                                onClick={() => {
                                    openOrderModal(order);
                                }}
                            >
                                查看
                            </button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
        <div className="mt-5">
            <Pagination current={current} onChange={switchPage} total={parseInt(String(pagination.total_pages), 10) * 10|| 0}/>
        </div>
    </div>
    )
}
