import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
const Cart = ({ cartData, setIsScreenLoading, getCart }) => {
  //清空購物車
  const removeCart = async () => {
    setIsScreenLoading(true);
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
      getCart();
    } catch (error) {
      alert("清空失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  //刪除單一購物車
  const removeCartItem = async (id) => {
    setIsScreenLoading(true);
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${id}`);
      getCart();
    } catch (error) {
      alert("刪除失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  //更新購物車
  const updateCartItem = async (cartId, productId, qty) => {
    setIsScreenLoading(true);
    try {
      await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartId}`, {
        data: {
          product_id: productId,
          qty: qty,
        },
      });
      getCart();
    } catch (error) {
      alert("更新失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  return (
    <>
      <div className="text-end py-3">
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={removeCart}
        >
          清空購物車
        </button>
      </div>
      <table className="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style={{ width: "150px" }}>數量/單位</th>
            <th className="text-end">單價</th>
          </tr>
        </thead>
        <tbody>
          {cartData.carts?.map((cartItem) => {
            return (
              <tr key={cartItem.id}>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeCartItem(cartItem.id)}
                  >
                    x
                  </button>
                </td>
                <td>{cartItem.product.title}</td>
                <td style={{ width: "150px" }}>
                  <div className="d-flex align-items-center">
                    <div className="btn-group me-2" role="group">
                      <button
                        disabled={cartItem.qty === 1}
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => {
                          updateCartItem(
                            cartItem.id,
                            cartItem.product_id,
                            cartItem.qty - 1
                          );
                        }}
                      >
                        -
                      </button>
                      <span
                        className="btn border border-dark"
                        style={{ width: "50px", cursor: "auto" }}
                      >
                        {cartItem.qty}
                      </span>
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => {
                          updateCartItem(
                            cartItem.id,
                            cartItem.product_id,
                            cartItem.qty + 1
                          );
                        }}
                      >
                        +
                      </button>
                    </div>
                    <span className="input-group-text bg-transparent border-0">
                      {cartItem.product.unit}
                    </span>
                  </div>
                </td>
                <td className="text-end">{cartItem.product.price}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end">
              總計：
            </td>
            <td className="text-end" style={{ width: "130px" }}>
              {cartData.total}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};
export default Cart;
