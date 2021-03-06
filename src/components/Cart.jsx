import React, { useState, useEffect } from "react";
import { ListGroup, Button, Row, Col, Form, Image } from "react-bootstrap";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";

import Rating from "./Rating";
const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState(0);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const displayRazorPay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Faild to load Razorpay SDK");
      return;
    }
    const options = {
      key: "rzp_test_xmuQqNoI8E5CuM",
      currency: "INR",
      amount: amount * 100,
      name: "payMENT",
      description: "Thanks for making payment using RazorPay",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert("Payment is successfull");
      },
      prefill: {
        name: "RazorPay",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const makePayment = (e) => {
    e.preventDefault();
    displayRazorPay(total);
  };

  useEffect(() => {
    let sum = 0;
    cart.map((product) => (sum += Number(product.price * product.qty)));
    setTotal(sum);
  }, [cart]);

  return (
    <>
      <div className="home">
        <div className="productContainer">
          <ListGroup>
            {cart.map((product) => (
              <ListGroup.Item key={product.id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={2}>
                    <span>{product.name}</span>
                  </Col>
                  <Col md={2}>
                    <span>{product.price}</span>
                  </Col>
                  <Col md={2}>
                    <Rating rating={product.ratings} />
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={product.qty}
                      onChange={(e) =>
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: product.id,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {[...Array(product.inStock).keys()].map((x) => (
                        <option key={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: product,
                        })
                      }
                    >
                      <AiFillDelete fontSize="20px" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="filters summary">
          <span className="title">Subtotal ({cart.length}) items</span>
          <span style={{ fontWeight: 700, fontSize: 20, display: "block" }}>
            Total : ???{total}
          </span>
          <Button
            onClick={makePayment}
            type="button"
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
