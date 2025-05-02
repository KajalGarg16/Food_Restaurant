import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import '../cart/cart.css'; // Reusing cart styling

function Order() {
    const cart = useSelector((state) => state.cart);
    const history = useHistory();

    const goToHome = () => {
        history.push("/");
    };

    return (
        <div className="cart-bg">
            <Header />
            <div className="cart">
                <h1 style={{ padding: '10px' }}>Order Confirmation</h1>
                <div style={{ marginBottom: '100px', padding: '20px' }}>
                    <p style={{ fontSize: '18px', color: 'green' }}>🎉 Your order has been placed successfully!</p>
                    <p style={{ fontSize: '16px' }}>Thank you for shopping with us.</p>

                    <div style={{ marginTop: '30px' }}>
                        <h3>Order Summary:</h3>
                        <ul>
                            {cart.cartItems.length > 0 ? (
                                cart.cartItems.map((item) => (
                                    <li key={item.id}>
                                        {item.title} - Qty: {item.cartQuantity} - ₹{item.cartQuantity * item.rate}
                                    </li>
                                ))
                            ) : (
                                <li>No items (cart has been cleared after order)</li>
                            )}
                        </ul>
                        <h4>Total Paid: ₹{cart.totalAmount}/-</h4>
                    </div>

                    <button
                        onClick={goToHome}
                        className="Order-button"
                        style={{ marginTop: '20px' }}
                    >
                        Continue
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Order;
