import { RiCloseCircleFill } from "react-icons/ri";
import { capitalize } from "../../helpers/strings";

export const FilterForm = ({ page, search, updateSearch }) => {
    if (page === "posts") {
        const categories = [
            "press-release",
            "news",
            "projects",
            "blog",
            "careers",
            "consultancy",
            "funding-opportunities",
            "events",
            "photo-gallery",
            "internal-publications",
            "external-publications",
            "newsletters",
        ];

        return (
            <div className="py-3 flex justify-end space-x-2">
                <input
                    className="w-3/12 text-sm block text-gray-700 border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    type="text"
                    placeholder="Search posts"
                    value={search.keyword}
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            keyword: event.target.value,
                            page: 1,
                        });
                    }}
                />
                <select
                    className="w-2/12 block text-sm text-gray-700 bg-white border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            category: event.target.value,
                            page: 1,
                        });
                    }}
                >
                    <option value={""}>Choose Category</option>
                    {categories.map((category) => {
                        return (
                            <option
                                key={category}
                                value={category}
                                selected={search.category === category}
                            >
                                {capitalize(category.replace(/-/, " "))}
                            </option>
                        );
                    })}
                </select>
                <select
                    className="w-2/12 block text-sm text-gray-700 bg-white border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            access: event.target.value,
                            page: 1,
                        });
                    }}
                >
                    <option value={""}>Choose Access</option>
                    {["public", "private", "hidden"].map((item) => {
                        return (
                            <option
                                key={item}
                                value={item}
                                selected={search.access === item}
                            >
                                {item.slice(0, 1).toUpperCase() +
                                    item.substring(1)}
                            </option>
                        );
                    })}
                </select>
                <select
                    className="w-2/12 block text-sm text-gray-700 bg-white border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            status: event.target.value,
                            page: 1,
                        });
                    }}
                >
                    <option value={""}>Choose Status</option>
                    {["published", "draft"].map((item) => {
                        return (
                            <option
                                key={item}
                                value={item.toLowerCase()}
                                selected={search.status === item}
                            >
                                {item.slice(0, 1).toUpperCase() +
                                    item.substring(1)}
                            </option>
                        );
                    })}
                </select>
                <button
                    type="button"
                    className="flex focus:outline-none bg-gray-100 text-teal-900 hover:bg-gray-200 font-medium rounded-lg text-sm px-3 pt-2 pb-[0.8em] transition duration-150 ease-in-out"
                    onClick={() => {
                        updateSearch({
                            keyword: "",
                            table: "posts",
                            category: "",
                            technology: "",
                            project_status: "",
                            access: "",
                            status: "",
                            page: 1,
                            limit: 15,
                            ip_address: "",
                        });
                    }}
                >
                    <RiCloseCircleFill className="text-sm mr-2 mt-1" />
                    Reset
                </button>
            </div>
        );
    }

    if (page === "payments") {
        return (
            <div className="py-3 flex justify-end space-x-2">
                <input
                    className="w-3/12 text-sm block text-gray-700 border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    type="text"
                    placeholder="Search payment"
                    value={search.keyword}
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            keyword: event.target.value,
                            page: 1,
                        });
                    }}
                />
                <select
                    className="w-2/12 block text-sm text-gray-700 bg-white border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            method: event.target.value,
                            page: 1,
                        });
                    }}
                >
                    <option value={""}>Choose Method</option>
                    {["bank deposit", "mpesa", "cash"].map((item) => {
                        return (
                            <option
                                key={item}
                                value={item}
                                selected={search.method === item}
                            >
                                {item.slice(0, 1).toUpperCase() +
                                    item.substring(1)}
                            </option>
                        );
                    })}
                </select>
                <button
                    type="button"
                    className="flex focus:outline-none bg-gray-100 text-teal-900 hover:bg-gray-200 font-medium rounded-lg text-sm px-3 pt-2 pb-[0.8em] transition duration-150 ease-in-out"
                    onClick={() => {
                        updateSearch({
                            keyword: "",
                            method: "",
                            page: 1,
                            limit: 10,
                        });
                    }}
                >
                    <RiCloseCircleFill className="text-sm mr-2 mt-1" />
                    Reset
                </button>
            </div>
        );
    }

    if (page === "invoices") {
        return (
            <div className="py-3 flex justify-end space-x-2">
                <input
                    className="w-3/12 text-sm block text-gray-700 border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    type="text"
                    placeholder="Search invoice"
                    value={search.invoice_number}
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            keyword: event.target.value,
                            page: 1,
                        });
                    }}
                />
                <select
                    className="w-2/12 block text-sm text-gray-700 bg-white border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            type: event.target.value,
                            page: 1,
                        });
                    }}
                >
                    <option value={""}>Choose Type</option>
                    {[
                        "member registration",
                        "annual subscription",
                        "donation",
                    ].map((item) => {
                        return (
                            <option
                                key={item}
                                value={item}
                                selected={search.access === item}
                            >
                                {item.slice(0, 1).toUpperCase() +
                                    item.substring(1)}
                            </option>
                        );
                    })}
                </select>
                <select
                    className="w-2/12 block text-sm text-gray-700 bg-white border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            status: event.target.value,
                            page: 1,
                        });
                    }}
                >
                    <option value={""}>Choose Status</option>
                    {["paid", "unpaid"].map((item) => {
                        return (
                            <option
                                key={item}
                                value={item.toLowerCase()}
                                selected={search.status === item}
                            >
                                {item.slice(0, 1).toUpperCase() +
                                    item.substring(1)}
                            </option>
                        );
                    })}
                </select>
                <button
                    type="button"
                    className="flex focus:outline-none bg-gray-100 text-teal-900 hover:bg-gray-200 font-medium rounded-lg text-sm px-3 pt-2 pb-[0.8em] transition duration-150 ease-in-out"
                    onClick={() => {
                        updateSearch({
                            keyword: "",
                            member_id: "",
                            type: "",
                            status: "",
                            page: 1,
                            limit: 10,
                        });
                    }}
                >
                    <RiCloseCircleFill className="text-sm mr-2 mt-1" />
                    Reset
                </button>
            </div>
        );
    }

    if (page === "members") {
        return (
            <div className="py-3 flex justify-end space-x-2">
                <input
                    className="w-3/12 text-sm block text-gray-700 border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    type="text"
                    placeholder="Search member"
                    value={search.keyword}
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            keyword: event.target.value,
                            page: 1,
                        });
                    }}
                />
                <select
                    className="w-2/12 block text-sm text-gray-700 bg-white border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            technology: event.target.value,
                            page: 1,
                        });
                    }}
                >
                    <option value={""}>Technology</option>
                    {[
                        "cook stoves providers",
                        "ethanol",
                        "biogas",
                        "non-carbonized briquettes",
                        "carbon briquettes",
                        "research and consultancy",
                        "lpg",
                        "partners",
                        "membership associations",
                        "solar",
                        "journalists",
                        "imc",
                    ].map((item) => {
                        return (
                            <option
                                key={item}
                                value={item}
                                selected={search.technology === item}
                            >
                                {item.slice(0, 1).toUpperCase() +
                                    item.substring(1)}
                            </option>
                        );
                    })}
                </select>
                <select
                    className="w-2/12 block text-sm text-gray-700 bg-white border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            subscription_category: event.target.value,
                            page: 1,
                        });
                    }}
                >
                    <option value={""}>Subscription Category</option>
                    {[
                        "corporate-large",
                        "corporate-medium",
                        "corporate-small",
                        "corporate-micro",
                        "ngo-international",
                        "ngo-local",
                        "donor-large",
                        "association-membership",
                        "CSO",
                        "intitution-research,technology",
                        "individual",
                        "student",
                    ].map((item) => {
                        return (
                            <option
                                key={item}
                                value={item}
                                selected={search.subscription_category === item}
                            >
                                {item.slice(0, 1).toUpperCase() +
                                    item.substring(1)}
                            </option>
                        );
                    })}
                </select>
                <select
                    className="w-2/12 block text-sm text-gray-700 bg-white border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            registration_status: event.target.value,
                            page: 1,
                        });
                    }}
                >
                    <option value={""}>Registration Status</option>
                    {["registered", "unregistered"].map((item) => {
                        return (
                            <option
                                key={item}
                                value={item.toLowerCase()}
                                selected={search.registration_status === item}
                            >
                                {item.slice(0, 1).toUpperCase() +
                                    item.substring(1)}
                            </option>
                        );
                    })}
                </select>
                <select
                    className="w-2/12 block text-sm text-gray-700 bg-white border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            subscription_status: event.target.value,
                            page: 1,
                        });
                    }}
                >
                    <option value={""}>Subscription Status</option>
                    {["active", "inactive"].map((item) => {
                        return (
                            <option
                                key={item}
                                value={item.toLowerCase()}
                                selected={search.subscription_status === item}
                            >
                                {item.slice(0, 1).toUpperCase() +
                                    item.substring(1)}
                            </option>
                        );
                    })}
                </select>
                <button
                    type="button"
                    className="flex focus:outline-none bg-gray-100 text-teal-900 hover:bg-gray-200 font-medium rounded-lg text-sm px-3 pt-2 pb-[0.8em] transition duration-150 ease-in-out"
                    onClick={() => {
                        updateSearch({
                            keyword: "",
                            technology: "",
                            registration_status: "",
                            subscription_status: "",
                            subscription_category: "",
                            status: "",
                            page: 1,
                            limit: 10,
                        });
                    }}
                >
                    <RiCloseCircleFill className="text-sm mr-2 mt-1" />
                    Reset
                </button>
            </div>
        );
    }

    if (page === "donations") {
        return (
            <div className="py-3 flex justify-end space-x-2">
                <input
                    className="w-3/12 text-sm block text-gray-700 border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    type="text"
                    placeholder="Search donation"
                    value={search.keyword}
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            keyword: event.target.value,
                            page: 1,
                        });
                    }}
                />

                <select
                    className="w-2/12 block text-sm text-gray-700 bg-white border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            status: event.target.value,
                            page: 1,
                        });
                    }}
                >
                    <option value={""}>Status</option>
                    {["paid", "unpaid"].map((item) => {
                        return (
                            <option
                                key={item}
                                value={item.toLowerCase()}
                                selected={search.status === item}
                            >
                                {item.slice(0, 1).toUpperCase() +
                                    item.substring(1)}
                            </option>
                        );
                    })}
                </select>
                <button
                    type="button"
                    className="flex focus:outline-none bg-gray-100 text-teal-900 hover:bg-gray-200 font-medium rounded-lg text-sm px-3 pt-2 pb-[0.8em] transition duration-150 ease-in-out"
                    onClick={() => {
                        updateSearch({
                            keyword: "",
                            status: "",
                            page: 1,
                            limit: 10,
                        });
                    }}
                >
                    <RiCloseCircleFill className="text-sm mr-2 mt-1" />
                    Reset
                </button>
            </div>
        );
    }
};
