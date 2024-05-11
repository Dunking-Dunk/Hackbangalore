"use client";

import {
    ConnectionCallbackArgs,
    ErrorCallbackArgs,
} from "@codat/sdk-link-types"
import { CodatLink } from "@/components/CodatLink";
import { useState } from "react";

export default function OnBoard() {
    const [companyId, setCompanyId] = useState(""); //provide company ID
    const [modalOpen, setModalOpen] = useState(true);

    const onConnection = (connection: ConnectionCallbackArgs) =>
        alert(`On connection callback - ${connection.connectionId}`);
    const onClose = () => setModalOpen(false);
    const onFinish = (e) => {
        console.log(e)
    };
    const onError = (error: ErrorCallbackArgs) =>
        alert(`On error callback - ${error.message}`);

    return (
        <main className={'w-full h-screen flex items-center justify-center'}>
            {modalOpen && (
                <div className={' w-44 h-full z-50'}>
                    <CodatLink
                        companyId={companyId}
                        onConnection={onConnection}
                        onError={onError}
                        onClose={onClose}
                        onFinish={onFinish}
                    />
                </div>
            )}
        </main>
    );
};