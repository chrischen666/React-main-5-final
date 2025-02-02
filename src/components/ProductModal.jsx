import {  useState } from "react";
import { Modal } from "bootstrap";

import ReactLoading from "react-loading";

const ProductModal = ({ productModalRef, tempProduct,isLoading,addCartItem }) => {
  const [qtySelect, setQtySelect] = useState(1);

  //關閉modal
  const closeModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.hide();
  };

  return (
    <div
      ref={productModalRef}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      className="modal fade"
      id="productModal"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title fs-5">產品名稱：{tempProduct.title}</h2>
            <button
              onClick={closeModal}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <img
              src={tempProduct.imageUrl}
              alt={tempProduct.title}
              className="img-fluid"
            />
            <p>內容：{tempProduct.content}</p>
            <p>描述：{tempProduct.description}</p>
            <p>
              價錢：{tempProduct.price} <del>{tempProduct.origin_price}</del> 元
            </p>
            <div className="input-group align-items-center">
              <label htmlFor="qtySelect">數量：</label>
              <select
                value={qtySelect}
                onChange={(e) => setQtySelect(e.target.value)}
                id="qtySelect"
                className="form-select"
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              disabled={isLoading}
              type="button"
              className="btn btn-primary d-flex align-items-center gap-2"
              onClick={() => {
                addCartItem(tempProduct.id, qtySelect);
              }}
            >
              加入購物車
              {isLoading && (
                <ReactLoading
                  type={"spin"}
                  color={"#000"}
                  height={"1.5rem"}
                  width={"1.5rem"}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductModal;
