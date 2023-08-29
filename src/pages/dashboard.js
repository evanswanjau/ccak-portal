import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { dashboardStats, searchData } from "../api/api-calls";
import { useSnackbar } from "notistack";
import SideNav from "../components/sideNav";
import { AuthAdministrator } from "../helpers/auth";

export const DashboardPage = () => {
    const [invoices, setInvoices] = useState([]);
    const [payments, setPayments] = useState([]);
    const [generalStats, setGeneralStats] = useState({
        members: 0,
        subscribers: 0,
        posts: 0,
        administrators: 0,
    });
    const [moneyStats, setMoneyStats] = useState({
        completed: 0,
        pending: 0,
        donations: 0,
        subscriptions: 0,
    });
    const [memberStats, setMemberStats] = useState({
        subscribed: 0,
        unsubscribed: 0,
        registered: 0,
        unregistered: 0,
    });

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        AuthAdministrator(jwt_decode);
    
        dashboardStats(generalStats, setGeneralStats, "general")
        dashboardStats(moneyStats, setMoneyStats, "money")
        dashboardStats(memberStats, setMemberStats, "member");

        searchData(
            "invoices",
            {
                keyword: "",
                member_id:"",
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
            <div className="w-10/12 p-10 pb-24 mt-8 h-[calc(100vh-3em)] overflow-y-auto">
                <h1 className="text-2xl font-semibold text-gray-600 mb-5">
                    Dashboard
                </h1>
                <div className="flex space-x-4 my-8">
                    <div className="p-2 shadow-lg rounded-lg w-full flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-teal-900">
                                {generalStats.members.toLocaleString("en-US")}
                            </h3>
                            <p className="text-sm my-2 tracking-widest font-bold text-black">
                                MEMBERS
                            </p>
                        </div>
                        <img
                            className="w-20 h-auto"
                            src="/team.png"
                            alt="Team"
                        />
                    </div>
                    <div className="p-2 shadow-lg rounded-lg w-full flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-teal-900">
                                {generalStats.subscribers.toLocaleString("en-US")}
                            </h3>
                            <p className="text-sm my-2 tracking-widest font-bold text-black">
                                SUBSCRIBERS
                            </p>
                        </div>
                        <img
                            className="w-20 h-auto"
                            src="/team.png"
                            alt="Team"
                        />
                    </div>
                    <div className="p-2 shadow-lg rounded-lg w-full flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-teal-900">
                                {generalStats.posts.toLocaleString("en-US")}
                            </h3>
                            <p className="text-sm my-2 tracking-widest font-bold text-black">
                                POSTS
                            </p>
                        </div>
                        <img
                            className="w-20 h-auto"
                            src="/team.png"
                            alt="Team"
                        />
                    </div>
                    <div className="p-2 shadow-lg rounded-lg w-full flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-teal-900">
                                {generalStats.administrators.toLocaleString("en-US")}
                            </h3>
                            <p className="text-sm my-2 tracking-widest font-bold text-black">
                                ADMINS
                            </p>
                        </div>
                        <img
                            className="w-20 h-auto"
                            src="/team.png"
                            alt="Team"
                        />
                    </div>
                </div>
                <div className="flex space-x-4 my-8">
                    <div className="p-2 shadow-lg rounded-lg w-full flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-teal-900">
                                {moneyStats.completed.toLocaleString("en-US")}
                            </h3>
                            <p className="text-sm my-2 tracking-widest font-bold text-black">
                                COMPLETED
                            </p>
                        </div>
                        <img
                            className="w-16 h-auto"
                            src="/money.png"
                            alt="Team"
                        />
                    </div>
                    <div className="p-2 shadow-lg rounded-lg w-full flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-teal-900">
                                {moneyStats.pending.toLocaleString("en-US")}
                            </h3>
                            <p className="text-sm my-2 tracking-widest font-bold text-black">
                                PENDING
                            </p>
                        </div>
                        <img
                            className="w-16 h-auto"
                            src="/money.png"
                            alt="Team"
                        />
                    </div>
                    <div className="p-2 shadow-lg rounded-lg w-full flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-teal-900">
                                {moneyStats.donations.toLocaleString("en-US")}
                            </h3>
                            <p className="text-sm my-2 tracking-widest font-bold text-black">
                                DONATIONS
                            </p>
                        </div>
                        <img
                            className="w-16 h-auto"
                            src="/money.png"
                            alt="Team"
                        />
                    </div>
                    <div className="p-2 shadow-lg rounded-lg w-full flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-teal-900">
                                {moneyStats.subscriptions.toLocaleString("en-US")}
                            </h3>
                            <p className="text-sm my-2 tracking-widest font-bold text-black">
                                SUBSCRIPTIONS
                            </p>
                        </div>
                        <img
                            className="w-16 h-auto"
                            src="/money.png"
                            alt="Team"
                        />
                    </div>
                </div>
                <div className="flex space-x-4 my-8">
                    <div className="p-2 shadow-lg rounded-lg w-full flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-teal-900">
                                {memberStats.subscribed.toLocaleString("en-US")}
                            </h3>
                            <p className="text-sm my-2 tracking-widest font-bold text-black">
                                SUBSCRIBED
                            </p>
                        </div>
                        <img
                            className="w-16 h-auto"
                            src="/people.png"
                            alt="Team"
                        />
                    </div>
                    <div className="p-2 shadow-lg rounded-lg w-full flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-teal-900">
                                {memberStats.unsubscribed.toLocaleString("en-US")}
                            </h3>
                            <p className="text-sm my-2 tracking-widest font-bold text-black">
                                UNSUBSCRIBED
                            </p>
                        </div>
                        <img
                            className="w-16 h-auto"
                            src="/people.png"
                            alt="Team"
                        />
                    </div>
                    <div className="p-2 shadow-lg rounded-lg w-full flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-teal-900">
                                {memberStats.registered.toLocaleString("en-US")}
                            </h3>
                            <p className="text-sm my-2 tracking-widest font-bold text-black">
                                REGISTERED
                            </p>
                        </div>
                        <img
                            className="w-16 h-auto"
                            src="/people.png"
                            alt="Team"
                        />
                    </div>
                    <div className="p-2 shadow-lg rounded-lg w-full flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-teal-900">
                                {memberStats.unregistered.toLocaleString("en-US")}
                            </h3>
                            <p className="text-sm my-2 tracking-widest font-bold text-black">
                                UNREGISTERED
                            </p>
                        </div>
                        <img
                            className="w-16 h-auto"
                            src="/people.png"
                            alt="Team"
                        />
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
