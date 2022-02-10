import { db } from "../firebase_config";
import { collection, addDoc } from "firebase/firestore";

import ProductForm from "../components/Products/ProductForm";

const AddProduct = () => {
  const productsCollection = collection(db, "products");

  const onSubmitDataHandler = async (productData, fileInput) => {
    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "my-uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dzdihp1nk/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((response) => response.json());

    const dataForFirebase = {
      name: productData.name,
      category: productData.category,
      description: productData.description,
      price: productData.price,
      imgPath: data.secure_url,
    };

    await addDoc(productsCollection, dataForFirebase);
  };

  return <ProductForm onSubmitHandler={onSubmitDataHandler} />;
};

export default AddProduct;
