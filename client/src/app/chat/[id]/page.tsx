import ChatBase from '@/components/chat/ChatBase';
import { fetchChatGroup, fetchChatUser } from '@/fetch/groupFetch';
import { notFound } from 'next/navigation';
import React from 'react'
import { GroupChatUserType } from '../../../../types';

// page.tsx
export default async function page({ params }: { params: Promise<{ id: string }> }) {
    // Await the params object first
    const { id } = await params;

    // Now you can use the id safely
    // if (id?.length !== 36) {
    //     console.log('return from 1st - invalid id length');
    //     return notFound();
    // }

    const group = await fetchChatGroup(id);
    if (group === null) {
        console.log('return from 2nd - group not found');
        return notFound();
    }

    const users: Array<GroupChatUserType> | [] = await fetchChatUser(id);

    console.log('users :>> ', users);
    console.log('group :>> ', group);

    return (
        <>
            <ChatBase group={group} users={users} />
        </>
    );
}