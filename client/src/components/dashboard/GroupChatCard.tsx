import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import GroupChatCardMenu from "./GroupChatCardMenu";
import { GroupChatType } from "../../../types";

export default function GroupChatCard({
    group,
    user,
}: {
    group: GroupChatType;
    user: CustomUser;
}) {
    return (
        <Card className="transition-shadow hover:shadow-xl rounded-lg border border-gray-200">
            <CardHeader className="flex flex-row justify-between items-start p-4">
                <div>
                    <CardTitle className="text-xl font-semibold text-gray-800">
                        {group.title}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                        Created on {new Date(group.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
                <GroupChatCardMenu user={user} group={group} />
            </CardHeader>

            <CardContent className="px-4 pb-4">
                <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-800">Passcode:</span>{" "}
                        <span className="ml-1 text-blue-600 font-mono">{group.passcode}</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
