import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./styles/ProductForm.module.css";

import Button from "../UI/Button";

const ProductForm = ({ onSubmitHandler }) => {
  const navigate = useNavigate();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productOnSale, setProductOnSale] = useState("no");
  const [productDiscount, setProductDiscount] = useState("");
  const [productImage, setProductImage] = useState("");

  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [productData, setProductData] = useState({});

  const [validProductName, setValidProductName] = useState(false);
  const [validProductCategory, setValidProductCategory] = useState(false);
  const [validProductDescription, setValidProductDescription] = useState(false);
  const [validProductPrice, setValidProductPrice] = useState(false);
  const [validProductOnSale, setValidProductOnSale] = useState(false);
  const [validProductDiscount, setValidProductDiscount] = useState(false);
  const [validFileInput, setValidFileInput] = useState(false);

  const onProductNameChangeHandler = (event) => {
    setProductName(event.target.value);
  };

  const onProductCategoryChangeHandler = (event) => {
    setProductCategory(event.target.value);
  };

  const onProductDescriptionChangeHandler = (event) => {
    setProductDescription(event.target.value);
  };

  const onProductPriceChangeHandler = (event) => {
    setProductPrice(Number(event.target.value));
  };

  const onProductOnSaleChangeHandler = (event) => {
    setProductOnSale(event.target.value);
  };

  const onProductDiscountChangeHandler = (event) => {
    setProductDiscount(Number(event.target.value));
  };

  const onImageChangeHandler = (event) => {
    setProductImage(event.target.value);
  };

  useEffect(() => {
    if (productName !== "") {
      setValidProductName(true);
    } else setValidProductName(false);

    if (productCategory !== "") {
      setValidProductCategory(true);
    } else setValidProductCategory(false);

    if (productDescription !== "") {
      setValidProductDescription(true);
    } else setValidProductDescription(false);

    if (productPrice !== "" && productPrice > 0) {
      setValidProductPrice(true);
    } else {
      setValidProductPrice(false);
      setProductPrice("");
    }

    if (productOnSale !== "") {
      setValidProductOnSale(true);
    } else {
      setValidProductOnSale(false);
    }

    if (productOnSale === "yes") {
      setShowDiscountInput(true);
    } else {
      setShowDiscountInput(false);
    }

    if (showDiscountInput) {
      if (
        productDiscount !== "" &&
        productDiscount > 0 &&
        productDiscount <= 100
      ) {
        setValidProductDiscount(true);
      } else {
        setValidProductDiscount(false);
        setProductDiscount("");
      }
    } else {
      setProductDiscount("");
      setValidProductDiscount(true);
    }

    if (productImage !== "") {
      setValidFileInput(true);
    } else {
      setValidFileInput(false);
    }

    if (
      validProductName &&
      validProductCategory &&
      validProductDescription &&
      validProductPrice &&
      validProductOnSale &&
      validProductDiscount &&
      validFileInput
    ) {
      setProductData({
        name: productName,
        category: productCategory,
        description: productDescription,
        price: productPrice,
        onSale: productOnSale,
        discount: productDiscount,
      });

      setButtonDisabled(false);
    } else setButtonDisabled(true);
  }, [
    productName,
    productCategory,
    productDescription,
    productPrice,
    productOnSale,
    productDiscount,
    productImage,
    showDiscountInput,
    validProductName,
    validProductCategory,
    validProductDescription,
    validProductPrice,
    validProductOnSale,
    validProductDiscount,
    validFileInput,
  ]);

  const onAddProductFormSubmitHandler = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "imageFile"
    );

    onSubmitHandler(productData, fileInput);

    setProductName("");
    setProductCategory("");
    setProductDescription("");
    setProductPrice("");
    setProductOnSale("no");
    setProductDiscount(0);

    form.reset();
    navigate("/products");
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.h1}>Add A New Product To The Shop:</h1>
      <form className={styles.form} onSubmit={onAddProductFormSubmitHandler}>
        <div className={styles.formField}>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            autoComplete="off"
            value={productName}
            onChange={onProductNameChangeHandler}
            className={`${validProductName && styles.validFormField}`}
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            type="text"
            value={productCategory}
            onChange={onProductCategoryChangeHandler}
            className={`${validProductCategory && styles.validFormField}`}
          >
            <option value="">--Select Category--</option>
            <option value="clothes">Clothes</option>
            <option value="shoes">Shoes</option>
            <option value="accesoires">Accesoires</option>
            <option value="electronics">Electronics</option>
            <option value="travel">Travel</option>
          </select>
        </div>
        <div className={styles.formField}>
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            value={productDescription}
            onChange={onProductDescriptionChangeHandler}
            className={`${validProductDescription && styles.validFormField}`}
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="price">Price: </label>
          <input
            id="price"
            type="number"
            autoComplete="off"
            value={productPrice}
            onChange={onProductPriceChangeHandler}
            className={`${validProductPrice && styles.validFormField}`}
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="onSale">On Sale? </label>
          <select
            id="onSale"
            type="text"
            value={productOnSale}
            onChange={onProductOnSaleChangeHandler}
            className={`${validProductOnSale && styles.validFormField}`}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        {showDiscountInput && (
          <div className={styles.formField}>
            <label htmlFor="discount">Discount(% 1 - 100): </label>
            <input
              id="discount"
              type="number"
              autoComplete="off"
              value={productDiscount}
              onChange={onProductDiscountChangeHandler}
              className={`${validProductDiscount && styles.validFormField}`}
            />
          </div>
        )}

        <div className={styles.formField}>
          <label htmlFor="image">Image: </label>
          <input
            id="image"
            name="imageFile"
            type="file"
            className={`${validFileInput && styles.validFormField}`}
            onChange={onImageChangeHandler}
          />
        </div>

        <Button
          buttonText={buttonDisabled ? "Complete Form" : "Add Product"}
          className={`${styles.button} ${
            !buttonDisabled && styles.buttonEnabled
          }`}
          disabled={buttonDisabled}
        />
      </form>
    </div>
  );
};

export default ProductForm;
