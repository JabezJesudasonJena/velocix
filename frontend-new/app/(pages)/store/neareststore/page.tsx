"use client"

import dynamic from "next/dynamic";

const NearestStores = dynamic(
    () => import(`@/components/Pages/store/NearestStore`),
    {ssr: false}
)

export default function Page(){
    return (
        <div>
            <NearestStores/>
        </div>
    )
}