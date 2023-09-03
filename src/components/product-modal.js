export default function ProductModal({closeProductModal}) {

    return (
        <div className='modal fade'
             id='productModal'
             tabIndex='-1'
             aria-labelledby='exampleModalLabel'
             aria-hidden='true'>

            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='exampleModalLabel'>
                            Modal title
                        </h1>
                        <button
                            type='button'
                            className='btn-close'
                            aria-label='Close'
                            onClick={closeProductModal}
                        ></button>
                    </div>
                    <div className='modal-body'>...</div>
                    <div className='modal-footer'>
                        <button
                            type='button'
                            className='btn btn-secondary'
                            onClick={closeProductModal}
                        >
                            Close
                        </button>
                        <button type='button' className='btn btn-primary'>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}