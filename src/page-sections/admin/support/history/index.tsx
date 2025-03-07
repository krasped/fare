import { Box, Button, Card, Grid, IconButton, Table, TableBody, TableContainer, TablePagination } from "@mui/material";
// CUSTOM PAGE SECTION COMPONENTS
import { H6, Paragraph } from "@/components/typography";
import FromLastMonth from "../FromLastMonth";
import { FlexBox } from "@/components/flexbox";
import { Close, DownloadOutlined } from "@mui/icons-material";
import { useSnackbar } from "@/contexts/snackbarContext";
import { SyntheticEvent, useState } from "react";
import useMuiTable, { getComparator, stableSort } from "@/hooks/useMuiTable";
import { Scrollbar } from "@/components/scrollbar";
import { TableDataNotFound } from "@/components/table";
import SearchArea, { ResolutionStatus, TicketCategory, TicketPriority, TicketStatus } from "./SearchArea";
import HeadingArea from "./HeadingArea";
import UserTableHead from "./UserTableHead";
import UserTableRow from "./UserTableRow";
import { Modal } from "@/components/modal";
import ViewTicketForm from "./ViewHistoryForm";

export interface Ticket {
  id: string;
  submittedBy: {
    name: string;
    email: string;
  };
  subject: string;
  priority: TicketPriority;
  status: TicketStatus;
  lastUpdated: string;
  assignedTo?: string;
  description?: string;
  attachments?: string[];
  createdAt: string;
  lastReplyAt?: string;
  closedAt?: string;
  category?: TicketCategory;
  resolvedBy?: string;
  resolutionStatus?: ResolutionStatus;
  resolutionDetails?: string;
}

const mockTickets: Ticket[] = [
  {
    id: "TK-001",
    submittedBy: {
      name: "John Doe",
      email: "john@example.com"
    },
    subject: "Cannot access my dashboard",
    priority: "High",
    status: "Open",
    lastUpdated: "2024-03-20T10:00:00Z",
    createdAt: "2024-03-20T10:00:00Z",
    category: "Technical Issue",
  },
  {
    id: "TK-002",
    submittedBy: {
      name: "Jane Smith",
      email: "jane@example.com"
    },
    subject: "Login issues after password reset",
    priority: "Medium",
    status: "Resolved",
    lastUpdated: "2024-03-19T15:30:00Z",
    assignedTo: "agent1",
    createdAt: "2024-03-19T15:30:00Z",
    closedAt: "2024-03-19T16:30:00Z",
    category: "Account Access",
    resolvedBy: "Sarah Wilson",
    resolutionStatus: "Resolved Successfully",
    resolutionDetails: "Reset user password and verified login access",
  },
  {
    id: "TK-003",
    submittedBy: {
      name: "Mike Johnson",
      email: "mike@example.com"
    },
    subject: "Need help with subscription upgrade",
    priority: "Low",
    status: "Resolved",
    lastUpdated: "2024-03-18T09:15:00Z",
    assignedTo: "agent2",
    createdAt: "2024-03-18T09:15:00Z",
    closedAt: "2024-03-18T11:15:00Z",
    category: "Payment Issue",
    resolvedBy: "Mike Chen",
    resolutionStatus: "Resolved Successfully",
    resolutionDetails: "Helped user upgrade to premium plan",
  },
]

const TicketHistory = () => {
  const showSnackbar = useSnackbar();
  const [users, setUsers] = useState([...mockTickets]);
  const [compaignFilter, setCompaignFilter] = useState({ status: "", search: "", priority: "" });
  // const [isEdit, setIsEdit] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  const [openViewUser, setOpenViewUser] = useState(false);
  const [data, setData] = useState<Ticket>();

  const handleCloseModal = ()=> setOpenViewUser(false)

  const {
    page,
    order,
    orderBy,
    selected,
    isSelected,
    rowsPerPage,
    handleSelectRow,
    handleChangePage,
    handleRequestSort,
    handleSelectAllRows,
    handleChangeRowsPerPage,
  } = useMuiTable({ defaultOrderBy: "name" });

  const handleChangeFilter = (key: string, value: string) => {
    setCompaignFilter((state) => ({ ...state, [key]: value }));
  };

  const handleChangeTab = (_: SyntheticEvent, newValue: string) => {
    handleChangeFilter("subscriptionType", newValue);
  };

  const handleViewProfileDetailsUser = (user: Ticket) => {
    setData(user)
    // setIsEdit(false);
    setOpenViewUser(true);
  }
  const filteredUsers = stableSort(users, getComparator(order, orderBy)).filter(
    (item) => {
      return (
        (compaignFilter.status ? item.status.toLowerCase() === compaignFilter.status : true) &&
        (compaignFilter.priority ? item.priority.toLocaleLowerCase() == compaignFilter.priority : true) &&
        (compaignFilter.search ?
          item.id.toLowerCase().includes(compaignFilter.search.toLowerCase()) ||
          item.subject.toLowerCase().includes(compaignFilter.search.toLowerCase())||
          item.submittedBy.email.toLowerCase().includes(compaignFilter.search.toLowerCase())
          : true)

      )
      // else if (userFilter.search)
      //   return item.name
      //     .toLowerCase()
      //     .includes(userFilter.search.toLowerCase());
      // else return true;
    },
  );

  const handleDeleteUser = (id: string) => {
    setUsers((state) => state.filter((item) => item.id !== id));
  };

  const handleAllUserDelete = () => {
    setUsers((state) => state.filter((item) => !selected.includes(item.id)));
    handleSelectAllRows([])();
  };
  
  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Grid item lg={4} sm={6} xs={12}>
          <FromLastMonth name={"Total Resolved"} isPercentage={false} number={324} description="All resolved tickets" />
        </Grid>

        <Grid item lg={4} sm={6} xs={12}>
          <FromLastMonth name={"Resolution Time"} isPercentage={false} string={"4.2h"} description="Average resolution time"/>
        </Grid>

        <Grid item lg={4} sm={6} xs={12}>
          <FromLastMonth name={"Escalation Rate"} isPercentage={false} string={"8%"} description="Tickets requiring escalation"/>
        </Grid>
       
      </Grid>
      <Box mt={3}>
        <Card >
          <Box px={2} pt={2}>
            <HeadingArea />

            {/* <SearchArea
              filter={compaignFilter}
              handleChangeFilter={handleChangeFilter}
            /> */}
          </Box>

          <TableContainer>
            <Scrollbar autoHide={false}>
              <Table>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  numSelected={selected.length}
                  rowCount={filteredUsers.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllRows={handleSelectAllRows(
                    filteredUsers.map((row) => row.id),
                  )}
                />

                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <UserTableRow
                        key={user.id}
                        user={user}
                        isSelected={isSelected(user.id)}
                        handleSelectRow={handleSelectRow}
                        handleDeleteUser={handleDeleteUser}
                        // handleEditUser={handleEditUser}
                        handleViewProfileDetailsUser={handleViewProfileDetailsUser}
                      />
                    ))}

                  {filteredUsers.length === 0 && <TableDataNotFound />}
                </TableBody>
              </Table>
              <Modal open={openViewUser} handleClose={handleCloseModal}>
                <IconButton
                  aria-label="close"
                  onClick={() => handleCloseModal()}
                  sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                  })}
                >
                  <Close />
                </IconButton>
                <ViewTicketForm
                  handleClose={handleCloseModal}
                  data={data}
                />
              </Modal>
            </Scrollbar>
          </TableContainer>

          {/* PAGINATION SECTION */}
          <Box padding={1}>
            <TablePagination
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={filteredUsers.length}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default TicketHistory;
