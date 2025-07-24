import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const { amount, currency, receipt } = await request.json();

    const options = {
      amount: amount,
      currency: currency,
      receipt: receipt,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    return Response.json(order);
  } catch (error) {
    console.error('Razorpay order error:', error);
    return Response.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}