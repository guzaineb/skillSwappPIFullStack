import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import NoChatSelected from "../../pages/NoChatSelected";
import ChatContainer from "../../pages/ChatContainer";
import Header from "./Header";
import Sidebar from "../../pages/Sidebar";
import Footer from "./Footer";

const Chat = () => {

    const { selectedUser } = useChatStore();

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="vh-100 bg-light">
                <div className="d-flex justify-content-center pt-5 px-4">
                    <div className="bg-white rounded-lg shadow w-100 max-w-xxl" style={{ height: 'calc(100vh - 8rem)' }}>
                        <div className="d-flex h-100 rounded-lg overflow-hidden">
                            <Sidebar />
                            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Chat;
