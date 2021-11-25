/* eslint-disable no-alert */
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React, { useState } from 'react';
import withTab from '../../container/tabLayout/TabLayout';
import axios from '../../utils/axios';
import Loader from '../../utils/Loader';
import AddForm from './AddForm';
import MusicCard from './MusicCard';

interface Props {
    apiData: {
        [key: string]: {
            _id: string;
            name: string;
            category: string;
            subType: string;
            image: string;
            mp3: string;
            musicKey: string;
        }[];
    };
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
    image: string,
    category: string,
    subType: string,
    name: string,
    mp3: string,
    musicKey: string
) => ({ id, image, category, subType, name, mp3, musicKey });

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const DataTable: React.FC<Props> = ({ apiData, forceUpdate }): React.ReactElement => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (id: string) => {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm('Are you sure you want to delete this element?')) {
            return;
        }

        setIsLoading(true);

        const token = `Bearer ${localStorage.getItem('token')}`;

        try {
            const response = await axios.delete('/music', {
                headers: { Authorization: token },
                data: {
                    id,
                },
            });

            if (response) {
                setIsLoading(false);
                alert('Deleted Successfully');
                forceUpdate();
            }
        } catch (err) {
            setIsLoading(false);
            // eslint-disable-next-line no-alert
            alert(err?.response?.data?.message ?? 'Something went wrong');
        }
    };

    return (
        <>
            <Loader open={isLoading} />

            <AddForm forceUpdate={forceUpdate} />

            {withTab(
                Object.keys(apiData),
                Object.keys(apiData).map((type) => {
                    const MusicComponent: React.FC = (): React.ReactElement => {
                        const data: {
                            _id: string;
                            name: string;
                            category: string;
                            subType: string;
                            image: string;
                            mp3: string;
                            musicKey: string;
                        }[] = apiData[type];

                        const rows = data.map((d) =>
                            createData(
                                // eslint-disable-next-line no-underscore-dangle
                                d._id,
                                d.image,
                                d.category,
                                d.subType,
                                d.name,
                                d.mp3,
                                d.musicKey
                            )
                        );

                        return (
                            <TableContainer
                                component={Paper}
                                key={type}
                                style={{ marginBottom: 50 }}
                            >
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Music</StyledTableCell>
                                            <StyledTableCell align="right">Delete</StyledTableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {rows.map((row) => (
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell component="th" scope="row">
                                                    <MusicCard
                                                        image={row.image}
                                                        subType={row.subType}
                                                        name={row.name}
                                                        mp3={row.mp3}
                                                    />
                                                </StyledTableCell>

                                                <StyledTableCell align="right">
                                                    <DeleteForeverIcon
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
                        );
                    };

                    return MusicComponent;
                }),
                '#4b87aa'
            )}
        </>
    );
};

export default DataTable;
