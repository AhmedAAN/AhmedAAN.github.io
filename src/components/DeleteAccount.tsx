import React, { useState } from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '../components/ui/button';

const DeleteAccount: React.FC = () => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const handleDelete = (): void => {
        fetch('https://radwan.up.railway.app/deleteUser', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(() => {
                console.log('User account deletion initiated');
            })
            .catch(error => {
                console.error('Error deleting user account:', error);
            });
    };
    return (
        <Dialog>
            <DialogTrigger>
                <button className='w-36'>Delete Account</button>
            </DialogTrigger>
            <DialogContent className="dialog-content">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl pt-5">Delete Account</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center">Are you sure you want to delete your account?</DialogDescription>
                <DialogClose className="flex justify-around mt-6 gap-3">
                    <Button className="w-full hover:text-white" onClick={() => setIsDeleting(false)}>
                        Cancel
                    </Button>
                    <Button className="hover:bg-destructive hover:text-white w-full" onClick={handleDelete}>
                        {isDeleting ? 'Deleting...' : 'Yes, I Want to Delete'}
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteAccount;

