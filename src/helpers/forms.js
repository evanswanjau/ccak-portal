import { AdministratorForm } from "../layouts/forms/administrator-form";
import { MemberForm } from "../layouts/forms/member-form";
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
    if (page === "administrators")
        return (
            <AdministratorForm
                setRevealForm={setRevealForm}
                id={id}
                getData={getData}
            />
        );
    
    if (page === "members")
        return (
            <MemberForm
                setRevealForm={setRevealForm}
                id={id}
                getData={getData}
            />
        );
};
