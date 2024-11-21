import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { userContext } from "../Usercontext";
import Modal from "react-modal";
import { loadStripe } from "@stripe/stripe-js"; 

Modal.setAppElement("#root"); 



export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { user } = useContext(userContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  const totalPrice = numberOfNights * place.price;

  async function bookThisPlace() {
    setShowPaymentModal(true);
  }

  const handleStripeCheckout = async () => {
    const stripePromise = await  loadStripe("pk_test_51Q3NyPRxCpyy6uSDkof2PIue8iOr0u2eUnsRDyjHhvLCFyOB7zbGOnqlo39kMtL5a3SxHo0fwyNpAdojTmNMRWGq00hbRjRCwh");
    const stripe =  stripePromise;

    // Create a checkout session on your server
    const response = await axios.post("/create-stripe-checkout-session", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      placeId: place._id,
      price: totalPrice,
    });

    const  {url}  = response.data;
    stripe.redirectToCheckout({
      sessionId: url, 
    });
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Reserve
        {numberOfNights > 0 && <span> ${totalPrice}</span>}
      </button>

      {/* Modal for Stripe Payment */}
      <Modal
        isOpen={showPaymentModal}
        onRequestClose={() => setShowPaymentModal(false)}
        className="bg-white shadow-lg rounded-2xl p-6 w-1/3 mx-auto"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
      >
        <h2 className="text-2xl mb-4 text-center">Stripe Payment</h2>
        <div className="flex flex-col items-center space-y-4">
          <button
            className="btn-secondary px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleStripeCheckout}
          >
            Proceed to Stripe Checkout
          </button>
        </div>
      </Modal>
    </div>
  );
}

