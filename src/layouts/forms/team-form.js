import React, { useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi2";

export const TeamForm = ({ data, setMember, setRevealForm }) => {
    const [showForm, setShowForm] = useState(true);
    const [current, setCurrent] = useState("executive board members");

    return (
        <div className="w-full lg:w-8/12 rounded-lg shadow-lg mx-auto">
            <div
                className={`flex items-center justify-between bg-teal-900 text-white p-2 cursor-pointer ${
                    showForm ? "rounded-t-lg" : "rounded-lg"
                }`}
                onClick={() => setShowForm(!showForm)}
            >
                <h2 className="text-xl font-semibold">Our Team</h2>
                {showForm ? (
                    <HiMinus className="text-xl text-white" />
                ) : (
                    <HiPlus className="text-xl text-white" />
                )}
            </div>

            {showForm && (
                <div className="p-5">
                    {data?.content.map((item, index) => {
                        return (
                            <div key={index}>
                                <h1
                                    className="flex justify-between items-center cursor-pointer text-xl text-gray-700 capitalize font-semibold"
                                    onClick={() => setCurrent(item.name)}
                                >
                                    {item.name}{" "}
                                    {current === item.name ? (
                                        <HiMinus className="text-xl" />
                                    ) : (
                                        <HiPlus className="text-xl" />
                                    )}
                                </h1>
                                <div className="grid grid-cols-3 gap-4 p-5">
                                    {current === item.name &&
                                        item.members.map((member, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex flex-col space-y-4 justify-center items-center hover:shadow-xl cursor-pointer rounded-lg transition duration-300 ease-in-out p-4"
                                                    onClick={() => {
                                                        setMember({
                                                            ...member,
                                                            groupIndex: index,
                                                            index: i,
                                                            id: data.id,
                                                        });
                                                        setRevealForm(true);
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            backgroundImage: `url(${
                                                                process.env
                                                                    .REACT_APP_IMAGEKIT_URL +
                                                                "/" +
                                                                member.image
                                                            })`,
                                                        }}
                                                        className={`bg-cover bg-center bg-no-repeat text-white w-40 h-40 rounded-full`}
                                                    ></div>
                                                    <h4 className="capitalize text-lg font-semibold text-center">
                                                        {member.name}
                                                    </h4>
                                                    <p className="capitalize text-gray-500 text-center">
                                                        {member.position}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
