import React from "react";
import { Link } from "react-router-dom";

export default function ThankYouPage() {
  return (
    <div className="thank-you-container">
      <div className="thank-you-message">
        <h1>Thank You!</h1>
        <p>Your payment was successful. We appreciate your business!</p>
        <p>
          You can view your bookings in the <Link to="/account/bookings">Bookings</Link> section.
        </p>
      </div>
    </div>
  );
}
