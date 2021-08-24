import { Card, CardActionArea, CardMedia, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import Avatar from '../../assets/Avatar.jpg';

interface Props {
    name: string;
    image: string;
}

const useStyles = makeStyles({
    root: {
        width: 450,
    },
    media: {
        height: 350,
        maxWidth: '100%',
    },
});

const Image: React.FC<Props> = ({ name, image }): React.ReactElement => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<'body' | 'paper'>('paper');

    const handleClickOpen = (scrollType: 'body' | 'paper') => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        if (open) {
            if (descriptionElementRef && descriptionElementRef.current) {
                descriptionElementRef.current.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Button
                color="primary"
                size="medium"
                style={{ margin: 0, padding: 0, textTransform: 'unset', display: 'inline' }}
                onClick={handleClickOpen('body')}
            >
                <img src={image || Avatar} alt="" width="100px" height="100px" />
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{name}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={image || Avatar}
                                    title="Product"
                                />
                            </CardActionArea>
                        </Card>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Image;
