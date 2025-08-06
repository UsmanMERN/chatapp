import ChatBase from '@/components/chat/ChatBase';
import React from 'react'

export default function page({ params }: { params: { id: string } }) {
    // console.log('params.id :>> ', params.id);
    return (
        <>
            <h1>Hey thier from chats</h1>
            <ChatBase groupId={params.id} />
        </>
    )
}
