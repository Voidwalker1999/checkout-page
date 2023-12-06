import React, { useState } from 'react';
import './App.css';

/**
 * The main component for the payment gateway checkout information.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  // State variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showShippingAddress, setShowShippingAddress] = useState(true); // Toggle state
  const [bankName, setBankName] = useState('');
  const [branch, setBranch] = useState('');

  /**
   * Clears all the input fields.
   */
  const handleClearFields = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setStreet('');
    setCity('');
    setPostalCode('');
    setCountry('');
    setBankName('');
    setBranch('');
  };

  /**
   * Handles the change event for the payment method radio buttons.
   * @param {Object} e - The event object.
   */
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  /**
   * Toggles the state of the showShippingAddress variable.
   */
  const handleToggleShippingAddress = () => {
    setShowShippingAddress(!showShippingAddress);
  };

  /**
   * Handles the click event for the proceed button.
   * Redirects to the Stripe payment gateway.
   */
  const handleProceed = () => {
    if (paymentMethod === 'card') {
      // Redirect to Stripe payment gateway
      window.location.href = 'https://stripe.com';
    }
  };

  /**
   * Handles the click event for the submit button for direct bank transaction.
   * Performs the bank transaction.
   */
  const handleBankTransaction = () => {
    // Perform bank transaction logic here
    console.log('Performing bank transaction...');
  };

  return (
    <div className="App">
      <h1 className="title">Checkout Information</h1>

      {/* Contact Information */}
      <div className="section">
        <h2 className="section-title">Contact Information</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="johndoe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            placeholder="123-456-7890"
            maxLength="12"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyPress={(e) => {
              const keyCode = e.keyCode || e.which;
              const keyValue = String.fromCharCode(keyCode);
              const regex = /^[0-9+]*$/; // Only allow numbers and "+"
              if (!regex.test(keyValue)) {
                e.preventDefault();
              }
            }}
          />
        </form>
      </div>

      {/* Shipping Address */}
      <div className="section">
        <h2 className="section-title">Shipping Address</h2>
        <div className="toggle-container">
          <label htmlFor="toggleShippingAddress">Use Shipping Address:</label>
          <input type="checkbox" id="toggleShippingAddress" checked={showShippingAddress} onChange={handleToggleShippingAddress} />
        </div>
        {showShippingAddress ? (
          <form>
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" placeholder="123 Main St" value={address} onChange={(e) => setAddress(e.target.value)} />

            <label htmlFor="street">Street Name:</label>
            <input type="text" id="street" placeholder="Main Street" value={street} onChange={(e) => setStreet(e.target.value)} />

            <label htmlFor="city">City Name:</label>
            <input type="text" id="city" placeholder="New York" value={city} onChange={(e) => setCity(e.target.value)} />

            <label htmlFor="postalCode">Postal Code:</label>
            <input type="text" id="postalCode" placeholder="12345" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />

            <label htmlFor="country">Country:</label>
            <input type="text" id="country" placeholder="United States" value={country} onChange={(e) => setCountry(e.target.value)} />
          </form>
        ) : (
          <p>Pickup Address: 123 Main St, New York, 12345, United States</p>
        )}
      </div>

      {/* Payment Details */}
      <div className="section">
        <h2 className="section-title">Payment Details</h2>
        <form>
          <div>
            <input type="radio" id="card" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={handlePaymentMethodChange} />
            <label htmlFor="card">Credit or Debit Card</label>
          </div>
          <div>
            <input type="radio" id="bank" name="paymentMethod" value="bank" checked={paymentMethod === 'bank'} onChange={handlePaymentMethodChange} />
            <label htmlFor="bank">Direct Bank Transaction</label>
          </div>
          <div>
            <input type="radio" id="paypal" name="paymentMethod" value="paypal" checked={paymentMethod === 'paypal'} onChange={handlePaymentMethodChange} />
            <label htmlFor="paypal">PayPal</label>
          </div>
        </form>
      </div>

      {/* Proceed Button */}
      {paymentMethod === 'card' && (
        <div className="section">
          <h2 className="section-title">Card Details</h2>
          <button
            className="button white-button"
            onClick={handleProceed}
            style={{ backgroundColor: 'white', border: '1px solid black' }} // Add border style
            // Add hover style
            onMouseEnter={(e) => (e.target.style.backgroundColor = 'lightblue')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'white')}
          >
            <img src="../images/stripe-logo.png" alt="Pay with Stripe" style={{ width: '100px', height: 'auto' }} />
          </button>
        </div>
      )}

      {/* Bank Details */}
      {paymentMethod === 'bank' && (
        <div className="section">
          <h2 className="section-title">Bank Details</h2>
          <form>
            <label htmlFor="bankName">Bank Name:</label>
            <input type="text" id="bankName" placeholder="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} />

            <label htmlFor="branch">Branch:</label>
            <input type="text" id="branch" placeholder="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} />

            <label htmlFor="bank-slip">Upload Bank Slip:</label>
            <input type="file" id="bank-slip" accept="image/*" />
          </form>
          <button onClick={handleBankTransaction} className="button">Submit</button>
        </div>
      )}

      {/* PayPal */}
      {paymentMethod === 'paypal' && (
        <div className="section">
          <h2 className="section-title">PayPal</h2>
          <button
            className="button white-button"
            onClick={handleProceed}
            style={{ backgroundColor: 'white', border: '1px solid black' }} // Add border style
            // Add hover style
            onMouseEnter={(e) => (e.target.style.backgroundColor = 'lightblue')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'white')}
          >
            <img src="../images/paypal-logo.png" alt="Pay with PayPal" style={{ width: '100px', height: 'auto' }} />
          </button>
        </div>
      )}

      {/* Clear Fields Button */}
      <button onClick={handleClearFields} className="button">Clear Fields</button>
    </div>
  );
}

export default App;
