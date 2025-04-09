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
    <Header />
    <br></br>
    <br></br>
    <br></br>
        
    <br></br>
    <br></br>
    <br></br>

      <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
                <Sidebar />
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      </>
    );
  };
  
 export default Chat;