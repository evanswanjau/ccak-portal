import SideNav from "../components/sideNav";

export const PaymentsPage = () => {
    return (
        <div className="flex">
            <div className="w-2/12">
                <SideNav />
            </div>
            <div className="w-10/12 p-10 pb-24 mt-8 h-[calc(100vh-3em)] overflow-scroll">
                <h1 className="text-2xl font-semibold text-gray-600 mb-5">
                    Payments
                </h1>
            </div>
        </div>
    );
};
