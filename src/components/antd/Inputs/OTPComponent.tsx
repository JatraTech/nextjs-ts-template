// @ts-nocheck
"use client";

import { Input } from "antd";
import { useState } from "react";

const OTPComponent = ({ otpLength = 6, otpContainer = "", setOtpValue = () => { } }) => {
    const [otp, setOtp] = useState(new Array(otpLength).fill(""));

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return; // Only allow numbers

        const otpArray = [...otp];
        otpArray[index] = value; // Update the specific index in OTP array

        setOtp(otpArray);

        // If value is entered, move to the next input field
        if (value.length === 1 && index < otpLength - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }

        // If value is removed, move to the previous input field
        if (value.length === 0 && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }

        if (setOtpValue) {
            setOtpValue(otpArray.join(""));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }

        // Allow Ctrl+A or Cmd+A to select all text
        if ((e.ctrlKey || e.metaKey) && e.key === "a") {
            e.target.select();
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("text");
        if (isNaN(pasteData)) return; // Only allow numbers

        const otpArray = pasteData.split("").slice(0, otpLength);
        setOtp(otpArray);

        if (setOtpValue) {
            setOtpValue(otpArray.join(""));
        }
    };

    const sharedProps = {
        maxLength: 1,
        style: { width: "40px", margin: "0 5px", textAlign: "center" },
    };

    return (
        <div className={`${otpContainer} custom-otp-input`}>
            {otp.map((value, index) => (
                <Input
                    key={index}
                    id={`otp-input-${index}`}
                    value={value}
                    className={value ? "filled" : "unfilled"}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    {...sharedProps}
                />
            ))}
        </div>
    );
};

export default OTPComponent;