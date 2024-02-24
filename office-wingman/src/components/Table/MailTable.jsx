import { useState, forwardRef } from "react";
import React from 'react';
import axios from "axios";
import "./table.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import { TableFooter } from "@mui/material";
import { styled } from '@mui/system';
import {
    TablePagination,
    tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Modal as BaseModal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import { css } from '@mui/system';
import PropTypes from 'prop-types';
import Header from "../Header/Header";
// import handleOpenClick from "../../content/mail/MailReviews";

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const blue = {
    50: '#F0F7FF',
    200: '#A5D8FF',
    400: '#3399FF',
    900: '#003A75',
};

const Backdrop = forwardRef((props, ref) => {
    const { open, ...other } = props;
    return (
        <Fade in={open}>
            <div ref={ref} {...other} />
        </Fade>
    );
});

Backdrop.propTypes = {
    open: PropTypes.bool,
};

const CustomTablePagination = styled(TablePagination)(

    ({ theme }) => `
    & .${classes.spacer} {
      display: none;
    }
  
    & .${classes.toolbar}  {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      padding: 4px 0;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
    }
  
    & .${classes.select}{
      font-family: 'IBM Plex Sans', sans-serif;
      padding: 2px 0 2px 4px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      border-radius: 6px; 
      background-color: transparent;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      transition: all 100ms ease;
  
      &:hover {
        background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      }
  
      &:focus {
        outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
        border-color: ${blue[400]};
      }
    }
  
    & .${classes.displayedRows} {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .${classes.actions} {
      display: flex;
      gap: 6px;
      border: transparent;
      text-align: center;
    }
  
    & .${classes.actions} > button {
      display: flex;
      align-items: center;
      padding: 0;
      border: transparent;
      border-radius: 50%;
      background-color: transparent;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      transition: all 120ms ease;
  
      > svg {
        font-size: 22px;
      }
  
      &:hover {
        background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      }
  
      &:focus {
        outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
        border-color: ${blue[400]};
      }
  
      &:disabled {
        opacity: 0.3;
        &:hover {
          border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
          background-color: transparent;
        }
      }
    }
    `,
);

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
};


function CustomTable({ rows, handleOpenClick }) {
    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                            <TableCell className="table-heading" align="left">Sender</TableCell>
                            <TableCell className="table-heading" align="left">Subject</TableCell>
                            <TableCell className="table-heading" align="left">ETA</TableCell>
                            <TableCell className="table-heading" align="left">Action</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(0, 5).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell className="table-data" component="th" scope="row" align="left">{row.sender}</TableCell>
                                <TableCell className="table-subject table-data" align="left">{row.subject}</TableCell>
                                <TableCell className="table-data" align="left">{row.eta}</TableCell>
                                <TableCell><button onClick={() => handleOpenClick(index)}>Open</button></TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
}
export default CustomTable;

