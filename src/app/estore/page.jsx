"use client";

import { useEffect, useContext, useState } from "react";
import { FaCarAlt, FaCartArrowDown, FaHeart, FaStar } from "react-icons/fa";

import Image from "next/image";
import "../estore/page.css";
import Link from "next/link";
import { GlobalContext } from "@/providers/page";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

// export const metadata = {
//   title: {
//     default: "E-Store",
//   },
// };

const EStorePage = () => {
  //get data from context
  const { getProductdata, Token } = useContext(GlobalContext);
  const router = useRouter();

  //for tab and sidenav
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [selectedProductType, setSelectedProductType] = useState("All");

  // For modals
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // For post data
  const [savelist, setSavelist] = useState([]);
  const [userid, setUserId] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Load all product data here
  useEffect(() => {
    if (getProductdata) {
      const uniqueCategories = [
        ...new Set(getProductdata.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
      setIsLoading(false);
    }
  }, [getProductdata]);

  // Select categories
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory("All");
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const getSubcategoriesForCategory = (category) => {
    if (category === "All") {
      return [];
    }

    const subcategories = [
      ...new Set(
        getProductdata
          .filter((item) => item.category === category)
          .map((item) => item.subcategory)
      ),
    ];

    return subcategories;
  };

  // After selecting categories and subcategories, show products

  const filteredProducts = getProductdata.filter((product) => {
    if (selectedCategory === "All" && selectedSubcategory === "All") {
      return true;
    }

    if (selectedCategory !== "All" && selectedSubcategory === "All") {
      return product.category === selectedCategory;
    }

    return (
      product.category === selectedCategory &&
      product.subcategory === selectedSubcategory
    );
  });

  // For modals
  const handleProductClick = (product, e) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  //for close the modal
  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // For quantity and price for products
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  //for modal calculation

  const mrp = selectedProduct ? selectedProduct?.mrp : "";
  const totalprice = (mrp * quantity).toFixed(2);

  const discountPercentage = 5 / 100;
  const discount = mrp - (mrp * discountPercentage).toFixed(2);
  const discountPrice = (totalprice - totalprice * discountPercentage).toFixed(
    2
  );

  // Get user from server and localstorage

  useEffect(() => {
    const userid = localStorage.getItem("userid");
    if (userid) {
      setUserId(userid);

      fetch("https://qwikmedic.pythonanywhere.com/userProfile/" + userid, {
        headers: {
          Authorization: `Token ${Token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setSavelist(json.savelist || []);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, []);

  // Add to cart & favorite
  const productid = selectedProduct?.id;

  //for favorite svg change

  const isInFavorites = savelist.some((item) => item?.productid === productid);
  const addToFavorites = () => {
    const user = localStorage.getItem("userid");
    if (user) {
      const newItem = {
        productid,
        image: selectedProduct?.imagelink,
        title: selectedProduct?.productname,
        productbrand: selectedProduct?.productbrand,
        avgrating: selectedProduct?.avgrating,
        mrp: parseFloat(selectedProduct?.mrp),
        totalprice: parseFloat(totalprice),
        discountPrice: parseFloat(discountPrice),
        type: "healthmart",
        quantity,
        minqnt: 1,
        otc: true,
        discount: parseFloat(discount.toFixed(2)),
      };

      if (!savelist.find((healthmart) => healthmart?.productid === productid)) {
        const updatedSavelist = [...savelist, newItem];
        setSavelist(updatedSavelist);

        console.log("Product added to favorites:", isInFavorites);

        if (userid) {
          const requestOptions = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Token ${Token}`,
            },
            body: JSON.stringify({
              savelist: updatedSavelist,
            }),
          };

          fetch(
            "https://qwikmedic.pythonanywhere.com/userProfile/" + userid,
            requestOptions
          )
            .then((response) => response.json())
            .then((json) => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Added to Favorites Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.error("User ID not found in local storage.");
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Already Added",
          text: "The Product is already in your Favorites list.",
          confirmButtonText: "OK",
        });
      }
    } else {
      router.push("/login");
    }
  };

  //add to cart

  const addToCart = () => {
    const user = localStorage.getItem("userid");
    if (user) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      if (
        !cartItems.find((healthmart) => healthmart?.productid === productid)
      ) {
        cartItems.push({
          productid: selectedProduct?.id,
          image: selectedProduct?.imagelink,
          tytle: selectedProduct?.productname,
          productbrand: selectedProduct?.productbrand,
          avgrating: selectedProduct?.avgrating,
          mrp: parseFloat(selectedProduct?.mrp),
          totalprice: parseFloat(totalprice),
          discountPrice: parseFloat(discountPrice),
          type: "healthmart",
          quantity,
          minqnt: 1,
          otc: true,
          discount: parseFloat(discount.toFixed(2)),
        });

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added to Cart Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Already Added",
          text: "The Product is already in your Cart.",
          confirmButtonText: "OK",
        });
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <div className=" max-w-[1500px] mb-10 mx-auto">
      <div className="">
        <div className="grid grid-cols-4  ">
          {/* side nav is here */}
          <div className="col-span-1  ">
            <ul className="menu  p-5 w-80  sticky top-0 ">
              <li>
                <ul>
                  {categories.map((category) => (
                    <li key={category} className="category-header">
                      {category !== "All" && ( // Conditionally render category
                        <span
                          className="cursor-pointer flex justify-between"
                          onClick={() => handleCategoryChange(category)}
                        >
                          {category}
                          <span className="dropdown-symbol ms-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M6.875 3.75L13.125 10L6.875 16.25"
                                stroke="#949494"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </span>
                        </span>
                      )}
                      {selectedCategory === category && (
                        <ul>
                          {getSubcategoriesForCategory(category).map(
                            (subcategory) => (
                              <li key={subcategory}>
                                {subcategory !== "All" && ( // Conditionally render subcategory
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleSubcategoryChange(subcategory)
                                    }
                                  >
                                    {subcategory}
                                  </span>
                                )}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
          {/* main content is here */}
          <div className="col-span-3  mt-4 ">
            {/* top content for breadcum and filter and sorting */}
            <div className="flex justify-between items-center">
              <div className="text-sm  mt-3 breadcrumbs">
                <ul>
                  <li>
                    <Link href="/">Home </Link>{" "}
                  </li>
                  <li className="blue-color">
                    <p>E-store</p>
                  </li>
                </ul>
              </div>
              <div className="flex justify-start gap-4 items-center">
                <button className="border flex justify-center px-3 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    className="me-2"
                  >
                    <path
                      d="M5 11.75V3.625V11.75ZM5 11.75C5.33152 11.75 5.64946 11.8817 5.88388 12.1161C6.1183 12.3505 6.25 12.6685 6.25 13C6.25 13.3315 6.1183 13.6495 5.88388 13.8839C5.64946 14.1183 5.33152 14.25 5 14.25M5 11.75C4.66848 11.75 4.35054 11.8817 4.11612 12.1161C3.8817 12.3505 3.75 12.6685 3.75 13C3.75 13.3315 3.8817 13.6495 4.11612 13.8839C4.35054 14.1183 4.66848 14.25 5 14.25M5 17.375V14.25V17.375ZM15 11.75V3.625V11.75ZM15 11.75C15.3315 11.75 15.6495 11.8817 15.8839 12.1161C16.1183 12.3505 16.25 12.6685 16.25 13C16.25 13.3315 16.1183 13.6495 15.8839 13.8839C15.6495 14.1183 15.3315 14.25 15 14.25M15 11.75C14.6685 11.75 14.3505 11.8817 14.1161 12.1161C13.8817 12.3505 13.75 12.6685 13.75 13C13.75 13.3315 13.8817 13.6495 14.1161 13.8839C14.3505 14.1183 14.6685 14.25 15 14.25M15 17.375V14.25V17.375ZM10 6.75V3.625V6.75ZM10 6.75C10.3315 6.75 10.6495 6.8817 10.8839 7.11612C11.1183 7.35054 11.25 7.66848 11.25 8C11.25 8.33152 11.1183 8.64946 10.8839 8.88388C10.6495 9.1183 10.3315 9.25 10 9.25M10 6.75C9.66848 6.75 9.35054 6.8817 9.11612 7.11612C8.8817 7.35054 8.75 7.66848 8.75 8C8.75 8.33152 8.8817 8.64946 9.11612 8.88388C9.35054 9.1183 9.66848 9.25 10 9.25M10 17.375V9.25V17.375Z"
                      fill="#38A04F"
                    />
                    <path
                      d="M5 11.75V3.625M5 11.75C5.33152 11.75 5.64946 11.8817 5.88388 12.1161C6.1183 12.3505 6.25 12.6685 6.25 13C6.25 13.3315 6.1183 13.6495 5.88388 13.8839C5.64946 14.1183 5.33152 14.25 5 14.25M5 11.75C4.66848 11.75 4.35054 11.8817 4.11612 12.1161C3.8817 12.3505 3.75 12.6685 3.75 13C3.75 13.3315 3.8817 13.6495 4.11612 13.8839C4.35054 14.1183 4.66848 14.25 5 14.25M5 14.25V17.375M15 11.75V3.625M15 11.75C15.3315 11.75 15.6495 11.8817 15.8839 12.1161C16.1183 12.3505 16.25 12.6685 16.25 13C16.25 13.3315 16.1183 13.6495 15.8839 13.8839C15.6495 14.1183 15.3315 14.25 15 14.25M15 11.75C14.6685 11.75 14.3505 11.8817 14.1161 12.1161C13.8817 12.3505 13.75 12.6685 13.75 13C13.75 13.3315 13.8817 13.6495 14.1161 13.8839C14.3505 14.1183 14.6685 14.25 15 14.25M15 14.25V17.375M10 6.75V3.625M10 6.75C10.3315 6.75 10.6495 6.8817 10.8839 7.11612C11.1183 7.35054 11.25 7.66848 11.25 8C11.25 8.33152 11.1183 8.64946 10.8839 8.88388C10.6495 9.1183 10.3315 9.25 10 9.25M10 6.75C9.66848 6.75 9.35054 6.8817 9.11612 7.11612C8.8817 7.35054 8.75 7.66848 8.75 8C8.75 8.33152 8.8817 8.64946 9.11612 8.88388C9.35054 9.1183 9.66848 9.25 10 9.25M10 9.25V17.375"
                      stroke="#121212"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>{" "}
                  Filter
                </button>
                <div className="flex  items-center">
                  <p className="me-2">Sort By :</p>
                  <button className="border flex justify-center px-3 py-2">
                    Default
                    <svg
                      className="ms-3 "
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <path
                        d="M16.25 7.375L10 13.625L3.75 7.375"
                        stroke="#121212"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* display e-store card */}
            <div className="grid grid-cols-3   ">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className=" common-card cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <figure>
                    <img
                      src={product.imagelink}
                      alt={product.name}
                      className="h-[180px] w-[full]"
                    />
                  </figure>
                  <div className="mt-3">
                    <p className="text-gray-500">{product.productbrand}</p>
                    <h2 className="secondary-header text-black mt-2">
                      {product.productname}
                    </h2>

                    <div className="flex justify-between  mt-3  items-center">
                      <div>
                        <p className="blue-color secondary-header">
                          BDT : {product.mrp}{" "}
                        </p>
                      </div>
                      <div className="flex justify-center items-center gap-2">
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M21 8.25C21 5.765 18.901 3.75 16.312 3.75C14.377 3.75 12.715 4.876 12 6.483C11.285 4.876 9.623 3.75 7.687 3.75C5.1 3.75 3 5.765 3 8.25C3 15.47 12 20.25 12 20.25C12 20.25 21 15.47 21 8.25Z"
                              stroke="#252525"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                        <button className="cart-btn2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M1.5 2H2.424C2.764 2 3.06067 2.22867 3.14867 2.55667L3.404 3.51467M3.404 3.51467C7.11776 3.41059 10.828 3.82343 14.428 4.74133C13.8787 6.37733 13.226 7.96667 12.4787 9.5H5M3.404 3.51467L5 9.5M5 9.5C4.46957 9.5 3.96086 9.71071 3.58579 10.0858C3.21071 10.4609 3 10.9696 3 11.5H13.5M4 13.5C4 13.6326 3.94732 13.7598 3.85355 13.8536C3.75979 13.9473 3.63261 14 3.5 14C3.36739 14 3.24021 13.9473 3.14645 13.8536C3.05268 13.7598 3 13.6326 3 13.5C3 13.3674 3.05268 13.2402 3.14645 13.1464C3.24021 13.0527 3.36739 13 3.5 13C3.63261 13 3.75979 13.0527 3.85355 13.1464C3.94732 13.2402 4 13.3674 4 13.5ZM12.5 13.5C12.5 13.6326 12.4473 13.7598 12.3536 13.8536C12.2598 13.9473 12.1326 14 12 14C11.8674 14 11.7402 13.9473 11.6464 13.8536C11.5527 13.7598 11.5 13.6326 11.5 13.5C11.5 13.3674 11.5527 13.2402 11.6464 13.1464C11.7402 13.0527 11.8674 13 12 13C12.1326 13 12.2598 13.0527 12.3536 13.1464C12.4473 13.2402 12.5 13.3674 12.5 13.5Z"
                              stroke="white"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal  Part*/}
      {selectedProduct && (
        <div>
          <dialog
            id="my_modal_3"
            className={`modal modal-background-blur overflow-scroll fixed inset-0 flex items-center justify-center ${
              isModalOpen ? "block" : "hidden"
            }`}
            open={isModalOpen}
            onClose={closeModal}
          >
            {/* modal body */}
            <form
              method="dialog"
              className="modal-size  overflow-scroll bg-white "
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="">
                {/* close button part */}
                <div className="flex justify-end items-center">
                  <button
                    className="btn btn-sm btn-circle t bg-red-500 text-white "
                    onClick={(e) => {
                      closeModal();
                      e.stopPropagation();
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div className=" grid grid-cols-2 gap-1 ">
                  <div>
                    <Image
                      src={selectedProduct?.imagelink}
                      alt={selectedProduct.name}
                      width={400}
                      height={300}
                    />
                  </div>
                  <div>
                    <p className="font-semibold  text-red-500">
                      Review {selectedProduct?.review} <FaStar />
                    </p>
                    <h3 className="modal-header mt-1">
                      {selectedProduct.productname}
                    </h3>
                    <p className="modal-secondary-header mt-4">Description:</p>
                    <p className="modal-text mt-2 mb-2">
                      {selectedProduct.details}
                    </p>
                  </div>
                </div>
                <div className="flex mt-2  justify-between items-center">
                  <div className="flex justify-start">
                    {" "}
                    <p className="mt-2 modal-header dark-blue-color ">
                      {" "}
                      TK.{" "}
                      <span className="line-through text-xl px-2 blue-color-price">
                        {selectedProduct.mrp}
                      </span>
                      {discount}{" "}
                    </p>{" "}
                  </div>
                  <div className="flex justify-start items-center">
                    <div className="quantity-buttons border me-3 px-3 py-2 flex justify-center items-center">
                      <button className=" me-2" onClick={decreaseQuantity}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M15 10H5"
                            stroke="#363636"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                      <span className=" q-text text-black  mx-3">
                        {quantity}
                      </span>

                      {/* add to cart and add to favourite part */}
                      <button
                        className=" flex ms-2 items-center"
                        onClick={increaseQuantity}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M10 3.75V16.25M16.25 10H3.75"
                            stroke="#363636"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex mx-5 justify-between item-center">
                      <button className="me-6" onClick={addToFavorites}>
                        {isInFavorites ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="#EF4523"
                          >
                            <path d="M21 8.25C21 5.765 18.901 3.75 16.312 3.75C14.377 3.75 12.715 4.876 12 6.483C11.285 4.876 9.623 3.75 7.687 3.75C5.1 3.75 3 5.765 3 8.25C3 15.47 12 20.25 12 20.25C12 20.25 21 15.47 21 8.25Z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#252525"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 8.25C21 5.765 18.901 3.75 16.312 3.75C14.377 3.75 12.715 4.876 12 6.483C11.285 4.876 9.623 3.75 7.687 3.75C5.1 3.75 3 5.765 3 8.25C3 15.47 12 20.25 12 20.25C12 20.25 21 15.47 21 8.25Z" />
                          </svg>
                        )}
                      </button>
                      <div className="cart-btn ms-4 text-white">
                        <button
                          className=" flex items-center"
                          onClick={addToCart}
                        >
                          <p className="q-text px-7 ">Add to cart</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M2.25 3H3.636C4.146 3 4.591 3.343 4.723 3.835L5.106 5.272M5.106 5.272C10.6766 5.11589 16.2419 5.73515 21.642 7.112C20.818 9.566 19.839 11.95 18.718 14.25H7.5M5.106 5.272L7.5 14.25M7.5 14.25C6.70435 14.25 5.94129 14.5661 5.37868 15.1287C4.81607 15.6913 4.5 16.4544 4.5 17.25H20.25M6 20.25C6 20.4489 5.92098 20.6397 5.78033 20.7803C5.63968 20.921 5.44891 21 5.25 21C5.05109 21 4.86032 20.921 4.71967 20.7803C4.57902 20.6397 4.5 20.4489 4.5 20.25C4.5 20.0511 4.57902 19.8603 4.71967 19.7197C4.86032 19.579 5.05109 19.5 5.25 19.5C5.44891 19.5 5.63968 19.579 5.78033 19.7197C5.92098 19.8603 6 20.0511 6 20.25ZM18.75 20.25C18.75 20.4489 18.671 20.6397 18.5303 20.7803C18.3897 20.921 18.1989 21 18 21C17.8011 21 17.6103 20.921 17.4697 20.7803C17.329 20.6397 17.25 20.4489 17.25 20.25C17.25 20.0511 17.329 19.8603 17.4697 19.7197C17.6103 19.579 17.8011 19.5 18 19.5C18.1989 19.5 18.3897 19.579 18.5303 19.7197C18.671 19.8603 18.75 20.0511 18.75 20.25Z"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default EStorePage;
