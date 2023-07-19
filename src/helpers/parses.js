import { RiQuillPenFill, RiSendPlaneFill } from "react-icons/ri";

export const parseData = (page, data) => {
    if (page === "posts") {
        return data.map((item) => {
            if (item.title) {
                item.title = (
                    <p className="truncate w-52" title={item.title}>
                        {item.title}
                    </p>
                );
            }

            if (item.category) {
                item.category = (
                    <p className="capitalize">
                        {item.category.replace(/-/g, " ")}
                    </p>
                );
            }

            if (item.access) {
                let color =
                    item.access === "public"
                        ? "bg-emerald-300"
                        : item.access === "private"
                        ? "bg-red-200"
                        : "bg-gray-200";
                item.access = (
                    <p
                        className={`capitalize ${color} text-grey-600 pt-[0.2em] pb-[0.3em] px-1 rounded-lg text-center`}
                    >
                        {item.access}
                    </p>
                );
            }

            if (item.status) {
                let color =
                    item.status === "draft"
                        ? "bg-gray-400 w-fit mx-auto"
                        : "bg-teal-600 w-fit mx-auto";

                let icon =
                    item.status === "draft" ? (
                        <RiQuillPenFill className="text-sm ml-2 mt-1" />
                    ) : (
                        <RiSendPlaneFill className="text-sm ml-2 mt-1" />
                    );

                item.status = (
                    <p
                        className={`flex justify-center capitalize ${color} text-white py-1 px-3 rounded-full text-center`}
                    >
                        {item.status} {icon}
                    </p>
                );
            }

            return item;
        });
    }

    if (page === "payments") {
        return data.map((item) => {
            if (item.method) {
                item.method = <p className="capitalize">{item.method}</p>;
            }

            if (item.type) {
                item.type = <p className="capitalize">{item.type}</p>;
            }

            if (item.amount) {
                item.amount = (
                    <p>
                        KES {item.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                );
            }

            if (item.timestamp) {
                item.timestamp = item.timestamp.replace("T", " ");
            }

            return item;
        });
    }

    if (page === "administrators") {
        return data.map((item) => {
            if (item.first_name) {
                item.name = (
                    <p className="capitalize">
                        {item.first_name} {item.last_name}
                    </p>
                );
            }

            if (item.status) {
                let color =
                    item.status === "active"
                        ? "bg-green-600 w-fit mx-auto"
                        : "bg-red-400 w-fit mx-auto";

                item.status = (
                    <p
                        className={`flex justify-center capitalize ${color} text-white py-1 px-3 rounded-full text-center`}
                    >
                        {item.status}
                    </p>
                );
            }

            if (item.role) {
                let color =
                    item.role === "admin"
                        ? "bg-emerald-900"
                        : item.role === "content-admin"
                        ? "bg-sky-900"
                        : item.role === "finance-admin"
                        ? "bg-purple-900"
                        : "bg-black";
                item.role = (
                    <p
                        className={` ${color} text-grey-600 pt-[0.2em] pb-[0.3em] px-2 rounded-lg text-white text-center w-fit`}
                    >
                        {item.role}
                    </p>
                );
            }

            return item;
        });
    }

    if (page === "subscribers") {
        return data.map((item) => {
            if (item.created_at) {
                item.created_at = new Date(
                    new Date(item.created_at).getTime() -
                        new Date(item.created_at).getTimezoneOffset() * 60000
                )
                    .toISOString()
                    .slice(0, -5)
                    .replace("T", " ");
            }

            return item;
        });
    }

    if (page === "invoices") {
        return data.map((item) => {
            if (item.total_amount)
                item.total_amount = (
                    <p>
                        KES{" "}
                        {item.total_amount.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                        )}
                    </p>
                );

            if (item.paid_amount)
                item.paid_amount = (
                    <p>
                        KES{" "}
                        {item.paid_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                );

            if (item.balance)
                item.balance = (
                    <p>
                        KES {item.balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                );

            if (item.status) {
                item.status = (
                    <p
                        className={`flex justify-center capitalize ${
                            item.status === "paid"
                                ? "bg-green-600 w-fit mx-auto"
                                : "bg-red-400 w-fit mx-auto"
                        } text-white py-1 px-3 rounded-full text-center`}
                    >
                        {item.status}
                    </p>
                );
            }

            if (item.description) {
                item.description = (
                    <p className="truncate w-52" title={item.description}>
                        {item.description}
                    </p>
                );
            }

            return item;
        });
    }
};
