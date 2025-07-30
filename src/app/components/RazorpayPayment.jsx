import React, { useState } from 'react';

const RazorpayPayment = ({ amount, currency = 'INR', receipt = 'receipt#1', name = 'Elite Finance', description = 'Payment', image = '', onSuccess, onFailure }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+91 86690 12275');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // Create order on backend
    const orderRes = await fetch('/api/create-razorpay-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency, receipt }),
    });
    const orderData = await orderRes.json();
    if (!orderData.id) {
      alert('Failed to create order');
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name,
      description,
      image,
      order_id: orderData.id,
      handler: function (response) {
        setPaymentSuccess(true);
        if (onSuccess) {
          onSuccess(response);
        } else {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        }
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      notes: {},
      theme: {
        color: '#3399cc',
      },
      modal: {
        ondismiss: function () {
          if (onFailure) {
            onFailure();
          } else {
            alert('Payment popup closed');
          }
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (paymentSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <div className="flex items-center justify-center mb-2">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="font-semibold">Payment Successful!</span>
          </div>
          <p className="text-sm">Your enquiry has been submitted successfully.</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Contact Us Now</h4>
          <a 
            href={`tel:${phoneNumber.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            {phoneNumber}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '45px' }}>
      <button
        onClick={handlePayment}
        style={{
          padding: '10px 20px',
          background: '#3399cc',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        For Fast Enquiry
      </button>
    </div>
  );
};

export default RazorpayPayment; 