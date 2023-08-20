import { useState } from "react";
import { Input } from "../components/forms/input";
import { loginAdministrator } from "../api/api-calls";
import { BtnLoader } from "../components/btnLoader";

export const Login = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [data, updateData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const login = () => {
        setBtnLoading(true);
        loginAdministrator(data, setBtnLoading, setError);
    };

    let disabled = data.email === "" || data.password === "";

    return (
        <div className="flex items-center justify-center h-screen bg-teal-50">
            <div className="w-4/12 shadow-lg rounded-lg mx-auto p-5 bg-white">
                <img src="/logo.png" alt="CCAK Logo" className="w-28 mx-auto" />
                {error !== "" && (
                    <div
                        className="flex items-center p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        <svg
                            className="flex-shrink-0 inline w-4 h-4 mr-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>{error}</div>
                    </div>
                )}

                <Input
                    item="email"
                    label="Email"
                    type="text"
                    data={data}
                    updateData={updateData}
                />
                <Input
                    item="password"
                    label="Password"
                    type="password"
                    data={data}
                    updateData={updateData}
                />
                <button
                    type="button"
                    disabled={disabled}
                    className={` ${
                        disabled || btnLoading
                            ? "bg-gray-100"
                            : " bg-teal-900 hover:bg-teal-950"
                    } w-full text-white font-medium rounded-lg text-sm pt-3 pb-[1em] transition duration-150 ease-in-out`}
                    onClick={() => {
                        login();
                    }}
                >
                    {btnLoading ? (
                        <BtnLoader />
                    ) : (
                        <span className="tracking-widest">SUBMIT</span>
                    )}
                </button>
            </div>
        </div>
    );
};
