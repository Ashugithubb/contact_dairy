"use client"
import { Controller, useForm } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Button, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hook/hook';
import { toast, ToastContainer } from 'react-toastify';
import { addFeedback } from '../redux/thunk/addFeddback';
import { set } from 'zod';
import { useState } from 'react';
import { CreateContactFormData, createContactSchema } from '../schema/contact.schema';

export default function ContactForm() {
    const [open, setOpen] = useState(true);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateContactFormData>({
        resolver: zodResolver(createContactSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            nickName: '',
            email: '',
            phoneNumbers: [],
            tags: [],
        },
    });

    const availableTags = useAppSelector((state) => state.tags.tagDetails);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        console.log("close")
        setOpen(false);
    }
    const onSubmit = async (data: CreateContactFormData) => {
        console.log(data);
        const res = await dispatch(addFeedback(data));
        if (res.meta.requestStatus === 'fulfilled') {
            toast.success("Contacted added successfully!");
            
        } else {
            toast.error(res.payload || "Failed");
        }
        
    };

    return (
        <Dialog
            open={open}
            onClose={() => { handleClose }}
        >
            <DialogTitle>Add Feedback</DialogTitle>
            <ToastContainer />
            <Box sx={{ margin: "20px 20px 20px 20px" }}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        label="first Name"
                        {...register('firstName')}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="last Name"
                        {...register('lastName')}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        fullWidth
                        margin="normal"
                    />


                    <TextField
                        label="nick Name"
                        {...register('nickName')}
                        error={!!errors.nickName}
                        helperText={errors.nickName?.message}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="email"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                        margin="normal"
                    />

                    <Controller
                        name="phoneNumbers"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                multiple
                                freeSolo
                                options={[]}
                                value={field.value || []}
                                onChange={(_, newValue) => field.onChange(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Phone Numbers"
                                        placeholder="Enter phone numbers"
                                        error={!!errors.phoneNumbers}
                                        helperText={errors.phoneNumbers?.message as string}
                                    />
                                )}
                            />
                        )}
                    />

                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                multiple
                                freeSolo
                                options={availableTags?.map((t:any) => t.tagName) || []}
                                value={field.value || []}
                                onChange={(_, newValue) => {
                                    const uniqueTags = [...new Set(newValue.map((tag) => tag.trim()))];
                                    field.onChange(uniqueTags);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tags"
                                        placeholder="Add tags"
                                        error={!!errors.tags}
                                        helperText={errors.tags?.message as string}
                                    />
                                )}
                            />
                        )}
                    />
                <TextField
                        label="image Url"
                        {...register('avtarUrl')}
                        error={!!errors.avtarUrl}
                        helperText={errors.avtarUrl?.message}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Add Contact
                    </Button>
                </form>
            </Box>

            <Button onClick={handleClose}>Cancel</Button>

        </Dialog>

    );
}