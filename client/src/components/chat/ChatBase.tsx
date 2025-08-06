"use client";

import React, { useEffect, useMemo } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Button } from '../ui/button';
import { getSocket } from '@/lib/socket.config';
import { Socket } from 'socket.io-client';
import { GroupChatType, GroupChatUserType } from '../../../types';
import ChatSidebar from './MobileChatSidebar';
import ChatNav from './ChatNav';

function ChatBase({ group, users }: { group: GroupChatType, users: Array<GroupChatUserType> }) {
    // useMemo correctly prevents creating a new socket on every re-render.
    // const socket = useMemo(() => getSocket(), []);

    // useEffect(() => {
    //     // Assigning auth before connection is correct.
    //     socket.auth = {
    //         room: groupId
    //     };

    //     // It's good practice to only call connect if not already connected.
    //     if (!socket.connected) {
    //         socket.connect();
    //     }

    //     const onConnect = () => {
    //         console.log("✅ Socket connected:", socket.id);
    //     };

    //     const onMessage = (data: any) => {
    //         console.log("📨 Message from server:", data);
    //     };

    //     const onDisconnect = (reason: Socket.DisconnectReason) => {
    //         console.log("❌ Socket disconnected. Reason:", reason);
    //     };

    //     socket.on("connect", onConnect);
    //     socket.on("message", onMessage);
    //     socket.on("disconnect", onDisconnect);

    //     // This cleanup function will run when the component unmounts
    //     // or before the effect runs again due to a dependency change.
    //     return () => {
    //         // It's important to remove all listeners.
    //         socket.off("connect", onConnect);
    //         socket.off("message", onMessage);
    //         socket.off("disconnect", onDisconnect);
    //         socket.disconnect();
    //     };
    //     // Add groupId to the dependency array.
    // }, [socket, groupId]);

    // const handleClick = () => {
    //     socket.emit("message", { name: "Usman", id: uuidV4() });
    // };

    return (
        <div className='flex'>
            <ChatSidebar users={users} />
            <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">
                <ChatNav chatGroup={group} users={users} />
            </div>
        </div>
    );
}

export default ChatBase;