import { SetStateAction, SyntheticEvent, useState } from "react";
import {
  Box,
  Card,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
// CUSTOM COMPONENTS
import { Scrollbar } from "@/components/scrollbar";
import { TableDataNotFound, TableToolbar } from "@/components/table";
// CUSTOM PAGE SECTION COMPONENTS
import SearchArea from "../documentsPage/SearchArea";
import HeadingArea from "../documentsPage/HeadingArea";
import UserTableRow from "../documentsPage/UserTableRow";
import UserTableHead from "../documentsPage/UserTableHead";
// CUSTOM DEFINED HOOK
import useMuiTable, { getComparator, stableSort } from "@/hooks/useMuiTable";
// CUSTOM DUMMY DATA
import { USER_LIST } from "@/__fakeData__/users";
import { H6, Paragraph } from "@/components/typography";
import { Roles } from "@/components/auth/RoleBasedGuard";
import { BigModal } from "@/components/modal";
import { Close } from "@mui/icons-material";
import ProfilePageView from "../viewUser";

export type SubscriptionType= "Basic" | "Professional" | "Enterprise"

export enum DocumentStatuses {
  approved = "approved",
  notApproved = "not approved",
  waiting = "waiting for approvall",
  missing = "documents missing",
}

export interface UserDocuments {
  id: string
  agentName: string;
  agencyName: string;
  documentProvided: string;
  email: string;
  status: DocumentStatuses;
}

const mockUsers: UserDocuments[] = [
  {
    id: "1",
    agentName: "John Doe",
    agencyName: "Top Realty",
    documentProvided: "3/5",
    email: "john@example.com",
    status: DocumentStatuses.approved,
  },
  {
    id: "2",
    agentName: "Jane Smith",
    agencyName: "Best Homes",
    documentProvided: "2/5",
    email: "john@example.com",
    status: DocumentStatuses.waiting,
    
  },
]

const UsersDocuments = () => {
  const [users, setUsers] = useState([...mockUsers]);
  const [userFilter, setUserFilter] = useState({ subscriptionType: "", search: "", status: "", agency: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openViewUser, setOpenViewUser] = useState(false);
  const [data, setData] = useState<UserDocuments>();

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
    setUserFilter((state) => ({ ...state, [key]: value }));
  };

  const handleChangeTab = (_: SyntheticEvent, newValue: string) => {
    handleChangeFilter("subscriptionType", newValue);
  };

  const handleEditUser = (user: UserDocuments) => {
    setData(user)
    setIsEdit(true);
    setOpenModal(true);
  }
  const handleViewProfileDetailsUser = (user: UserDocuments) => {
    setData(user)
    setIsEdit(false);
    setOpenViewUser(true);
  }

  const filteredUsers = stableSort(users, getComparator(order, orderBy)).filter(
    (item) => {
      return (
        // (userFilter.subscriptionType ? item.subscriptionType.toLowerCase() === userFilter.subscriptionType : true) &&
        (userFilter.status ? item.status.toLocaleLowerCase() == userFilter.status : true ) && 
        // (userFilter.agency ? item.agency.toLocaleLowerCase() == userFilter.agency : true ) && 
        (userFilter.search ?
          item.agentName.toLowerCase().includes(userFilter.search.toLowerCase()) ||
          item.email.toLowerCase().includes(userFilter.search.toLowerCase()) 
          // item.agency.toLowerCase().includes(userFilter.search.toLowerCase())
          : true )
      
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
      <Card>
        <Box px={2} pt={2}>
          <HeadingArea value={userFilter.subscriptionType} 
            changeTab={handleChangeTab} 
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            openModal={openModal}
            setOpenModal={setOpenModal}
            data={data}
          />

          <SearchArea
            filter={userFilter}
            handleChangeFilter={handleChangeFilter}
          />
          <BigModal open={openViewUser} handleClose={() => setOpenViewUser(false)}>
          <IconButton
                  aria-label="close"
                  onClick={() => setOpenViewUser(false)}
                  sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                  })}
                >
                  <Close />
                </IconButton>

            <ProfilePageView onlyDocuments={true} data={data} />
          </BigModal>
        </Box>

        {/* TABLE ROW SELECTION HEADER  */}
        {selected.length > 0 && (
          <TableToolbar
            selected={selected.length}
            handleDeleteRows={handleAllUserDelete}
          />
        )}

        {/* TABLE HEAD & BODY ROWS */}
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
                      handleEditUser={handleEditUser}
                      handleViewProfileDetailsUser={handleViewProfileDetailsUser}
                    />
                  ))}

                {filteredUsers.length === 0 && <TableDataNotFound />}
              </TableBody>
            </Table>
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
  );
};

export default UsersDocuments;