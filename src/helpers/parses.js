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
                item.method = (
                    <p className="capitalize">
                        {item.method.replace(/-/g, " ")}
                    </p>
                );
            }

            if (item.type) {
                item.type = <p className="capitalize">{item.type}</p>;
            }

            if (item.amount) {
                item.amount = <p>KES {item.amount}</p>;
            }

            return item;
        });
    }
};
