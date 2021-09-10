import React, { Component } from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
class ItemTypeFood extends Component {
    btnTapped(e, setestado) {
        setestado(e)
    }
    render() {

        return (
            <TableRow key={this.props.element.slug} onClick={(e) => this.btnTapped(this.props.element, this.props.setestado)}>
                <TableCell component="th" scope="row">{this.props.element.name}</TableCell>
                <TableCell align="center">{this.props.element.slug}</TableCell>
            </TableRow>
        );
    }
}

export default ItemTypeFood;

