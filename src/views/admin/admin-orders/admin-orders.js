import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import OrderModal from "../../../components/order-modal";
import { Modal } from "bootstrap";
import {Pagination,message} from 'antd';
export default function AdminOrders(){
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({});
    const [tempOrder, setTempOrder] = useState({});
    const orderModal = useRef(null);
    useEffect(() => {
        orderModal.current = new Modal('#orderModal', {
            backdrop: 'static',
        });
        getOrders();
    }, []);
    const getOrders = async (page = 1) => {
        const res = await axios.get(
            `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`,
        );
        setOrders(res.data.orders);
        setPagination(res.data.pagination);
    }
    const openOrderModal = (order) => {
        setTempOrder(order);
        orderModal.current.show();
    }
    const closeOrderModal = () => {
        setTempOrder({});
        orderModal.current.hide();
    }
    const [current, setCurrent] = useState(1);
    const switchPage = (page) => {
        getOrders(page)
        setCurrent(page);
    };
    return(
    <div className="p-3">
        <OrderModal
            closeProductModal={closeOrderModal}
            getOrders={getOrders}
            tempOrder={tempOrder}
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
            {orders.map((order) => {
                return (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>
                            <span>{order.user?.name}</span>&emsp;
                            <span>email:{order.user?.email}</span>
                        </td>
                        <td>${order.total}</td>
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
                        <td>{order.message}</td>
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
            <Pagination current={current} onChange={switchPage} total={parseInt(pagination.total_pages, 10) * 10|| 0}/>
        </div>
    </div>
    )
}
