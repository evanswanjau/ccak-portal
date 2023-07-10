import { useState } from "react";
import { Input } from "../components/forms/input";

export const Login = () => {
    const [data, updateData] = useState({ email: "", password: "" });

    return (
        <div className="flex items-center justify-center h-screen bg-teal-50">
            <div className="w-4/12 shadow-lg rounded-lg mx-auto p-5 bg-white">
                <img src="/logo.png" alt="CCAK Logo" className="w-28 mx-auto"/>
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
                    className="w-full text-white bg-teal-900 hover:bg-teal-950 font-medium rounded-lg text-sm pt-3 pb-[1em] transition duration-150 ease-in-out"
                >
                    SUBMIT
                </button>
            </div>
        </div>
    );
};
