"use client";

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { createChatSchema, createChatSchemaType } from '@/validation/groupchatvalidation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CustomUser } from '@/app/api/auth/[...nextauth]/options';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { GROUP_CHAT_URL } from '@/lib/apiEndPoints';

export default function CreateChat({ user }: { user: CustomUser }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<createChatSchemaType>({
        resolver: zodResolver(createChatSchema),
    });

    const onSubmit = async (payload: createChatSchemaType) => {
        setLoading(true);

        try {
            const { data } = await axios.post(
                GROUP_CHAT_URL,
                { ...payload, userId: user.id },
                {
                    headers: {
                        Authorization: user.token
                    }
                }
            );

            if (data?.message) {
                toast.success(data.message);
                setOpen(false);       // close modal
                reset();              // reset form after success
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Error creating chat:", error.message);
                const errorMsg = error.response?.data?.message || error.message;
                toast.error(`Error creating chat: ${errorMsg}`);
            } else {
                console.error("Unexpected error:", error);
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Group</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new group chat</DialogTitle>
                    <DialogDescription>
                        Enter a group title and passcode to create a private chat group.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                    {/* Group Title Field */}
                    <div>
                        <Input
                            {...register("title")}
                            placeholder="Group Chat Title"
                            disabled={loading}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Passcode Field */}
                    <div>
                        <Input
                            {...register("passcode")}
                            placeholder="Group Chat Passcode"
                            type="password"
                            disabled={loading}
                        />
                        {errors.passcode && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.passcode.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-primary text-primary-foreground"
                        variant={"default"}
                    >
                        {loading ? "Creating..." : "Create Group"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
