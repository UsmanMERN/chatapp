"use client";

import React, { useEffect, useMemo } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Button } from '../ui/button';
import { getSocket } from '@/lib/socket.config';
import { Socket } from 'socket.io-client';

function ChatBase({ groupId }: { groupId: string }) {
    // useMemo correctly prevents creating a new socket on every re-render.
    const socket = useMemo(() => getSocket(), []);

    useEffect(() => {
        // Assigning auth before connection is correct.
        socket.auth = {
            room: groupId
        };

        // It's good practice to only call connect if not already connected.
        if (!socket.connected) {
            socket.connect();
        }

        const onConnect = () => {
            console.log("✅ Socket connected:", socket.id);
        };

        const onMessage = (data: any) => {
            console.log("📨 Message from server:", data);
        };

        const onDisconnect = (reason: Socket.DisconnectReason) => {
            console.log("❌ Socket disconnected. Reason:", reason);
        };

        socket.on("connect", onConnect);
        socket.on("message", onMessage);
        socket.on("disconnect", onDisconnect);

        // This cleanup function will run when the component unmounts
        // or before the effect runs again due to a dependency change.
        return () => {
            // It's important to remove all listeners.
            socket.off("connect", onConnect);
            socket.off("message", onMessage);
            socket.off("disconnect", onDisconnect);
            socket.disconnect();
        };
        // Add groupId to the dependency array.
    }, [socket, groupId]);

    const handleClick = () => {
        socket.emit("message", { name: "Usman", id: uuidV4() });
    };

    return (
        <div>
            <Button onClick={handleClick}>Send Message</Button>
        </div>
    );
}

export default ChatBase;