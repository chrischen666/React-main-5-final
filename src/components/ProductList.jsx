import { Modal } from "bootstrap";
import ReactLoading from "react-loading";


const ProductList = ({products,setTempProduct,productModalRef,addCartItem,isLoading}) => {

    //查看更多
      const handleSeeMore = (product) => {
        setTempProduct(product);
        openModal();
      };

       //打開modal
  const openModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.show();
  };

  return (
    <table className="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td style={{ width: "200px" }}>
              <img
                className="img-fluid"
                src={product.imageUrl}
                alt={product.title}
              />
            </td>
            <td>{product.title}</td>
            <td>
              <del className="h6">原價 {product.origin_price} 元</del>
              <div className="h5">特價 {product.price}元</div>
            </td>
            <td>
              <div className="btn-group btn-group-sm">
                <button
                  onClick={() => handleSeeMore(product)}
                  type="button"
                  className="btn btn-outline-secondary"
                >
                  查看更多
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger d-flex align-items-center gap-2"
                  onClick={() => {
                    addCartItem(product.id, 1);
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ProductList;
