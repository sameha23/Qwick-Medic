"use client";

import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  //main token

  const Token = "d0ce846f0cc0c34a14348caded1f3acfbb62cb76";

  //state for all api

  const [medicines, setMedicines] = useState("");
  const [getProductdata, setGetProductdata] = useState([]);
  const [getProduct1, setGetProduct1] = useState(true);
  const [doctors, setDoctors] = useState("");
  const [data, setData] = useState([]);

  //medicine api

  async function MedicineData() {
    try {
      const response = await fetch(
        "https://qwikmedic.pythonanywhere.com/medicineInfo",
        {
          headers: {
            Authorization: `Token ${Token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMedicines(data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  //e-store api

  async function ProductInfo1() {
    try {
      if (getProduct1) {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${Token}`,
          },
        };

        const response = await fetch(
          "https://qwikmedic.pythonanywhere.com/product",
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const json = await response.json();
        setGetProductdata(json);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setGetProduct1(false);
    }
  }

  //doctor api

  async function fetchData() {
    try {
      const response = await fetch(
        "https://qwikmedic.pythonanywhere.com/doctorProfile",
        {
          headers: {
            Authorization: `Token ${Token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  //user-profile

  async function UserData() {
    const apiUrl = "https://qwikmedic.pythonanywhere.com/userProfile";

    await fetch(apiUrl, {
      headers: {
        Authorization: `Token ${Token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  //call all functions here

  useEffect(() => {
    MedicineData();
    ProductInfo1();
    fetchData();
    UserData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        Token,
        medicines,
        setMedicines,
        getProductdata,
        setGetProductdata,
        doctors,
        setDoctors,
        data,
        setData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
