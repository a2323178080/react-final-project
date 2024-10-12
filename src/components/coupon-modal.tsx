import axios from "axios";
import { useEffect, useState } from "react";
import {message} from "antd";

interface Coupon {
    id?: number;
    title: string;
    percent: number;
    due_date: number;
    code: string;
    is_enabled: number;
}

interface CouponModalProps {
    closeModal: () => void;
    getCoupons: () => void;
    type: string;
    tempCoupon?: Coupon | null;
}
export default function CouponModal({ closeModal, getCoupons, type, tempCoupon }: CouponModalProps){
    const [tempData, setTempData] = useState<Coupon>({
        title: '',
        is_enabled: 1,
        percent: 80,
        due_date: 1555459200,
        code: 'testCode',
    });
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        if (type === 'create') {
            setTempData({
                title: '',
                is_enabled: 1,
                percent: 80,
                due_date: 1555459200,
                code: 'testCode',
            });
            setDate(new Date());
        } else if (type === 'edit') {
            setTempData(tempCoupon as Coupon);
            setDate(new Date(tempCoupon?.due_date as number))
        }
    }, [type, tempCoupon]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        if (['price', 'origin_price'].includes(name)) {
            setTempData({
                ...tempData,
                [name]: Number(value),
            });
        }else if (name === 'percent') {
            setTempData({
                ...tempData,
                [name]: Number(value), // 轉換成數字
            });
        }
        else if (name === 'is_enabled') {
            setTempData({
                ...tempData,
                [name]: +e.target.checked, // boolean
            });
        } else {
            setTempData({
                ...tempData,
                [name]: value,
            });
        }
    };

    const submit = async () => {
        try {
            // 新增優惠券
            let api = `/admin/coupon`
            let method= 'post';
            if (type === 'edit') {
                // 編輯優惠券
                api = `/admin/coupon/${tempCoupon?.id}`;
                method = 'put';
            }
            const res = await (axios as any)[method](
                api,
                {
                    data: {
                        ...tempData,
                        due_date: date.getTime(), // 轉換成 unix timestamp
                    },
                },
            );
            getCoupons();
            closeModal();
            type==="create"?message.success("建立成功"):message.success("編輯成功")
        } catch (error: any) {
            console.log(error);
            message.error(error.response?.data.message.join("、"))
        }
    };
    return(
    <div className='modal fade'
         tabIndex={-1}
         id='productModal'
         aria-labelledby='exampleModalLabel'
         aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h1 className='modal-title fs-5' id='exampleModalLabel'>
                        {type === 'create' ? '建立新優惠券' : `編輯 ${tempData.title}`}
                    </h1>
                    <button
                        type='button'
                        className='btn-close'
                        aria-label='Close'
                        onClick={closeModal}
                    />
                </div>
                <div className='modal-body'>
                    <div className='mb-2'>
                        <label className='w-100' htmlFor='title'>
                            標題
                            <input
                                type='text'
                                id='title'
                                placeholder='請輸入標題'
                                name='title'
                                className='form-control mt-1'
                                value={tempData.title}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 mb-2'>
                            <label className='w-100' htmlFor='percent'>
                                折扣（%）
                                <input
                                    type='number'
                                    name='percent'
                                    id='percent'
                                    placeholder='請輸入折扣（%）'
                                    className='form-control mt-1'
                                    value={tempData.percent}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className='col-md-6 mb-2'>
                            <label className='w-100' htmlFor='due_date'>
                                到期日
                                <input
                                    type='date'
                                    id='due_date'
                                    name='due_date'
                                    placeholder='請輸入到期日'
                                    className='form-control mt-1'
                                    value={`${date.getFullYear().toString()}-${(
                                        date.getMonth() + 1
                                    )
                                        .toString()
                                        .padStart(2, '0')}-${date
                                        .getDate()
                                        .toString()
                                        .padStart(2, '0')}`}
                                    onChange={(e) => {
                                        setDate(new Date(e.target.value));
                                    }}
                                />
                            </label>
                        </div>
                        <div className='col-md-6 mb-2'>
                            <label className='w-100' htmlFor='code'>
                                優惠碼
                                <input
                                    type='text'
                                    id='code'
                                    name='code'
                                    placeholder='請輸入優惠碼'
                                    className='form-control mt-1'
                                    value={tempData.code}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    <label className='form-check-label' htmlFor='is_enabled'>
                        <input
                            className='form-check-input me-2'
                            type='checkbox'
                            id='is_enabled'
                            name='is_enabled'
                            checked={tempData.is_enabled===1}
                            onChange={handleChange}
                        />
                        是否啟用
                    </label>
                </div>
                <div className='modal-footer'>
                    <button
                        type='button'
                        className='btn btn-secondary'
                        onClick={closeModal}
                    >
                        關閉
                    </button>
                    <button type='button' className='btn btn-primary' onClick={submit}>
                        儲存
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}
