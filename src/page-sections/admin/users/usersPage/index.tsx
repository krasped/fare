import { SetStateAction, SyntheticEvent, useEffect, useState } from "react";
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
import SearchArea from "../usersPage/SearchArea";
import HeadingArea from "../usersPage/HeadingArea";
import UserTableRow from "../usersPage/UserTableRow";
import UserTableHead from "../usersPage/UserTableHead";
// CUSTOM DEFINED HOOK
import useMuiTable, { getComparator, stableSort } from "@/hooks/useMuiTable";
// CUSTOM DUMMY DATA
import { USER_LIST } from "@/__fakeData__/users";
import { H6, Paragraph } from "@/components/typography";
import { Roles } from "@/components/auth/RoleBasedGuard";
import { BigModal } from "@/components/modal";
import { Close } from "@mui/icons-material";
import ProfilePageView from "../viewUser";
import { StrNum } from "@/models/common";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchAgencies, fetchUsers } from "@/redux/admin/usersSlice";

export type SubscriptionType= "Free Trial" | "Basic" | "Standard" | "Premium"

export enum Statuses {
  pending = "Pending",
  active = "Active",
  inactive = "Inactive",
}

export interface User {
  user_id: StrNum;
  avatar?: string;
  username: string;
  agentName: string
  email: string;
  agency_name: string;
  phone: string
  agency: string
  parentAgency?: string
  role: string //Roles
  user_status: "Active" | "Inactive" | "Pending"
  documentsComplete?: boolean
  plan: SubscriptionType
  subscriptionExpiry?: string
  documentsStatus?: {
    complete: boolean
    missingDocs?: string[]
  }
  approvalStatus?: "Pending" | "Approved" | "Rejected"
}

// const mockUsers: User[] = [
//   {
//     id: "1",
//     agentName: "John Doe",
//     email: "john@example.com",
//     phone: "+1 234 567 8900",
//     agency: "Top Realty",
//     parentAgency: "Premier Group",
//     role: "Agent",
//     status: "Active",
//     documentsComplete: true,
//     subscriptionType: "Standard",
//     subscriptionExpiry: "2024-12-31",
//     documentsStatus: {
//       complete: true
//     },
//     approvalStatus: "Approved"
//   },
//   {
//     id: "2",
//     agentName: "Jane Smith",
//     email: "jane@example.com",
//     phone: "+1 234 567 8901",
//     agency: "Best Homes",
//     parentAgency: "Premier Group",
//     role: "Manager",
//     status: "Active",
//     documentsComplete: false,
//     subscriptionType: "Basic",
//     subscriptionExpiry: "2024-06-30",
//     documentsStatus: {
//       complete: false,
//       missingDocs: ["License", "Insurance"]
//     },
//     approvalStatus: "Pending"
//   },
// ]

const Users = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.users);

  // const [users, setUsers] = useState([...USER_LIST]);
  const [userFilter, setUserFilter] = useState({ subscriptionType: "", search: "", role: "", agency: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openViewUser, setOpenViewUser] = useState(false);
  const [data1, setData] = useState<User>();

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

  const handleEditUser = (user: User) => {
    setData(user)
    setIsEdit(true);
    setOpenModal(true);
  }
  const handleViewProfileDetailsUser = (user: User) => {
    setData(user)
    setIsEdit(false);
    setOpenViewUser(true);
  }

  const filteredUsers = stableSort(data.users, getComparator(order, orderBy)).filter(
    (item) => {
      return (
        (userFilter.subscriptionType ? item.plan === userFilter.subscriptionType : true) &&
        (userFilter.role ? item?.role?.toLocaleLowerCase() == userFilter?.role : true ) && 
        (userFilter.agency ? item?.agency_name?.toLocaleLowerCase() == userFilter?.agency : true ) && 
        (userFilter.search ?
          item.username.toLowerCase().includes(userFilter.search.toLowerCase()) ||
          item.email.toLowerCase().includes(userFilter.search.toLowerCase()) ||
          item.agency.toLowerCase().includes(userFilter.search.toLowerCase())
          : true )
      
      )
      // else if (userFilter.search)
      //   return item.name
      //     .toLowerCase()
      //     .includes(userFilter.search.toLowerCase());
      // else return true;
    },
  );

  const handleDeleteUser = (id: StrNum) => {
    // setUsers((state) => state.filter((item) => item.id !== id));
  };

  const handleAllUserDelete = () => {
    // setUsers((state) => state.filter((item) => !selected.includes(item.id)));
    // handleSelectAllRows([])();
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch<any>(fetchUsers());
      dispatch<any>(fetchAgencies());
    }
  }, [dispatch, status]);

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

            <ProfilePageView data={data1} />
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
                  filteredUsers.map((row) => row.user_id.toString()),
                )}
              />

              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <UserTableRow
                      key={user.user_id}
                      user={user}
                      isSelected={isSelected(user.user_id.toString())}
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

export default Users;