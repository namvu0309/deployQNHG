import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Confetti from "react-confetti";
import "./PaymentResult.scss"; // Import the SCSS file

export default function PaymentResult() {
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");
    const message = searchParams.get("message");

    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (status === "success") {
            setShowConfetti(true);
        }
    }, [status]);

    return (
        <div className="payment-result-container">
            {showConfetti && <Confetti />}
            <div className="payment-result-card">
                <h1 className={`payment-result-title ${status === "success" ? "success" : "failure"}`}>
                    {status === "success" ? "🎉 Thanh toán thành công!" : "❌ Thanh toán thất bại"}
                </h1>
                <p className="payment-result-message">
                    {decodeURIComponent(message || "")}
                </p>
                <a href="/orders/list" className="payment-result-button">Quay lại danh sách đơn hàng</a>
            </div>
        </div>
    );
} 