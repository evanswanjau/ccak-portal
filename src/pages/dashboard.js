import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { searchData } from "../api/api-calls";
import { useSnackbar } from "notistack";
import SideNav from "../components/sideNav";
import { HiOutlineUsers } from "react-icons/hi2";
import { AuthAdministrator } from "../helpers/auth";

export const DashboardPage = () => {
    const [invoices, setInvoices] = useState([]);
    const [payments, setPayments] = useState([]);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        AuthAdministrator(jwt_decode);
        searchData(
            "invoices",
            {
                invoice_number: "",
                type: "",
                status: "",
                page: 1,
                limit: 5,
            },
            setInvoices,
            null,
            enqueueSnackbar
        );
        searchData(
            "payments",
            {
                transaction_id: "",
                method: "",
                invoice_number: "",
                page: 1,
                limit: 100,
            },
            setPayments,
            null,
            enqueueSnackbar
        );
    }, []); // eslint-disable-line

    return (
        <div className="flex">
            <div className="w-2/12">
                <SideNav />
            </div>
            <div className="w-10/12 p-10 pb-24 mt-8 h-[calc(100vh-3em)] overflow-scroll">
                <h1 className="text-2xl font-semibold text-gray-600 mb-5">
                    Dashboard
                </h1>
                <div className="flex space-x-4 my-5">
                    <div className="p-2 shadow-lg rounded-lg w-full">
                        <div className="flex justify-between items-centertext-gray-600">
                            <h3 className="text-3xl font-bold">4,000</h3>
                            <HiOutlineUsers className="text-3xl text-teal-900" />
                        </div>
                        <p className="text-sm my-2 tracking-widest font-semibold text-gray-600">
                            MEMBERS
                        </p>
                    </div>
                    <div className="p-2 shadow-lg rounded-lg w-full">
                        <div className="flex justify-between items-centertext-gray-600">
                            <h3 className="text-3xl font-bold">870</h3>
                            <HiOutlineUsers className="text-3xl text-teal-900" />
                        </div>
                        <p className="text-sm my-2 tracking-widest font-semibold text-gray-600">
                            SUBSCRIBERS
                        </p>
                    </div>
                    <div className="p-2 shadow-lg rounded-lg w-full">
                        <div className="flex justify-between items-centertext-gray-600">
                            <h3 className="text-3xl font-bold">2300</h3>
                            <HiOutlineUsers className="text-3xl text-teal-900" />
                        </div>
                        <p className="text-sm my-2 tracking-widest font-semibold text-gray-600">
                            POSTS
                        </p>
                    </div>
                    <div className="p-2 shadow-lg rounded-lg w-full">
                        <div className="flex justify-between items-centertext-gray-600">
                            <h3 className="text-3xl font-bold">3</h3>
                            <HiOutlineUsers className="text-3xl text-teal-900" />
                        </div>
                        <p className="text-sm my-2 tracking-widest font-semibold text-gray-600">
                            ADMINS
                        </p>
                    </div>
                </div>
                <div className="flex space-x-4 my-5">
                    <div className="p-2 shadow-lg rounded-lg w-full">
                        <div className="flex justify-between items-centertext-gray-600">
                            <h3 className="text-3xl font-bold">4,000</h3>
                            <HiOutlineUsers className="text-3xl text-teal-900" />
                        </div>
                        <p className="text-sm my-2 tracking-widest font-semibold text-gray-600">
                            TOTAL MEMBERS
                        </p>
                    </div>
                    <div className="p-2 shadow-lg rounded-lg w-full">
                        <div className="flex justify-between items-centertext-gray-600">
                            <h3 className="text-3xl font-bold">870</h3>
                            <HiOutlineUsers className="text-3xl text-teal-900" />
                        </div>
                        <p className="text-sm my-2 tracking-widest font-semibold text-gray-600">
                            ACTIVE MEMBERS
                        </p>
                    </div>
                    <div className="p-2 shadow-lg rounded-lg w-full">
                        <div className="flex justify-between items-centertext-gray-600">
                            <h3 className="text-3xl font-bold">2300</h3>
                            <HiOutlineUsers className="text-3xl text-teal-900" />
                        </div>
                        <p className="text-sm my-2 tracking-widest font-semibold text-gray-600">
                            INACTIVE MEMBERS
                        </p>
                    </div>
                    <div className="p-2 shadow-lg rounded-lg w-full">
                        <div className="flex justify-between items-centertext-gray-600">
                            <h3 className="text-3xl font-bold">3</h3>
                            <HiOutlineUsers className="text-3xl text-teal-900" />
                        </div>
                        <p className="text-sm my-2 tracking-widest font-semibold text-gray-600">
                            ADMINS
                        </p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="w-full rounded-lg shadow-lg">
                        <div className="w-full bg-yellow-200 rounded-t-lg p-2 shadow-md">
                            <h3 className="text-md">Invoices</h3>
                        </div>
                        <div className="max-h-[20em] overflow-y-auto mb-2">
                            {invoices.map((invoice) => {
                                return (
                                    <div className="m-2 p-2 rounded text-sm space-y-1 capitalize text-black bg-teal-50">
                                        <p>
                                            <span className="text-gray-600">
                                                Invoice No:
                                            </span>{" "}
                                            {invoice.invoice_number}
                                        </p>
                                        <p>
                                            <span className="text-gray-600">
                                                Description:
                                            </span>{" "}
                                            {invoice.description}
                                        </p>
                                        <p>
                                            <span className="text-gray-600">
                                                Total Amount:
                                            </span>{" "}
                                            KES{" "}
                                            {invoice.total_amount.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )}
                                        </p>
                                        <p>
                                            <span className="text-gray-600">
                                                Paid Amount:
                                            </span>{" "}
                                            KES{" "}
                                            {invoice.paid_amount.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )}
                                        </p>
                                        <p>
                                            <span className="text-gray-600">
                                                Balance:
                                            </span>{" "}
                                            KES{" "}
                                            {invoice.balance.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )}
                                        </p>
                                        <p>
                                            <span className="text-gray-600">
                                                Status:
                                            </span>{" "}
                                            {invoice.status}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="w-full rounded-lg shadow-lg">
                        <div className="w-full bg-teal-400 rounded-t-lg p-2 shadow-md">
                            <h3 className="text-md">Payments</h3>
                        </div>
                        <div className="max-h-[20em] overflow-y-auto mb-2">
                            {payments.map((payment) => {
                                return (
                                    <div className="m-2 p-2 rounded text-sm space-y-1 capitalize text-black bg-teal-50">
                                        <p>
                                            <span className="text-gray-600">
                                                Transaction ID:
                                            </span>{" "}
                                            {payment.transaction_id}
                                        </p>
                                        <p>
                                            <span className="text-gray-600">
                                                Invoice No:
                                            </span>{" "}
                                            {payment.invoice_number}
                                        </p>
                                        <p>
                                            <span className="text-gray-600">
                                                Payment Method:
                                            </span>{" "}
                                            {payment.method}
                                        </p>
                                        <p>
                                            <span className="text-gray-600">
                                                Amount:
                                            </span>{" "}
                                            KES{" "}
                                            {payment.amount.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )}
                                        </p>
                                        <p>
                                            <span className="text-gray-600">
                                                Timestamp:
                                            </span>{" "}
                                            {payment.timestamp}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
