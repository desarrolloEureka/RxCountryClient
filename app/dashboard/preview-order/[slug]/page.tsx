"use client";

import PreviewOrder from "@/app/component/PreviewOrder";

const page = ({ params: { slug } }: { params: { slug: string } }) => {
    return (
        <PreviewOrder
            params={{
                slug,
            }}
        />
    );
};

export default page;
