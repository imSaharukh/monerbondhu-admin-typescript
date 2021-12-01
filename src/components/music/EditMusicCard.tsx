import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    // eslint-disable-next-line prettier/prettier
    TextField
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import ImageIcon from '@material-ui/icons/Image';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import React, { useState } from 'react';

interface Props {
    id: string;
    name: string;
    category: string;
    subType: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    setSubType: React.Dispatch<React.SetStateAction<string>>;
    setImage: React.Dispatch<React.SetStateAction<File | null>>;
    setMusic: React.Dispatch<React.SetStateAction<File | null>>;
    handleSubmit: (id: string) => Promise<void>;
    cancel: () => void;
}

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        // maxWidth: 'max-content',
        height: 175,
    },
    details: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
    },
    content: {
        flex: '1 0 auto',
    },
    textField: {
        '& > *': {
            fontSize: 13,
        },
    },
    button: {
        fontSize: 10,
        paddingLeft: 10,
    },
}));

const EditMusicCard: React.FC<Props> = ({
    id,
    name,
    category,
    subType,
    setName,
    setCategory,
    setSubType,
    setImage,
    setMusic,
    handleSubmit,
    cancel,
}) => {
    const classes = useStyles();

    const [open, setOpen] = useState(true);
    const [openCategory, setOpenCategory] = useState(false);
    const [openSubType, setOpenSubType] = useState(false);

    const handleClose = () => {
        setOpen(false);
        cancel();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 22 }}>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Music</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please fill up the form...</DialogContentText>

                    <TextField
                        autoFocus
                        error={!name}
                        helperText={!name ? 'Please add a name' : ''}
                        margin="dense"
                        name="name"
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <FormControl fullWidth error={!category}>
                        <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openCategory}
                            onClose={() => setOpenCategory(false)}
                            onOpen={() => setOpenCategory(true)}
                            value={category}
                            onChange={(e) => {
                                if (typeof e.target.value === 'string') {
                                    setCategory(e.target.value);
                                }
                            }}
                        >
                            {['meditation', 'music', 'stress', 'sleep'].map((c) => (
                                <MenuItem key={c} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </Select>
                        {category ? <FormHelperText>Please select a category</FormHelperText> : ''}
                    </FormControl>

                    <FormControl fullWidth error={!subType} style={{ marginBottom: 36 }}>
                        <InputLabel id="demo-controlled-open-select-label-2">Sub Type</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label-2"
                            id="demo-controlled-open-select-2"
                            open={openSubType}
                            onClose={() => setOpenSubType(false)}
                            onOpen={() => setOpenSubType(true)}
                            value={subType}
                            onChange={(e) => {
                                if (typeof e.target.value === 'string') {
                                    setSubType(e.target.value);
                                }
                            }}
                        >
                            {['free', 'paid'].map((sType) => (
                                <MenuItem key={sType} value={sType}>
                                    {sType}
                                </MenuItem>
                            ))}
                        </Select>
                        {!subType ? <FormHelperText>Please select a type</FormHelperText> : ''}
                    </FormControl>

                    <span>
                        <input
                            color="primary"
                            accept="image/*"
                            type="file"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setImage(e.target.files[0]);
                                }
                            }}
                            id="icon-button-file"
                            hidden
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="icon-button-file">
                            <Button
                                variant="contained"
                                component="span"
                                className={classes.button}
                                size="large"
                                fullWidth
                                color="primary"
                                endIcon={<ImageIcon />}
                                style={{ textTransform: 'capitalize', margin: 'unset' }}
                            >
                                Image
                            </Button>
                        </label>
                    </span>

                    <div style={{ marginTop: 10 }}>
                        <input
                            color="primary"
                            accept="audio/*"
                            type="file"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setMusic(e.target.files[0]);
                                }
                            }}
                            id="icon-button-file-2"
                            hidden
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="icon-button-file-2">
                            <Button
                                variant="contained"
                                component="span"
                                className={classes.button}
                                size="large"
                                fullWidth
                                color="secondary"
                                endIcon={<MusicNoteIcon />}
                                style={{ textTransform: 'capitalize', margin: 'unset' }}
                            >
                                Music
                            </Button>
                        </label>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleSubmit(id)} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditMusicCard;
