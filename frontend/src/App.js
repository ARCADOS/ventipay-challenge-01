/**
 * Instructions
 *
 * 1. Show a list of payment methods filtered by type "credit_card".
 * 2. Get the list data from the API when the component is rendered and refresh it automatically every 30 seconds.
 * 3. Show a loading component while getting the list data but only on the first pull.
 * 4. Show the total number of credit cards
 * 5. Show the total number of credit cards ending in an even number (check the "last4" attribute).
 * 6. Implement a button to delete a credit card
 */

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PaymentMethods from './pages/payment-methods'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentMethods/>} />
      </Routes>
    </Router>
  );
}

export default App;
