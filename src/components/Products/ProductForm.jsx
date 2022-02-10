import { useState, useEffect } from "react";

import styles from "./styles/ProductForm.module.css";

import Button from "../UI/Button";

const ProductForm = ({ onSubmitHandler }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [productData, setProductData] = useState({});

  const [validProductName, setValidProductName] = useState(false);
  const [validProductCategory, setValidProductCategory] = useState(false);
  const [validProductDescription, setValidProductDescription] = useState(false);
  const [validProductPrice, setValidProductPrice] = useState(false);

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
    } else setValidProductPrice(false);

    if (
      validProductName &&
      validProductCategory &&
      validProductDescription &&
      validProductPrice
    ) {
      setProductData({
        name: productName,
        category: productCategory,
        description: productDescription,
        price: productPrice,
      });

      setButtonDisabled(false);
    } else setButtonDisabled(true);
  }, [
    productName,
    productCategory,
    productDescription,
    productPrice,
    validProductName,
    validProductCategory,
    validProductDescription,
    validProductPrice,
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
          <label htmlFor="image">Image: </label>
          <input id="image" name="imageFile" type="file" />
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
