import { useContext } from "react";
import { ProductsContext } from "../store/products-context.js";

import { db } from "../firebase_config";
import { collection, addDoc, getDocs } from "firebase/firestore";

import ProductForm from "../components/Products/ProductForm";

const productsCollection = collection(db, "products");
const AddProduct = () => {
  const [products, setProducts] = useContext(ProductsContext);

  const onSubmitDataHandler = async (productData, fileInput) => {
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

    if (productData.discount === "") {
      productData.discount = 0;
    }

    const dataForFirebase = {
      name: productData.name,
      category: productData.category,
      description: productData.description,
      price: productData.price,
      onSale: productData.onSale,
      discount: productData.discount,
      imgPath: data.secure_url,
    };

    await addDoc(productsCollection, dataForFirebase);

    const newStuff = await getDocs(productsCollection);

    const productsArray = newStuff.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setProducts(productsArray);
  };

  return <ProductForm onSubmitHandler={onSubmitDataHandler} />;
};

export default AddProduct;
