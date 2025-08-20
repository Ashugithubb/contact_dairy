

"use client"
import { Controller, useForm } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Avatar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hook/hook';
import { toast, ToastContainer } from 'react-toastify';
;
import { set } from 'zod';
import { useState } from 'react';
import { CreateContactFormData, createContactSchema } from '../schema/contact.schema';
import { uploadImage } from '../redux/thunk/uploadImage';
import { addContact } from '../redux/thunk/addContacts';
import { editContact } from '../redux/thunk/editContact';

export default function EditContactForm(props: { id: number }) {
   const id=props.id;
    const [open, setOpen] = useState(true);
    const contacts = useAppSelector((state) => state.contact.contactlist?.contacts)

    const contact = contacts?.filter((c) => (c.id === props.id));

    // const [firstName, lastName, nickName, email, phoneNumbers, tags] = contact ? [contact[0].firstName, contact[0].lastName, contact[0].nickName, contact[0].email, contact[0].phoneNumbers, contact[0].tags] : ["", "", "", "", [], []];   
  
    const contactArray=contact?.[0];
    const {firstName, lastName, nickName, email, phoneNumbers,contactTag}=contactArray??{};
    const [tag] =contactTag ?? []
   


    

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateContactFormData>({
        resolver: zodResolver(createContactSchema),
        defaultValues: {
            firstName: `${firstName}` ,
            lastName: `${lastName}`,
            nickName: `${nickName}`,
            email: `${email}`,
            phoneNumbers:[`${phoneNumbers?.map((m)=>m.phoneNumber)}`],
            tags: [`${ tag?.tag?.tagName}`],
        },
    });

    const availableTags = useAppSelector((state) => state.tags.tagDetails);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setOpen(false);
    }
    const onSubmit = async (data: CreateContactFormData) => {
        data.avtarUrl = avtarUrl;
        console.log(data);
        const res = await dispatch(editContact({data,id}));
        if (res.meta.requestStatus === 'fulfilled') {
            toast.success("Contacted Updated successfully!");

        } else {
            toast.error(res.payload || "Failed");
        }

    };
    const [avtarUrl, setAvatarUrl] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log("avatr changed");
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
            const res = await dispatch(uploadImage(file));
            setAvatarUrl(res.payload)
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose }
        >
            <DialogTitle>Add Contact</DialogTitle>
            <ToastContainer />
            <Box sx={{ display: "flex", justifyContent: "flex-end", marginRight: "50px" }}>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Avatar
                        sx={{ width: 80, height: 80 }}
                        src={avatarPreview || ''}
                    />
                    <Button
                        variant="outlined"
                        component="label"
                        size="small"
                        sx={{
                            minWidth: 0,
                            position: "absolute",

                            bottom: 0,
                            right: 0,
                            marginTop: "200%",

                            padding: "4px",
                            borderRadius: "50%",
                            backgroundColor: "white",
                        }}
                    >
                        <EditIcon fontSize="small" />
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleAvatarChange}
                        />
                    </Button>
                </Box>
            </Box>
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
                                options={availableTags?.map((t: any) => t.tagName) || []}
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
                    {/* <TextField
                        label="image Url"
                        {...register('avtarUrl')}
                        error={!!errors.avtarUrl}
                        helperText={errors.avtarUrl?.message}
                        fullWidth
                        margin="normal"
                    /> */}
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