import { Box, Card, Grid, Table, TableBody, TableContainer, TablePagination } from "@mui/material";
// CUSTOM PAGE SECTION COMPONENTS
import Order from "../StatCard";
import StatCard from "../StatCard";
import { H6, Paragraph } from "@/components/typography";
import HeadingArea from "../HeadingArea";
import SearchArea from "../SearchArea";
import { BigModal } from "@/components/modal";
import { TableDataNotFound, TableToolbar } from "@/components/table";
import { Scrollbar } from "@/components/scrollbar";
import UserTableHead from "../UserTableHead";
import UserTableRow from "../UserTableRow";
import { SyntheticEvent, useState } from "react";
import useMuiTable, { getComparator, stableSort } from "@/hooks/useMuiTable";

export enum Statuses {
  pending = "pending",
  active = "active",
  inactive = "inactive",
}

export interface Campaign {
  id: string;
  name: string;
  headline: string;
  description: string;
  targetDestination: string;
  startDate: string;
  endDate: string;
  displayPlatforms: string[];
  totalAds: number;
  status: string;
  createdBy: string;
  platform: string;
  createdAt: string;
}

const campaigns = [
  {
    id: "CAM001",
    name: "Summer Sale 2024",
    createdBy: "john.doe@example.com",
    platform: "Facebook",
    status: "pending",
    createdAt: "2024-03-15",
    totalAds: 5,
    headline: "Biggest Summer Sale Ever!",
    description: "Get up to 70% off on all summer essentials",
    targetDestination: "USA, UK, Canada",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    displayPlatforms: ["Facebook", "Instagram"],
    assets: [
      { id: 1, type: "image", url: "summer-sale-1.jpg" },
      { id: 2, type: "video", url: "promo-video.mp4" },
    ],
  },
  {
    id: "CAM002",
    name: "Product Launch",
    createdBy: "jane.smith@example.com",
    platform: "Instagram",
    status: "active",
    createdAt: "2024-03-14",
    totalAds: 3,
    headline: "Exciting New Product Launch!",
    description: "Join us for the launch of our latest product.",
    targetDestination: "USA",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    displayPlatforms: ["Instagram", "Facebook"],
    assets: [
      { id: 1, type: "image", url: "product-launch-1.jpg" },
    ],
  },
  {
    id: "CAM003",
    name: "Holiday Special",
    createdBy: "mark.wilson@example.com",
    platform: "Google",
    status: "inactive",
    createdAt: "2024-03-13",
    totalAds: 4,
    headline: "Holiday Special Discounts!",
    description: "Get ready for the holidays with our special discounts.",
    targetDestination: "Global",
    startDate: "2024-11-01",
    endDate: "2024-12-31",
    displayPlatforms: ["Google", "YouTube"],
    assets: [
      { id: 1, type: "image", url: "holiday-special-1.jpg" },
    ],
  },
];

const users = [
  { id: 1, email: "john.doe@example.com" },
  { id: 2, email: "jane.smith@example.com" },
  { id: 3, email: "mark.wilson@example.com" },
  { id: 4, email: "sarah.parker@example.com" },
];

const LeadsPageView = () => {
  const [users, setUsers] = useState([...campaigns]);
  const [compaignFilter, setCompaignFilter] = useState({ status: "", search: "", platform: "", createdBy: "" });
  // const [isEdit, setIsEdit] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  const [openViewUser, setOpenViewUser] = useState(false);
  const [data, setData] = useState<Campaign>();

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

  // const handleEditUser = (user: Campaign) => {
  //   setData(user)
  //   setIsEdit(true);
  //   setOpenModal(true);
  // }
  const handleViewProfileDetailsUser = (user: Campaign) => {
    setData(user)
    // setIsEdit(false);
    setOpenViewUser(true);
  }

  const filteredUsers = stableSort(users, getComparator(order, orderBy)).filter(
    (item) => {
      return (
        (compaignFilter.createdBy ? item.createdBy.toLowerCase() === compaignFilter.createdBy : true) &&
        (compaignFilter.platform ? item.platform.toLocaleLowerCase() == compaignFilter.platform : true ) && 
        (compaignFilter.status ? item.status.toLocaleLowerCase() == compaignFilter.status : true ) && 
        (compaignFilter.search ?
          item.name.toLowerCase().includes(compaignFilter.search.toLowerCase()) ||
          item.createdBy.toLowerCase().includes(compaignFilter.search.toLowerCase()) 
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
      <H6 fontSize={18}>Marketing Campaigns</H6>
      <Paragraph color="text.secondary" mb={3}>
        Manage and approve marketing campaigns
      </Paragraph>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xs={12}>
          <StatCard name={"Total Campaigns"} value={"24"} description={"All active and inactive campaigns"} />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <StatCard name={"Live"} value={"4/10"} description={"Currently running campaigns"} />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <StatCard name={"Waiting Approval"} value={"3"} description={"Campaigns pending review"} />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <StatCard name={"Total Ads"} value={"156"} description={"Across all campaigns"} />
        </Grid>

      </Grid>

      <Box mt={3}>
        <Card >
          <Box px={2} pt={2}>
            <HeadingArea/>

            <SearchArea
              filter={compaignFilter}
              handleChangeFilter={handleChangeFilter}
            />
            <BigModal open={openViewUser} handleClose={() => setOpenViewUser(false)}>
              {/* <ViewUser setOpenModal={setOpenViewUser} data={data}/> */}
            </BigModal>
          </Box>

          {/* TABLE ROW SELECTION HEADER  */}
          {/* {selected.length > 0 && (
            <TableToolbar
              selected={selected.length}
              handleDeleteRows={handleAllUserDelete}
            />
          )} */}

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
                        // handleEditUser={handleEditUser}
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
    </Box>
  );
};

export default LeadsPageView;
