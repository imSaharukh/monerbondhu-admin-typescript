import React from 'react';
import AppLayout from '../../container/appLayout/AppLayout';
import withTab from '../../container/tabLayout/TabLayout';
import Designation from './designation/Designation';
import Service from './service/Service';

const DesignationAndService = () => (
    <AppLayout dawerOpen consultantOpen>
        {withTab(['Designations', 'Services'], [Designation, Service])}
    </AppLayout>
);

export default DesignationAndService;
