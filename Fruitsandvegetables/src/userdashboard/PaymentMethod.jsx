import React, { useState } from 'react';
import './PaymentMethod.css';
import visa from './images/visa.jpg';
import master from './images/master.jpg';
import rupay from './images/rupay.jpg';
import upi from './images/upi.jpg';
import cod from './images/cod.jpg';
import Sidebar from './ProfileSidebar';

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [savedCards, setSavedCards] = useState([]);
  const [upiId, setUpiId] = useState('');
  const [showCardForm, setShowCardForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMethod === 'card') {
      setSavedCards([...savedCards, newCard]);
      setNewCard({ cardNumber: '', name: '', expiry: '', cvv: '' });
      setShowCardForm(false);
    } else {
      alert('Payment method saved!');
    }
  };

  const renderCard = (card, i) => (
    <div key={i} className="card-preview saved">
      <div className="card-chip" />
      <div className="card-number">
        {card.cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()}
      </div>
      <div className="card-name-expiry">
        <span>{card.name}</span>
        <span>{card.expiry}</span>
      </div>
    </div>
  );

  return (
    <div className="payment-dashboard">
      <h2 className="title">Payment Dashboard</h2>
      
      <div className="payment-container">
        {/* Sidebar */}
        <Sidebar />

        {/* Right side content */}
        <div className="payment-content">
          
          {/* Icons */}
          <div className="payment-icons">
            <h4>Payment Options</h4>
            <div className="icon-list">
              <img src={visa} alt="Visa" />
              <img src={master} alt="Mastercard" />
              <img src={rupay} alt="RuPay" />
              <img src={upi} alt="UPI" />
              <img src={cod} alt="COD" />
            </div>
          </div>

          {/* Payment Form */}
          <div className="payment-form">
            <form onSubmit={handleSubmit}>
              <h3>Select Payment Method</h3>

              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="card"
                    checked={selectedMethod === 'card'}
                    onChange={() => {
                      setSelectedMethod('card');
                      setShowCardForm(true);
                    }}
                  />
                  Card Payment
                </label>
                <label>
                  <input
                    type="radio"
                    value="upi"
                    checked={selectedMethod === 'upi'}
                    onChange={() => {
                      setSelectedMethod('upi');
                      setShowCardForm(false);
                    }}
                  />
                  UPI
                </label>
                <label>
                  <input
                    type="radio"
                    value="cod"
                    checked={selectedMethod === 'cod'}
                    onChange={() => {
                      setSelectedMethod('cod');
                      setShowCardForm(false);
                    }}
                  />
                  Cash on Delivery
                </label>
              </div>

              {selectedMethod === 'card' && showCardForm && (
                <>
                  <div className="card-preview">
                    <div className="card-chip" />
                    <div className="card-number">
                      {newCard.cardNumber
                        ? newCard.cardNumber
                            .replace(/\s?/g, '')
                            .replace(/(\d{4})/g, '$1 ')
                            .trim()
                        : 'XXXX XXXX XXXX XXXX'}
                    </div>
                    <div className="card-name-expiry">
                      <span>{newCard.name || 'Cardholder Name'}</span>
                      <span>{newCard.expiry || 'MM/YY'}</span>
                    </div>
                  </div>

                  <div className="card-fields">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={newCard.cardNumber}
                      onChange={(e) =>
                        setNewCard({ ...newCard, cardNumber: e.target.value })
                      }
                      required
                    />
                    <input
                      type="text"
                      placeholder="Name on Card"
                      value={newCard.name}
                      onChange={(e) =>
                        setNewCard({ ...newCard, name: e.target.value })
                      }
                      required
                    />
                    <input
                      type="text"
                      placeholder="Expiry (MM/YY)"
                      value={newCard.expiry}
                      onChange={(e) =>
                        setNewCard({ ...newCard, expiry: e.target.value })
                      }
                      required
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      value={newCard.cvv}
                      onChange={(e) =>
                        setNewCard({ ...newCard, cvv: e.target.value })
                      }
                      required
                    />
                  </div>
                  <button type="submit" className="submit-btn">Save Card</button>
                </>
              )}

              {selectedMethod === 'upi' && (
                <>
                  <input
                    type="text"
                    placeholder="Enter your UPI ID"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="upi-field"
                    required
                  />
                  <button type="submit" className="submit-btn">Save UPI</button>
                </>
              )}

              {selectedMethod === 'cod' && (
                <button type="submit" className="submit-btn">Confirm COD</button>
              )}
            </form>

            {savedCards.length > 0 && (
              <div className="saved-details">
                <h3>Saved Cards</h3>
                {savedCards.map((card, i) => renderCard(card, i))}
                <button
                  className="submit-btn"
                  onClick={() => setShowCardForm(true)}
                >
                  + Add Another Card
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="summary-box">
            <h4>Billing Summary</h4>
            <p><strong>Total Amount:</strong> ₹1,299</p>
            <p><strong>Shipping:</strong> Free</p>
            <p><strong>Delivery:</strong> 3–5 working days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
