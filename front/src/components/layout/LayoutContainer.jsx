import React, {Fragment} from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import DrawerContainer from '../drawer/DrawerContainer';

const LayoutContainer = ({children}) =>
    <Fragment>
        <CssBaseline />
        <Container maxWidth="xl" style={{backgroundColor: 'whitesmoke'}}>
            <DrawerContainer>
                {children}
            </DrawerContainer>
        </Container>
    </Fragment>;

export default LayoutContainer;
