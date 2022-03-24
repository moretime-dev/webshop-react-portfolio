import { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { ProductsContext } from "../store/products-context.js";

import Button from "../components/UI/Button.jsx";

import styles from "./styles/EditProductPage.module.css";

import { db } from "../firebase_config";
import { updateDoc, doc, getDocs, collection } from "firebase/firestore";

const productCollection = collection(db, "products");

const EditProductPage = () => {
  const navigate = useNavigate();

  const params = useParams();
  const id = params.id;

  const [products, setProducts] = useContext(ProductsContext);
  const product = products.filter((product) => product.id === id);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [productName, setProductName] = useState(product[0].name);
  const [productCategory, setProductCategory] = useState(product[0].category);
  const [productDescription, setProductDescription] = useState(
    product[0].description
  );
  const [productPrice, setProductPrice] = useState(product[0].price);
  const [productOnSale, setProductOnSale] = useState(product[0].onSale);
  const [productDiscount, setProductDiscount] = useState(product[0].discount);
  const [productImage, setProductImage] = useState("");

  const [productImagePath, setProductImagePath] = useState(product[0].imgPath);

  const [showDiscountInput, setShowDiscountInput] = useState(true);
  const [productData, setProductData] = useState({});

  const [validProductName, setValidProductName] = useState(false);
  const [validProductCategory, setValidProductCategory] = useState(false);
  const [validProductDescription, setValidProductDescription] = useState(false);
  const [validProductPrice, setValidProductPrice] = useState(false);
  const [validProductOnSale, setValidProductOnSale] = useState(false);
  const [validProductDiscount, setValidProductDiscount] = useState(false);
  const [validFileInput, setValidFileInput] = useState(true);

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

  const onEditProductFormSubmitHandler = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "imageFile"
    );

    if (fileInput.files.length === 1) {
      const formData = new FormData();

      for (const file of fileInput.files) {
        formData.append("file", file);
      }

      formData.append("upload_preset", "webshop-react-images");

      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dzdihp1nk/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((response) => response.json());

      console.log(data.secure_url);

      if (productData.discount === "") {
        productData.discount = 0;
      }
      const dataForFirebase = {
        ...productData,
        imgPath: data.secure_url,
      };
      console.log(dataForFirebase);

      const productDoc = doc(db, "products", id);

      await updateDoc(productDoc, dataForFirebase);
    } else {
      const dataForFirebase = {
        ...productData,
        imgPath: productImagePath,
      };

      console.log(dataForFirebase);

      const productDoc = doc(db, "products", id);

      await updateDoc(productDoc, dataForFirebase);
    }

    const updatedCollection = await getDocs(productCollection);

    const productsArray = updatedCollection.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setProducts(productsArray);

    navigate("/add-product-confirm");
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.h1}>Edit Product:</h1>
      <form className={styles.form} onSubmit={onEditProductFormSubmitHandler}>
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
            <option value="accessoires">Accessoires</option>
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
          <p>
            Select new image to upload or leave empty to keep the current image
          </p>
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

export default EditProductPage;
