import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const Agregar = ({add}) => {

    return (
        <Fab color="primary" aria-label="add" style={{margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed'}} onClick={add}>
            <AddIcon />
        </Fab>
    );
}

export default Agregar;