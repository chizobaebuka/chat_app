import { Request, Response } from 'express';
import prisma from '../db/prisma.js';

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;
        let conversation = await prisma.conversation.findFirst({
            where: {
                participantsIds: {
                    hasEvery: [senderId, receiverId]
                }
            }
        })

        // If conversation doesn't exist, create a new one with the participants
        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    participantsIds: {
                        set: [senderId, receiverId]
                    }
                }
            })
        }

        const newMessage = await prisma.message.create({
            data: {
                senderId,
                body: message,
                conversationId: conversation.id,
            }
        });

        if(newMessage){
            conversation = await prisma.conversation.update({
                where: { id: conversation.id },
                data: {
                    messages: { connect: { id: newMessage.id } }
                }
            })
        }

        // socket io will go here for real time communication
        res.status(201).json({ message: "Message sent successfully", data: newMessage });
    } catch (err: any) {
        console.error('Error in sendMessage: ', err.message);
        res.status(500).json({ message: err.message, error: "Internal Server Error" });
    }
}

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { id: userToChatWithId } = req.params;
        const senderId = req.user.id;
        const conversation = await prisma.conversation.findFirst({
            where: {
                participantsIds: {
                    hasEvery: [senderId, userToChatWithId]
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        });

        if (!conversation) {
            return res.status(404).json({ error: "No conversation found", data: [] });
        }

        res.status(200).json({ data: conversation.messages });
    } catch (error: any) {
        console.error('Error in getMessages: ', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getUsersForSideBar = async (req: Request, res: Response) => {
    try {
        const authUserId = req.user.id;
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                fullName: true,
                profilePic: true
            },
            where: {
                id: {
                    not: authUserId
                }
            }
        });

        res.status(200).json({ data: users });
    } catch (error: any) {
        console.error('Error in getUsersForSideBar: ', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
