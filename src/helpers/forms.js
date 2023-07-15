import { PaymentForm } from "../layouts/forms/payment-form";
import { PostForm } from "../layouts/forms/post-form";

export const getForm = (page, setRevealForm, id, getData) => {
    if (page === "posts")
        return (
            <PostForm setRevealForm={setRevealForm} id={id} getData={getData} />
        );
    if (page === "payments")
        return (
            <PaymentForm
                setRevealForm={setRevealForm}
                id={id}
                getData={getData}
            />
        );
};
