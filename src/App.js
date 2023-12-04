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
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showShippingAddress, setShowShippingAddress] = useState(true); // Toggle state
  const [bankName, setBankName] = useState('');
  const [branch, setBranch] = useState('');

  /**
   * Handles the change event for the card number input field.
   * Removes existing spaces and adds a space every 4 digits.
   * Limits the input to 16 digits (excluding spaces).
   * @param {Object} e - The event object.
   */
  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\s/g, ''); // Remove existing spaces
    const formattedInput = input.replace(/(\d{4})/g, '$1 ').trim(); // Add space every 4 digits
    const cardNumber = formattedInput.substring(0, 19); // Limit to 16 digits (excluding spaces)
    setCardNumber(cardNumber);
  };

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
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
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
   * Returns the text for the proceed button based on the selected payment method.
   * @returns {string|null} The text for the proceed button.
   */
  const getProceedButtonText = () => {
    if (paymentMethod === 'card') {
      return 'Proceed';
    } else if (paymentMethod === 'bank') {
      return 'Submit';
    } else {
      return null;
    }
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

      {/* Card Details */}
      {paymentMethod === 'card' && (
        <div className="section">
          <h2 className="section-title">Card Details</h2>
          <form>
            <label htmlFor="cardHolderName">Card Holder's Name:</label>
            <input type="text" id="cardHolderName" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="cardNumber">Card Number:</label>
            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={handleCardNumberChange} />

            <label htmlFor="expiryDate">Expiry Date:</label>
            <input
              type="text"
              id="expiryDate"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                const formattedInput = input.replace(/(\d{2})(\d{0,2})/, '$1/$2'); // Add forward slash after 2 digits
                const expiryMonth = formattedInput.substring(0, 2); // Extract the month part
                const expiryDate = expiryMonth > 12 ? '12' : formattedInput.substring(0, 5); // Limit to 5 characters (MM/YY) and set to 12 if month is greater than 12
                setExpiryDate(expiryDate);
              }}
            />

            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              placeholder="123"
              maxLength="3"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              onKeyPress={(e) => {
                const keyCode = e.keyCode || e.which;
                const keyValue = String.fromCharCode(keyCode);
                const regex = /^[0-9]*$/; // Only allow numbers
                if (!regex.test(keyValue)) {
                  e.preventDefault();
                }
              }}
            />
          </form>
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
        </div>
      )}

      {/* PayPal */}
      {paymentMethod === 'paypal' && (
        <div className="section">
          <h2 className="section-title">PayPal</h2>
          <button className="button">Pay with PayPal</button>
        </div>
      )}

      {/* Proceed Button */}
      {getProceedButtonText() && <button type="submit" className="button" onClick={handleProceed}>{getProceedButtonText()}</button>}

      {/* Clear Fields Button */}
      <button onClick={handleClearFields} className="button">Clear Fields</button>
    </div>
  );
}

export default App;
