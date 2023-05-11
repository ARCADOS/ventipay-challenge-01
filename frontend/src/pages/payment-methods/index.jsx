import React, { useState, useEffect } from 'react';

import SimpleAppBar from "../../components/simple-appbar"
import SimpleTable from "../../components/simple-table"
import SimpleCard from "../../components/simple-card"

import './payment-methods.css'

const PaymentMethods = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://127.0.0.1/v1/payment_methods?type=credit_card");
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
  
      // pull all data every 30 seconds
      const interval = setInterval(fetchData, 30000); 
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    // loading only in first render
    useEffect(() => {
      if (data.length > 0) {
        setLoading(false);
      }
    }, [data]);



    const handleDelete = async (id) => {
      try {
        // delete the payment by its id
        await fetch(`http://127.0.0.1/v1/payment_methods/${id}`, {
          method: "DELETE",
        });
  
        // Update the data
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      } catch (error) {
        console.error("Error trying to delete user:", error);
      }
    };
  
    const totalCreditCards = data.length;
    const evenLast4 = data.filter((payment_method) => payment_method.last4 % 2 !== 0 ).length;
  
    return (
      <div>
        <SimpleAppBar/>
        <div className='simple-cards'>
          <div className='card'>
            <SimpleCard text="Total Even Last4" total={evenLast4} />
          </div>
          <div className='card'>
            <SimpleCard text="Total Credit Cards" total={totalCreditCards} />
          </div>
        </div>

        <div className='table-container'>
          <SimpleTable data={data} handleDelete={handleDelete} loading={loading} />
        </div>

      </div>
    );
};

export default PaymentMethods;