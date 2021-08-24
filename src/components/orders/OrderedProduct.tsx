import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    makeStyles,
    // eslint-disable-next-line prettier/prettier
    Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import Avatar from '../../assets/Avatar.jpg';

interface Props {
    product: {
        _id: string;
        name: string;
        dis: string;
        price: number | string;
        image: string;
    };
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: 450,
    },
    media: {
        height: 250,
    },
});

const OrderedProduct: React.FC<Props> = ({ product }): React.ReactElement => {
    const classes = useStyles();

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
                size="medium"
                style={{ margin: 0, padding: 0, textTransform: 'unset', display: 'inline' }}
                onClick={handleClickOpen('body')}
            >
                <img src={product.image} alt="" width="100px" height="100px" />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Ordered Product</DialogTitle>
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
                                    image={product.image || Avatar}
                                    title="Product"
                                />

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {product.name}
                                    </Typography>

                                    <Typography>
                                        <Typography
                                            variant="h6"
                                            color="textPrimary"
                                            style={{ fontSize: 16, display: 'inline-block' }}
                                        >
                                            Price:
                                        </Typography>{' '}
                                        {product.price} <br />
                                        <Typography
                                            variant="h6"
                                            color="textPrimary"
                                            style={{ fontSize: 16, display: 'inline-block' }}
                                        >
                                            Description:
                                        </Typography>{' '}
                                        {product.dis}
                                    </Typography>
                                </CardContent>
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

export default OrderedProduct;
