import { FormControlLabel, FormLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';

interface Props {
    availableDays: string[];
    setVisitingDays: React.Dispatch<React.SetStateAction<string[]>>;
}

const EditVisitingDays: React.FC<Props> = ({
    availableDays,
    setVisitingDays,
}): React.ReactElement => {
    const [open, setOpen] = React.useState(false);

    const [date, setDate] = useState({
        saturday: availableDays.includes('saturday'),
        sunday: availableDays.includes('sunday'),
        monday: availableDays.includes('monday'),
        tuesday: availableDays.includes('tuesday'),
        wednesday: availableDays.includes('wednesday'),
        thursday: availableDays.includes('thursday'),
        friday: availableDays.includes('friday'),
    });

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate((prev) => ({ ...prev, [event.target.name]: event.target.checked }));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDone = () => {
        // @ts-ignore
        const days = Object.keys(date).filter((day) => date[day]);
        setVisitingDays(days);
        setOpen(false);
    };

    return (
        <div>
            <Button
                color="primary"
                size="small"
                variant="text"
                style={{ paddingLeft: 0, paddingRight: 0, textTransform: 'none' }}
                onClick={handleClickOpen}
            >
                Edit
            </Button>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-slide-title">Edit Days</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <form noValidate>
                            <FormLabel component="div" style={{ marginTop: 25 }}>
                                Select Date
                            </FormLabel>

                            {Object.keys(date).map((day) => (
                                <FormControlLabel
                                    key={day}
                                    value={day}
                                    control={
                                        <Checkbox
                                            name={day}
                                            // @ts-ignore
                                            checked={date[day]}
                                            onChange={handleDateChange}
                                        />
                                    }
                                    label={day}
                                    labelPlacement="end"
                                />
                            ))}
                        </form>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleDone} color="primary">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditVisitingDays;
