import React from "react";
import "./styles.css";
import { Form, Button } from "react-bootstrap";

// components
import Rating from "./Rating";
import { CartState } from "../context/Context";

const Filter = () => {
  const {
    filterState: { byStock, byFastDelivery, sort, byRating, searchQuery },
    filterDispatch,
  } = CartState();
  console.log(byStock, byFastDelivery, sort, byRating, searchQuery);
  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() => {
            filterDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            });
          }}
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() => {
            filterDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            });
          }}
          checked={sort === "hightoLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() =>
            filterDispatch({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() =>
            filterDispatch({
              type: "FILTER_BY_DELIVERY",
            })
          }
          checked={byFastDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          onClick={(i) =>
            filterDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        variant="light"
        onClick={() =>
          filterDispatch({
            type: "CLEAR_FILTERS",
          })
        }
        style={{ display: "block", marginTop: "10px" }}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filter;
