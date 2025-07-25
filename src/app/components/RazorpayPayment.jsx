import React from 'react';

const RazorpayPayment = ({ amount, currency = 'INR', receipt = 'receipt#1', name = 'Elite Finance', description = 'Payment', image = '', onSuccess, onFailure }) => {
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
      Pay with Razorpay
    </button>
  </div>
  
  );
};

export default RazorpayPayment; 