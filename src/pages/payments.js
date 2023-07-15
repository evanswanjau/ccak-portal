import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import jwt_decode from "jwt-decode";
import { DataTable } from "../components/dataTable";
import { getTitles } from "../helpers/titles";
// import { Pagination } from "../components/forms/pagination";
import SideNav from "../components/sideNav";
import { FilterForm } from "../components/forms/filter";
import { searchPosts } from "../api/api-calls";
import { parseData } from "../helpers/parses";
import { Loader } from "../components/loader";
import { Empty } from "../components/empty";
import { AddButton } from "../components/addButton";
import { getForm } from "../helpers/forms";
// import { AuthAdministrator } from "../helpers/auth";

const demoData = [
    {
        transaction_id: "ABC123",
        method: "Bank Deposit",
        invoice_number: "INV001",
        type: "subscription",
        timestamp: "2023-07-15 10:30:00",
        amount: 100.0,
        paid_by: {
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "123-456-7890",
        },
        created_by: 1,
        created_at: new Date(),
        last_updated: new Date(),
    },
    {
        transaction_id: "DEF456",
        method: "M-Pesa",
        invoice_number: "INV002",
        type: "subscription",
        timestamp: "2023-07-16 14:45:00",
        amount: 75.5,
        paid_by: {
            name: "Jane Smith",
            email: "janesmith@example.com",
            phone: "987-654-3210",
        },
        created_by: 2,
        created_at: new Date(),
        last_updated: new Date(),
    },
    {
        transaction_id: "GHI789",
        method: "Bank Deposit",
        invoice_number: "INV003",
        type: "subscription",
        timestamp: "2023-07-17 09:15:00",
        amount: 200.0,
        paid_by: {
            name: "Sarah Johnson",
            email: "sarahjohnson@example.com",
            phone: "555-123-4567",
        },
        created_by: 3,
        created_at: new Date(),
        last_updated: new Date(),
    },
    {
        transaction_id: "JKL012",
        method: "M-Pesa",
        invoice_number: "INV004",
        type: "donation",
        timestamp: "2023-07-18 16:20:00",
        amount: 150.75,
        paid_by: {
            name: "Robert Davis",
            email: "robertdavis@example.com",
            phone: "555-987-6543",
        },
        created_by: 4,
        created_at: new Date(),
        last_updated: new Date(),
    },
    {
        transaction_id: "MNO345",
        method: "Bank Deposit",
        invoice_number: "INV005",
        type: "donation",
        timestamp: "2023-07-19 11:45:00",
        amount: 75.25,
        paid_by: {
            name: "Amy Thompson",
            email: "amythompson@example.com",
            phone: "555-789-0123",
        },
        created_by: 5,
        created_at: new Date(),
        last_updated: new Date(),
    },
    {
        transaction_id: "PQR678",
        method: "Bank Deposit",
        invoice_number: "INV006",
        type: "subscription",
        timestamp: "2023-07-20 13:30:00",
        amount: 300.5,
        paid_by: {
            name: "Michael Wilson",
            email: "michaelwilson@example.com",
            phone: "555-456-7890",
        },
        created_by: 6,
        created_at: new Date(),
        last_updated: new Date(),
    },
    {
        transaction_id: "STU901",
        method: "M-Pesa",
        invoice_number: "INV007",
        type: "subscription",
        timestamp: "2023-07-21 08:45:00",
        amount: 50.0,
        paid_by: {
            name: "Emily Brown",
            email: "emilybrown@example.com",
            phone: "555-234-5678",
        },
        created_by: 7,
        created_at: new Date(),
        last_updated: new Date(),
    },
    {
        transaction_id: "VWX234",
        method: "Bank Deposit",
        invoice_number: "INV008",
        type: "subscription",
        timestamp: "2023-07-22 15:10:00",
        amount: 125.75,
        paid_by: {
            name: "Daniel Clark",
            email: "danielclark@example.com",
            phone: "555-678-9012",
        },
        created_by: 8,
        created_at: new Date(),
        last_updated: new Date(),
    },
    {
        transaction_id: "YZ0123",
        method: "M-Pesa",
        invoice_number: "INV009",
        type: "subscription",
        timestamp: "2023-07-23 12:00:00",
        amount: 90.5,
        paid_by: {
            name: "Olivia Green",
            email: "oliviagreen@example.com",
            phone: "555-901-2345",
        },
        created_by: 9,
        created_at: new Date(),
        last_updated: new Date(),
    },
    {
        transaction_id: "ABC123",
        method: "Bank Deposit",
        invoice_number: "INV010",
        type: "subscription",
        timestamp: "2023-07-24 14:30:00",
        amount: 180.25,
        paid_by: {
            name: "Jacob Evans",
            email: "jacobevans@example.com",
            phone: "555-345-6789",
        },
        created_by: 10,
        created_at: new Date(),
        last_updated: new Date(),
    },
    {
        transaction_id: "YZ0123",
        method: "M-Pesa",
        invoice_number: "INV009",
        type: "subscription",
        timestamp: "2023-07-23 12:00:00",
        amount: 90.5,
        paid_by: {
            name: "Olivia Green",
            email: "oliviagreen@example.com",
            phone: "555-901-2345",
        },
        created_by: 9,
        created_at: new Date(),
        last_updated: new Date(),
    },
    {
        transaction_id: "ABC123",
        method: "Bank Deposit",
        invoice_number: "INV010",
        type: "subscription",
        timestamp: "2023-07-24 14:30:00",
        amount: 180.25,
        paid_by: {
            name: "Jacob Evans",
            email: "jacobevans@example.com",
            phone: "555-345-6789",
        },
        created_by: 10,
        created_at: new Date(),
        last_updated: new Date(),
    },
];

export const PaymentsPage = () => {
    const [loading, setLoading] = useState(false);
    const [data, updateData] = useState([]);
    const [revealForm, setRevealForm] = useState(false);
    const [id, setID] = useState(null);
    const [search, updateSearch] = useState({
        keyword: "",
        table: "posts",
        category: "",
        technology: "",
        project_status: "",
        access: "",
        status: "",
        page: 1,
        limit: 100,
        ip_address: "",
    });

    // const { enqueueSnackbar } = useSnackbar();

    const getData = () => {
        updateData(parseData("payments", demoData));
        setLoading(false);
        // AuthAdministrator(jwt_decode);
        // searchPosts(search, updateData, parseData, enqueueSnackbar).finally(
        //     () => {
        //         setLoading(false);
        //     }
        // );
    };

    useEffect(() => {
        getData();
    }, []); // eslint-disable-line

    let content = <Loader />;

    if (revealForm) content = getForm("payments", setRevealForm, id, getData);

    if (!revealForm && loading) content = <Loader />;

    if (!revealForm && !loading && data.length < 1) content = <Empty />;

    if (!revealForm && !loading && data.length > 0)
        content = (
            <div>
                <DataTable
                    titles={getTitles("payments")}
                    url="post"
                    data={data}
                    updateData={updateData}
                    setRevealForm={setRevealForm}
                    setID={setID}
                />
                {/* <div className="my-5">
                    <Pagination search={search} count={data.length} />
                </div> */}
            </div>
        );

    return (
        <div className="flex">
            <div className="w-2/12">
                <SideNav />
            </div>
            <div className="w-10/12 p-10 pb-24 mt-8 h-[calc(100vh-3em)] overflow-scroll">
                <h1 className="text-2xl font-semibold text-gray-600 mb-5">
                    Payments
                </h1>
                {!loading && !revealForm && (
                    <FilterForm
                        page="payments"
                        search={search}
                        updateSearch={updateSearch}
                    />
                )}
                {content}
                {!loading && !revealForm && (
                    <AddButton setRevealForm={setRevealForm} />
                )}
            </div>
        </div>
    );
};
