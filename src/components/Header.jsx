import React from "react";
import "./styles.css";
import {
  Navbar,
  Nav,
  Button,
  Container,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { CartState } from "../context/Context";

// components
import Cart from "./Cart";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    filterDispatch,
  } = CartState();
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
        <Container>
          <Navbar.Brand>
            <NavLink to="/">Shopping Cart</NavLink>
          </Navbar.Brand>
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 500 }}
              placeholder="Search a product"
              className="m-auto"
              onChange={(e) => {
                filterDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="success">
                <FaShoppingCart color="white" fontSize="25px" />
                <span style={{ fontSize: "16px", margin: "0 5px" }}>
                  {cart.length}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ minWidth: 370 }}>
                {cart.length > 0 ? (
                  <>
                    {cart.map((product) => (
                      <span className="cartItem" key={product.id}>
                        <img
                          src={product.image}
                          className="cartItemImg"
                          alt={product.name}
                        />
                        <div className="cartItemDetail">
                          <span>{product.name}</span>
                          <span>₹ {product.price.split(".")[0]}</span>
                        </div>
                        <AiFillDelete
                          fontSize="20px"
                          style={{
                            cursor: "pointer",
                            margin: "3px 15px 0 auto",
                          }}
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: product,
                            })
                          }
                        />
                      </span>
                    ))}
                    <NavLink to="/cart">
                      <Button style={{ width: "95%", margin: "0 10px" }}>
                        Go To Cart
                      </Button>
                    </NavLink>
                  </>
                ) : (
                  <span style={{ padding: 10 }}>Cart is Empty!</span>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
