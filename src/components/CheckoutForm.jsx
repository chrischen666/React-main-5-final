

import { useForm } from "react-hook-form";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const CheckoutForm = ({setIsScreenLoading,getCart})=>{
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
    
      const onSubmit = (data) => {
        checkout(data);
      };

      //結帳api
        const checkout = async (data) => {
          const { message, ...user } = data;
          setIsScreenLoading(true);
          try {
            await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order/`, {
              data: {
                user,
                message,
              },
            });
            getCart();
            reset();
          } catch (error) {
            alert("結帳失敗");
          } finally {
            setIsScreenLoading(false);
          }
        };

    return (
        <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "email必填",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "email格式錯誤",
              },
            })}
            id="email"
            type="email"
            className={`form-control ${errors.email && "is-invalid"}`}
            placeholder="請輸入 Email"
          />
          {errors.email && (
            <p className="text-danger my-2">{errors.email?.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            收件人姓名
          </label>
          <input
            id="name"
            className={`form-control ${errors.name && "is-invalid"}`}
            placeholder="請輸入姓名"
            {...register("name", {
              required: {
                value: true,
                message: "姓名必填",
              },
            })}
          />

          {errors.name && (
            <p className="text-danger my-2">{errors.name?.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="tel" className="form-label">
            收件人電話
          </label>
          <input
            id="tel"
            type="text"
            className={`form-control ${errors.tel && "is-invalid"}`}
            placeholder="請輸入電話"
            {...register("tel", {
              required: {
                value: true,
                message: "電話必填",
              },
              pattern:{
                value: /^(0[2-8]\d{7}|09\d{8})$/,
                message: '電話格式錯誤'
              }
            })}
          />

          {errors.tel && (
            <p className="text-danger my-2">{errors.tel?.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            收件人地址
          </label>
          <input
            id="address"
            type="text"
            className={`form-control ${errors.address && "is-invalid"}`}
            placeholder="請輸入地址"
            {...register("address", {
              required: {
                value: true,
                message: "地址必填",
              },
            })}
          />

          {errors.address && (
            <p className="text-danger my-2">{errors.address?.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            留言
          </label>
          <textarea
            {...register("message")}
            id="message"
            className={`form-control ${errors.message && "is-invalid"}`}
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className="text-end">
          <button type="submit" className="btn btn-danger">
            送出訂單
          </button>
        </div>
      </form>
    )
}
export default CheckoutForm;