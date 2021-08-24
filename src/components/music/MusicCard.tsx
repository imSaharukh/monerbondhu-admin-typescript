import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

interface Props {
    image: string;
    subType: string;
    name: string;
    mp3: string;
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
    cover: {
        width: 300,
    },
}));

const MusicCard: React.FC<Props> = ({ image, subType, name, mp3 }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.cover} image={image} title={name} />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {subType}
                    </Typography>
                </CardContent>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <audio controls style={{ width: '100%' }} src={mp3}>
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            </div>
        </Card>
    );
};

export default MusicCard;
