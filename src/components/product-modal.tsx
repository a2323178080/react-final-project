import axios from "axios";
import {useState, useEffect, useRef} from "react";
import {message} from 'antd';

interface ProductModalProps {
    closeProductModal: () => void;
    getProducts: (pageIndex: number) => void;
    type: string;
    tempProduct?: {
        id: number;
        title: string;
        category: string;
        origin_price: number;
        price: number;
        unit: string;
        description: string;
        content: string;
        is_enabled: number;
        imageUrl: string;
    };
    pageIndex: number;
}

interface TempData {
    title: string;
    category: string;
    origin_price: number;
    price: number;
    unit: string;
    description: string;
    content: string;
    is_enabled: number;
    imageUrl: string;
}

export default function ProductModal({closeProductModal, getProducts, type, tempProduct, pageIndex}: ProductModalProps) {
    const [tempData, setTempData] = useState<TempData >({
        title: '',
        category: '',
        origin_price: 100,
        price: 300,
        unit: '',
        description: '',
        content: '',
        is_enabled: 1,
        imageUrl: '',
    });

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (type === 'create') {
            setTempData({
                title: '',
                category: '',
                origin_price: 100,
                price: 300,
                unit: '',
                description: '',
                content: '',
                is_enabled: 1,
                imageUrl: '',
            });
        } else if (type === 'edit' && tempProduct) {
            setTempData(tempProduct);
        }
    }, [type, tempProduct]);
    const handleChange = (e: any) => {
        const {value, name} = e.target;
        if (['price', 'origin_price'].includes(name)) {
            setTempData({
                ...tempData,
                [name]: Number(value),
            });
        } else if (name === 'is_enabled') {
            setTempData({
                ...tempData,
                [name]: +e.target.checked, // boolean
            });
        } else {
            setTempData({
                ...tempData,
                [name]: value,
            })
        }
    }

    const submit = async () => {
        try {
            // 新增後台商品
            let api = '/admin/product';
            let method = 'post';
            if (type === 'edit') {
                // 編輯後台產品
                api = `/admin/product/${tempProduct?.id}`;
                method = 'put';
            }
            const res = await (axios as any)[method](
                api,
                {
                    data: tempData,
                },
            );
            getProducts(pageIndex)
            closeProductModal()
            type==="create"?message.success("建立成功"):message.success("編輯成功")
        } catch (error: any) {
            console.log(error.response);
            message.error(error.response?.data.message?.join("、"))
        }
    }
    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];

        if (file) {
            // 使用FileReader读取文件并将其转换为DataURL
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempData({
                    ...tempData,
                    imageUrl: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const closeModal = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        closeProductModal();
    };

    return (
        <div
            className='modal fade mt-5'
            tabIndex={-1}
            id='productModal'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
        >
            <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='exampleModalLabel'>
                            {type === 'create' ? '建立新商品' : `編輯 ${tempData.title}`}
                        </h1>
                        <button
                            type='button'
                            className='btn-close'
                            aria-label='Close'
                            onClick={closeModal}
                        />
                    </div>
                    <div className='modal-body'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='image'>
                                        輸入圖片網址
                                        <input
                                            type='text'
                                            name='imageUrl'
                                            id='image'
                                            placeholder='請輸入圖片連結'
                                            className='form-control'
                                            onChange={handleChange}
                                            value={tempData.imageUrl}
                                        />
                                    </label>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='customFile'>
                                        或 上傳圖片
                                        <input
                                            type='file'
                                            id='customFile'
                                            className='form-control'
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                        />
                                    </label>
                                </div>
                                <img src={tempData.imageUrl} alt='' className='img-fluid'/>
                            </div>
                            <div className='col-sm-8'>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='title'>
                                        標題
                                        <input
                                            type='text'
                                            id='title'
                                            name='title'
                                            placeholder='請輸入標題'
                                            className='form-control'
                                            onChange={handleChange}
                                            value={tempData.title}
                                        />
                                    </label>
                                </div>
                                <div className='row'>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='category'>
                                            分類
                                            <input
                                                type='text'
                                                id='category'
                                                name='category'
                                                placeholder='請輸入分類'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.category}
                                            />
                                        </label>
                                    </div>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='unit'>
                                            單位
                                            <input
                                                type='unit'
                                                id='unit'
                                                name='unit'
                                                placeholder='請輸入單位'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.unit}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='origin_price'>
                                            原價
                                            <input
                                                type='number'
                                                id='origin_price'
                                                name='origin_price'
                                                placeholder='請輸入原價'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.origin_price}
                                            />
                                        </label>
                                    </div>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='price'>
                                            售價
                                            <input
                                                type='number'
                                                id='price'
                                                name='price'
                                                placeholder='請輸入售價'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.price}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <hr/>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='description'>
                                        產品描述
                                        <textarea
                                            id='description'
                                            name='description'
                                            placeholder='請輸入產品描述'
                                            className='form-control'
                                            onChange={handleChange}
                                            value={tempData.description}
                                        />
                                    </label>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='content'>
                                        說明內容
                                        <textarea
                                            id='content'
                                            name='content'
                                            placeholder='請輸入產品說明內容'
                                            className='form-control'
                                            onChange={handleChange}
                                            value={tempData.content}
                                        />
                                    </label>
                                </div>
                                <div className='form-group mb-2'>
                                    <div className='form-check'>
                                        <label
                                            className='w-100 form-check-label'
                                            htmlFor='is_enabled'
                                        >
                                            是否啟用
                                            <input
                                                type='checkbox'
                                                id='is_enabled'
                                                name='is_enabled'
                                                placeholder='請輸入產品說明內容'
                                                className='form-check-input'
                                                onChange={handleChange}
                                                checked={Boolean(tempData.is_enabled)}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
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
    );
}
