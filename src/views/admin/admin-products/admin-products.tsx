import {useEffect, useRef, useState} from "react";
import axios from "axios";
import ProductModal from "../../../components/product-modal";
import DeleteModal from "../../../components/delete-modal";
// @ts-ignore
import {Modal} from "bootstrap";
import {Pagination,message} from 'antd';

interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    is_enabled: boolean;
}

interface PaginationInfo {
    total_pages: number;
}

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>({total_pages: 0});
    const productModal = useRef<Modal | null>(null);
    const deleteModal = useRef<Modal | null>(null);

    // type: 決定 modal 展開的用途
    const [type, setType] = useState<string>('create'); // edit
    const [tempProduct, setTempProduct] = useState<Product | null>(null)
    const [pageIndex, setPageIndex] = useState<number>(1);

    useEffect(() => {
        productModal.current = new Modal('#productModal', {
            backdrop: 'static',
        });
        deleteModal.current = new Modal('#deleteModal', {
            backdrop: 'static',
        });
        getProducts();

    }, []);

    const getProducts = async (page: number = 1) => {
        const productRes = await axios.get(
            // 取得後台產品
            `/admin/products?page=${page}&pageSize=5`
        );
        setProducts(productRes?.data?.products);
        setPagination(productRes?.data?.pagination);
    };
    const openProductModal = (type: string, product: any) => {
        setType(type);
        setTempProduct(product);
        productModal.current.show();
    }
    const closeProductModal = () => {
        productModal.current.hide();
    }
    const openDeleteModal = (product: Product) => {
        setTempProduct(product);
        deleteModal.current.show();
    };
    const closeDeleteModal = () => {
        deleteModal.current.hide();
    };
    const deleteProduct = async (id: number) => {
        try {
            const res = await axios.delete(
                // 刪除後台產品
                `/admin/product/${id}`
            );
            if (res?.data?.success) {
                await getProducts(pageIndex);
                if (products.length === 1 && pageIndex > 1) {
                    setPageIndex(pageIndex - 1);
                    getProducts(pageIndex - 1);
                }
                deleteModal.current.hide();
                message.success("刪除成功")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [current, setCurrent] = useState(1);
    const switchPage = (page: number) => {
        setPageIndex(page)
        getProducts(page)
        setCurrent(page);
    };

    return (<div className="p-3">
        <DeleteModal
            close={closeDeleteModal}
            text={tempProduct?.title as string}
            handleDelete={deleteProduct}
            id={tempProduct?.id as number}
        />
        <h3>產品列表</h3>
        <ProductModal closeProductModal={closeProductModal}
                      getProducts={getProducts}
                      tempProduct={tempProduct as any}
                      type={type}
                      pageIndex={pageIndex}/>
        <hr/>
        <div className='text-end'>
            <button
                type='button'
                className='btn btn-primary btn-sm'
                onClick={() => openProductModal('create', {})}
            >
                建立新商品
            </button>
        </div>
        <table className='table'>
            <thead>
            <tr>
                <th scope='col'>分類</th>
                <th scope='col'>名稱</th>
                <th scope='col'>售價</th>
                <th scope='col'>啟用狀態</th>
                <th scope='col'>編輯</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product) => {
                return (<tr key={product.id}>
                    <td>{product.category}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                    <td>
                        <button
                            type='button'
                            className='btn btn-primary btn-sm'
                            onClick={() => openProductModal('edit', product)}
                        >
                            編輯
                        </button>
                        <button
                            type='button'
                            className='btn btn-outline-danger btn-sm ms-2'
                            onClick={() => openDeleteModal(product)}
                        >
                            刪除
                        </button>
                    </td>
                </tr>);
            })}
            </tbody>
        </table>

        <div className="mt-5">
        <Pagination current={current} onChange={switchPage} total={parseInt(String(pagination.total_pages), 10) * 10||0}/>
        </div>
    </div>)
}
