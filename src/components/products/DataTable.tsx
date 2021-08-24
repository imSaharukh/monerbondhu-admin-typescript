import { TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DeleteForever } from '@material-ui/icons';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import parse from 'html-react-parser';
import React, { useState } from 'react';
import Avatar from '../../assets/Avatar.jpg';
import axios from '../../utils/axios';
import EditBigContent from '../../utils/EditBigContent';
import Loader from '../../utils/Loader';
import ShowFullContent from '../../utils/ShowFullContent';
import AddForm from './AddForm';
import { ProductsData } from './Products';

interface Props {
    apiData: ProductsData[];
    forceUpdate: () => void;
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const createData = (
    id: string,
    title: string,
    description: string,
    price: string | number,
    image: string
) => ({
    id,
    title,
    description,
    price,
    image,
});

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    table: {
        minWidth: 700,
    },
    textField: {
        '& > *': {
            fontSize: 13,
        },
    },
    content: {
        width: 80,
        maxWidth: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        '& > *': {
            maxWidth: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
        },
    },
});

const DataTable: React.FC<Props> = ({ apiData, forceUpdate }): React.ReactElement => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIdx, setEditingIdx] = useState(-1);
    //   const [isSumbit, setIsSubmit] = useState(false);

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState<string | number>('');
    const [description, setDescription] = useState('');

    const handleClose = () => {
        setIsEditing(false);
        setEditingIdx(-1);
    };

    const clearAll = () => {
        setTitle('');
        setPrice('');
        setDescription('');
        // setIsSubmit(false);
    };

    const handleDelete = async (id: string) => {
        setIsLoading(true);

        const token = `Bearer ${localStorage.getItem('token')}`;

        try {
            const response = await axios.delete('/shop', {
                headers: { Authorization: token },
                data: {
                    id,
                },
            });

            if (response) {
                setIsLoading(false);
                // eslint-disable-next-line no-alert
                alert('Deleted Successfully');
                forceUpdate();
            }
        } catch (err) {
            setIsLoading(false);
            // eslint-disable-next-line no-alert
            alert(err.response.data.message || 'Something went wrong');
        }
    };

    const handleEdit = async (id: string) => {
        // setIsSubmit(true);
        if (!title || !price || !description) return;

        setIsEditing(false);
        setEditingIdx(-1);
        setIsLoading(true);

        const updateData = {
            id,
            dis: description,
            price,
            name: title,
        };

        const token = `Bearer ${localStorage.getItem('token')}`;

        try {
            const response = await axios.patch('/shop', updateData, {
                headers: { Authorization: token },
            });

            if (response) {
                setIsLoading(false);

                forceUpdate();

                clearAll();
            }
        } catch (err) {
            setIsLoading(false);

            clearAll();

            // eslint-disable-next-line no-alert
            alert(err?.response?.data?.message ?? 'Something went wrong');
        }
    };

    const editButtonHandler = (
        editedData: {
            title: string;
            price: string | number;
            description: string;
        },
        idx: number
    ) => {
        setIsEditing(true);
        setEditingIdx(idx);

        setTitle(editedData.title);
        setPrice(editedData.price);
        setDescription(editedData.description);
    };

    const rows = apiData.map((data) =>
        // eslint-disable-next-line no-underscore-dangle
        createData(data._id, data.name, data.dis, data.price, data.image)
    );

    return (
        <>
            <Loader open={isLoading} />

            <AddForm forceUpdate={forceUpdate} />

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell align="right">Edit</StyledTableCell>
                            <StyledTableCell align="right">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row, idx) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell>
                                    <img
                                        src={row.image || Avatar}
                                        alt=""
                                        width="100px"
                                        height="100px"
                                    />
                                </StyledTableCell>

                                <StyledTableCell>
                                    {isEditing && editingIdx === idx ? (
                                        <TextField
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className={classes.textField}
                                        />
                                    ) : (
                                        row.title
                                    )}
                                </StyledTableCell>

                                <StyledTableCell>
                                    {isEditing && editingIdx === idx ? (
                                        <TextField
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className={classes.textField}
                                        />
                                    ) : (
                                        row.price
                                    )}
                                </StyledTableCell>

                                <StyledTableCell>
                                    {/* eslint-disable-next-line no-nested-ternary */}
                                    {isEditing && editingIdx === idx ? (
                                        <EditBigContent
                                            contentTitle="Description"
                                            bigContent={description}
                                            setBigContent={setDescription}
                                        />
                                    ) : row.description?.length > 12 ? (
                                        <>
                                            <div className={classes.content}>
                                                {parse(row.description || '')}
                                            </div>
                                            <ShowFullContent
                                                title="Content"
                                                content={parse(row.description || '')}
                                            />
                                        </>
                                    ) : (
                                        <div className={classes.content}>
                                            {parse(row.description || '')}
                                        </div>
                                    )}
                                </StyledTableCell>

                                <StyledTableCell align="right">
                                    {isEditing && editingIdx === idx ? (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <ClearIcon
                                                style={{
                                                    cursor: 'pointer',
                                                    color: 'red',
                                                    marginRight: 7,
                                                }}
                                                onClick={() => handleClose()}
                                            />
                                            <CheckIcon
                                                style={{ cursor: 'pointer', color: 'green' }}
                                                onClick={() => handleEdit(row.id)}
                                            />
                                        </div>
                                    ) : (
                                        <EditIcon
                                            style={{ cursor: 'pointer' }}
                                            onClick={() =>
                                                editButtonHandler(
                                                    {
                                                        title: row.title,
                                                        price: row.price,
                                                        description: row.description,
                                                    },
                                                    idx
                                                )
                                            }
                                        />
                                    )}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <DeleteForever
                                        color="secondary"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDelete(row.id)}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default DataTable;
