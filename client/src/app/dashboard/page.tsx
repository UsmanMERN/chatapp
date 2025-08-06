import DashboardNav from '@/components/dashboard/DashboardNav'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth';
import CreateChat from '@/components/groupchat/CreateChat';
import { fetchChatGroups } from '@/fetch/groupFetch';
import { GroupChatType } from '../../../types';
import GroupChatCard from '@/components/dashboard/GroupChatCard';

export default async function page() {
    const session: CustomSession | null = await getServerSession(authOptions);

    const groups: Array<GroupChatType> | [] = await fetchChatGroups(session?.user?.token!)

    return (
        <>
            <DashboardNav name={session?.user?.name!} imageUrl={session?.user?.image!} />
            <div className="container">
                <div className="flex justify-end mt-10">
                    <CreateChat user={session?.user!} />
                </div>
                {/* If Groups */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {groups.length > 0 &&
                        groups.map((item, index) => (
                            <GroupChatCard group={item} key={index} user={session?.user!} />
                        ))}
                </div>
            </div>
        </>
    )
}
