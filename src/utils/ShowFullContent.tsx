import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

interface Props {
    title: string;
    content: string | any;
}

const ShowFullContent: React.FC<Props> = ({ title, content }): React.ReactElement => {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<'paper' | 'body'>('paper');

    const handleClickOpen = (scrollType: 'paper' | 'body') => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        if (open) {
            if (descriptionElementRef.current) {
                descriptionElementRef.current.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Button
                color="primary"
                size="small"
                style={{ margin: 0, padding: 0, textTransform: 'unset', display: 'inline' }}
                onClick={handleClickOpen('body')}
            >
                See full content
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                maxWidth="xl"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {content}
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

export default ShowFullContent;
