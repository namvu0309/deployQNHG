"use client"

export default function Forbidden403() {
    const styles = {
        container: {
            minHeight: "100vh",
            background: "linear-gradient(135deg, #fef2f2 0%, #fef3f2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
        },
        card: {
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "40px 30px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            border: "1px solid #fee2e2",
        },
        iconContainer: {
            width: "80px",
            height: "80px",
            backgroundColor: "#fecaca",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: "40px",
        },
        errorCode: {
            fontSize: "72px",
            fontWeight: "bold",
            color: "#ef4444",
            margin: "20px 0 10px",
            lineHeight: "1",
        },
        divider: {
            width: "60px",
            height: "4px",
            backgroundColor: "#ef4444",
            margin: "0 auto 30px",
            borderRadius: "2px",
        },
        title: {
            fontSize: "24px",
            fontWeight: "600",
            color: "#1f2937",
            margin: "0 0 15px",
        },
        description: {
            color: "#6b7280",
            lineHeight: "1.6",
            margin: "0 0 30px",
            fontSize: "16px",
        },
        buttonContainer: {
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "30px",
        },
        primaryButton: {
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.2s",
            width: "100%",
        },
        secondaryButton: {
            backgroundColor: "transparent",
            color: "#ef4444",
            border: "2px solid #fecaca",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s",
            width: "100%",
        },
        infoBox: {
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            padding: "15px",
            fontSize: "14px",
            color: "#6b7280",
        },
    }

    const handlePrimaryButtonHover = (e) => {
        e.target.style.backgroundColor = "#dc2626"
    }

    const handlePrimaryButtonLeave = (e) => {
        e.target.style.backgroundColor = "#ef4444"
    }

    const handleSecondaryButtonHover = (e) => {
        e.target.style.backgroundColor = "#fef2f2"
    }

    const handleSecondaryButtonLeave = (e) => {
        e.target.style.backgroundColor = "transparent"
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Icon */}
                <div style={styles.iconContainer}>🛡️</div>

                {/* Error Code */}
                <h1 style={styles.errorCode}>403</h1>
                <div style={styles.divider}></div>

                {/* Title & Description */}
                <h2 style={styles.title}>Không có quyền truy cập</h2>
                <p style={styles.description}>
                    Xin lỗi, bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là
                    lỗi.
                </p>

                {/* Buttons */}
                <div style={styles.buttonContainer}>
                    <button
                        style={styles.primaryButton}
                        onMouseEnter={handlePrimaryButtonHover}
                        onMouseLeave={handlePrimaryButtonLeave}
                        onClick={() => window.history.back()}
                    >
                        ← Quay lại trang trước
                    </button>

                    <button
                        style={styles.secondaryButton}
                        onMouseEnter={handleSecondaryButtonHover}
                        onMouseLeave={handleSecondaryButtonLeave}
                        onClick={() => (window.location.href = "/")}
                    >
                        🏠 Về trang chủ
                    </button>
                </div>

                {/* Info */}
                <div style={styles.infoBox}>
                    <p style={{ margin: "0 0 5px" }}>
                        Mã lỗi: <strong>403_FORBIDDEN</strong>
                    </p>
                    <p style={{ margin: "0" }}>Thời gian: {new Date().toLocaleString("vi-VN")}</p>
                </div>
            </div>
        </div>
    )
}
