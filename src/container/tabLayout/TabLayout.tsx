/* eslint-disable react/jsx-props-no-spreading */
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel: React.FC<TabPanelProps> = ({
    children,
    value,
    index,
    ...other
}): React.ReactElement => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && (
            <Box p={3}>
                <Typography>{children}</Typography>
            </Box>
        )}
    </div>
);

const a11yProps = (index: any) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
});

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

// eslint-disable-next-line no-undef
const withTab = (tabNames: string[], Components: React.FC[], color: string = '#566474') => {
    const TabLayout: React.FC = (): React.ReactElement => {
        const classes = useStyles();
        const [value, setValue] = useState(0);

        const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
            setValue(newValue);
        };

        return (
            <div className={classes.root}>
                <AppBar position="static" style={{ backgroundColor: color }}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        {tabNames.map((name, idx) => (
                            <Tab key={name} label={name} {...a11yProps(idx)} />
                        ))}
                    </Tabs>
                </AppBar>
                {Components.map((SingleComponent, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <TabPanel key={idx} value={value} index={idx}>
                        <SingleComponent />
                    </TabPanel>
                ))}
            </div>
        );
    };

    return <TabLayout />;
};

export default withTab;
