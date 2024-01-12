import { useState, useEffect } from "react";
import { Input } from "../components/forms/input";
import { loginAdministrator } from "../api/api-calls";
import { BtnLoader } from "../components/btnLoader";

export const Login = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [data, updateData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    let disabled = data.email === "" || data.password === "";

    useEffect(() => {
        const handleKeyUp = (event) => {
            if (event.keyCode === 13 && !disabled) {
                loginAdministrator(data, setBtnLoading, setError);
            }
        };

        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [disabled, data]); // eslint-disable-line

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-teal-900">
            <h1 className="text-3xl text-center font-extrabold mb-8 text-white">
                CMS PORTAL
            </h1>
            <div className="w-11/12 sm:w-10/12 md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-lg rounded-lg mx-auto p-5 bg-white shadow-gray-800">
                <img src="/logo.png" alt="CCAK Logo" className="w-28 mx-auto" />
                {error !== "" && (
                    <div
                        className="flex items-center p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50"
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
                        loginAdministrator(data, setBtnLoading, setError);
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
