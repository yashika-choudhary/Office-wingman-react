import { useState, forwardRef } from "react";
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

const ModalContent = styled('div')(
    ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

function Row({ key, row }) {

    const [open, setOpen] = useState(false);
    const [isViewSummary, setIsViewSummary] = useState(false);
    const [openBotView, setOpenBotView] = useState(false);
    const [openMeetingNotes, setOpenMeetingNotes] = useState(false);

    const onViewMeetingSummary = () => {
        setIsViewSummary(true);
    }

    const onCloseMeetingSummary = () => {
        setIsViewSummary(false);
    }

    const openDelegateToBot = () => {
        setOpenBotView(true);
    }

    const closeDelegateToBot = () => {
        setOpenBotView(false);
    }

    const onOpenMeetingNotes = () => {
        setOpenMeetingNotes(true);
    }

    const onCloseMeetingNotes = () => {
        setOpenMeetingNotes(false);
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell className="table-arrow" align="center">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className="table-data" component="th" scope="row" align="left">
                    {row.starttime}
                </TableCell>
                <TableCell className="table-subject table-data" align="left">{row.subject}</TableCell>
                <TableCell className="table-data" align="left">{row.sender}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <div className="box-content">
                                <div className="collapsed-content">
                                    <button onClick={onViewMeetingSummary} className="btn">
                                        View meeting summary
                                    </button>

                                </div>
                                <div className="collapsed-content">
                                    <button onClick={openDelegateToBot} className="btn1">
                                        Delegate to bot
                                    </button>

                                </div>
                                <div className="collapsed-content collapse-content-right">
                                    <button onClick={onOpenMeetingNotes} className="btn2">
                                        Meeting notes
                                    </button>
                                </div>
                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            {/*view meeting summary*/}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isViewSummary}
                onClose={onCloseMeetingSummary}
                closeAfterTransition
                slots={{ backdrop: StyledBackdrop }}
            >
                <Fade in={isViewSummary}>
                    <ModalContent sx={style}>
                        <Header heading={row.subject} />
                        <div className="modal-content">
                            <div className="modal-content-flex">
                                <h6>Sender</h6>
                                <p>{row.sender}</p>
                            </div>
                            <div className="modal-content-flex">
                                <h6>Time</h6>
                                <p>{row.starttime}</p>
                            </div>
                            <div className="detail">
                                <span className="detail-head">Details</span>
                                {/* Fetch from api */}
                                <span className="detail-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
                            </div>
                            <div className="modal-content-flex">
                                <h6>Status</h6>
                                {/* Fetch from api */}
                                <p>Pending</p>
                            </div>
                        </div>
                    </ModalContent>
                </Fade>
            </Modal>

            {/*view delegate bot*/}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openBotView}
                onClose={closeDelegateToBot}
                closeAfterTransition
                slots={{ backdrop: StyledBackdrop }}
            >
                <Fade in={openBotView}>
                    <ModalContent sx={style}>
                        <div className="modal-content modal-content-bot">
                            <h3>Allow OB to join the call ?</h3>
                            <div className="action-btn">
                                <button onClick={closeDelegateToBot} className="action-btn-no">No</button>
                                <button className="action-btn-yes">Yes</button>
                            </div>
                        </div>
                    </ModalContent>
                </Fade>
            </Modal>

            {/*view meeting summary*/}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openMeetingNotes}
                onClose={onCloseMeetingNotes}
                closeAfterTransition
                slots={{ backdrop: StyledBackdrop }}
            >
                <Fade in={openMeetingNotes}>
                    <ModalContent sx={style}>
                            <Header heading="Meeting Notes" />
                            <div className="modal-content">
                                <div className="modal-content-flex">

                                    <ol>
                                        <li> Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                                        <li> Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                                        <li> Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                                        <li> Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                                        <li> Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>

                                    </ol>

                                </div>
                            </div>
                    </ModalContent>
                </Fade>
            </Modal>

        </>
    );
}

function CustomTable({ rows }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell className="table-heading" align="left">Time</TableCell>
                            <TableCell className="table-heading" align="left">Meeting</TableCell>
                            <TableCell className="table-heading" align="left">Sender</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <Row key={row.name} row={row} />
                        ))}

                    </TableBody>
                    <TableFooter>
                        <CustomTablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={5}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                                select: {
                                    'aria-label': 'rows per page',
                                },
                                actions: {
                                    showFirstButton: true,
                                    showLastButton: true,
                                    slots: {
                                        firstPageIcon: FirstPageRoundedIcon,
                                        lastPageIcon: LastPageRoundedIcon,
                                        nextPageIcon: ChevronRightRoundedIcon,
                                        backPageIcon: ChevronLeftRoundedIcon,
                                    },
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>


        </>
    )
}

export default CustomTable