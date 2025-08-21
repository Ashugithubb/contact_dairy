'use client'
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import { getContactThunk } from "../redux/slice/contact.slice";
import { Autocomplete, Avatar, Box, Chip, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Contacts } from "@mui/icons-material";
import Navbar from "../component/navbar";
import { TagDetails, TagInfo } from "../redux/slice/tags.slice";
import { ToggleButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from '@mui/icons-material/Edit';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { IconButton, Stack } from '@mui/material';
import { toggleContactStatus } from "../redux/thunk/toggleStatus";
import { toast, ToastContainer } from "react-toastify";
import ContactForm from "../component/ContactForm";
import AddIcon from '@mui/icons-material/Add';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { toggleFavorite } from "../redux/thunk/favorite.thunk";
import { editContact } from "../redux/thunk/editContact";
import EditContactForm from "../component/EditContactForm";


export default function Home() {

    const tagDetails = useAppSelector((state) => state.tags.tagDetails) ?? [];

    const [searchValue, setSearchValue] = useState("");
    const [selectedTags, setSelectedTags] = useState<TagDetails[]>([]);

    const [addContact, setAddContact] = useState(false);
    const [edit,setEdit] = useState(false);

    const [contactId,setContactId] = useState<number>(-1);

    const contactslist = useAppSelector((state) => state.contact.contactlist)


    console.log("contactlist", contactslist);

    const [selected, setSelected] = useState(false);
    const [fav,setFav] = useState(false);

    const { page = 1, limit = 0, total = 0, contacts } = contactslist ?? {}

    const totalPages = Math.ceil(total / (limit || 1));

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(TagInfo());
    }, [dispatch]);


    useEffect(() => {
        const debounce = setTimeout(() => {
            dispatch(
                getContactThunk({
                    searchValue: searchValue.trim() || undefined,
                    tags: selectedTags.map((t) => t.id),
                    limit: 5,
                    deleted: selected ?? false,
                    favorite:fav??false
                })
            );
        }, 500);

        return () => clearTimeout(debounce);
    }, [searchValue, dispatch, selectedTags, selected,fav]);

    const handelDeleteAndRestore = async (id: number) => {
        const res = await dispatch(toggleContactStatus(id));
        if (res.meta.requestStatus === 'fulfilled') {
            toast.success("Action Perfomed");

        } else {
            toast.error(res.payload || "Signup failed");
        }
    }
    const handleToggle = async (id: number) => {
        const res = await dispatch(toggleFavorite(id)); /// API


        if (res.meta.requestStatus === 'fulfilled') {
            toast.success("toggled Favorite");

        } else {
            toast.error(res.payload || "failed");
        }
    }
    
    const handelEdit = (id: number) => {
        console.log("clicked");
        setContactId(id);
        setEdit(!edit);
        console.log("edit",edit);
    }



    return (<>
        <Navbar />
        <ToastContainer />
        {addContact && <ContactForm />}
        {edit && <EditContactForm id= {contactId}/>}
        <Box display="flex" gap={2} flexWrap="wrap" sx={{ marginTop: "5px" }}>
            <TextField
                label="first name or lastName"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                sx={{ width: 250 }}
            />

            <Autocomplete
                multiple
                disablePortal
                options={tagDetails}
                getOptionLabel={(option) => option.tagName}
                value={selectedTags}
                onChange={(_, newValue) => setSelectedTags(newValue)}
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Tags" />}
            />
            <ToggleButton
                value="check"
                selected={selected}
                onChange={() => setSelected(!selected)}
            >
                {selected ? <DeleteIcon /> : <DeleteOutlineIcon />}
            </ToggleButton>

            <ToggleButton
                value="check"
                selected={fav}
                onChange={() => setFav(!fav)}
            >
                {fav ? <Favorite /> : <FavoriteBorder />}
            </ToggleButton>
            

            <IconButton color="primary" onClick={() => setAddContact(!addContact)}>
                <AddIcon fontSize="large" />
            </IconButton>



        </Box>

        <TableContainer component={Paper}>
            <Table sx={{ Width: 500 }} >
                <TableHead>
                    <TableRow>
                        <TableCell>Profile</TableCell>
                        <TableCell>First_Name</TableCell>
                        <TableCell>Last_Name</TableCell>
                        <TableCell>nickName</TableCell>
                        <TableCell>email</TableCell>
                        <TableCell>tags</TableCell>
                        <TableCell  >phoneNumber</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contacts?.map((row, idx) => (
                        <TableRow
                            key={row.firstName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell><Avatar alt="albc" src={row.avtarUrl} /></TableCell>
                            <TableCell component="th" scope="row">
                                {row.firstName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.lastName}
                            </TableCell>
                            <TableCell >{row.nickName}</TableCell>
                            <TableCell sx={{ maxWidth: 150, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} >{row.email}</TableCell>
                            <TableCell >{row.tags.map((m, indx) => <Chip key={indx} label={m.tagName} size="small" sx={{ mr: 0.5 }} />)}</TableCell>

                            <TableCell>
                                {row.phoneNumbers.map((num, idx) => (
                                    <Typography key={idx} variant="body2">
                                        {num.phoneNumber}
                                    </Typography>
                                ))}
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={1}>
                                    {row.deletedAt === null && <IconButton color="error" onClick={() => handelDeleteAndRestore(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>}

                                    {row.deletedAt !== null && <IconButton color="success" onClick={() => handelDeleteAndRestore(row.id)}>
                                        <RestoreFromTrashIcon />
                                    </IconButton>}
                                    <IconButton onClick={() => handleToggle(row.id)}>
                                        {row.deletedAt === null && (
                                            row.favorite ? <Favorite color="error" /> : <FavoriteBorder />
                                        )}
                                    </IconButton>
                                   <IconButton onClick={()=>handelEdit(row.id)}>{row.deletedAt === null && (<EditIcon/>)}</IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer>

        {totalPages >= 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={totalPages}
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={(_, value) => {
                        dispatch(getContactThunk({ page: value, limit }));
                    }}
                />
            </Box>
        )}
    </>)
}