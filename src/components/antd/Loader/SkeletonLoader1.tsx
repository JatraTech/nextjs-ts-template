// @ts-nocheck
"use client";

import { Skeleton } from "antd";

const SkeletonLoader1 = ({ containerClassName = "", skeletonClassName = "" }) => {
    return (
        <div className={`w-[812px] mx-auto p-5 h-[792px] ${containerClassName}`}>
            <Skeleton.Node active className={`${skeletonClassName} !h-full !w-full`} />
        </div>
    );
};

export default SkeletonLoader1;