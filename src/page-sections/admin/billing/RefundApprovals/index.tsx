import { Box, Card, Grid, IconButton, Table, TableBody, TableContainer, TablePagination } from "@mui/material";
// CUSTOM PAGE SECTION COMPONENTS
import HeadingArea from "./HeadingArea";
import SearchArea from "./SearchArea";
import { Modal } from "@/components/modal";
import { TableDataNotFound, TableToolbar } from "@/components/table";
import { Scrollbar } from "@/components/scrollbar";
import RefundTableHead from "./RefundTableHead";
import RefundTableRow from "./RefundTableRow";
import { SyntheticEvent, useState } from "react";
import useMuiTable, { getComparator, stableSort } from "@/hooks/useMuiTable";
import RefundForm from "./RefundDetailsForm";
import { Close } from "@mui/icons-material";

export enum Statuses {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export interface Refund {
  id: string;
  agentName: string;
  amount: string;
  orderId: string;
  status: Statuses;
}

const refunds1: Refund[] = [
  { id: "REF-001", agentName: "John Doe", amount: "500", orderId: "ORD-001", status: Statuses.Pending },
  { id: "REF-002", agentName: "Jane Smith", amount: "750", orderId: "ORD-002", status: Statuses.Approved },
  { id: "REF-003", agentName: "Mike Johnson", amount: "250", orderId: "ORD-003", status: Statuses.Rejected },
];

const RefundApprovals = () => {
  const [refunds, setRefunds] = useState([...refunds1]);
  const [compaignFilter, setCompaignFilter] = useState({ status: "", search: "", platform: "", createdBy: "" });
  // const [isEdit, setIsEdit] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  const [openViewRefund, setOpenViewRefund] = useState(false);
  const [data, setData] = useState<Refund>();

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

  // const handleEditRefund = (user: Campaign) => {
  //   setData(user)
  //   setIsEdit(true);
  //   setOpenModal(true);
  // }
  const handleViewProfileDetails = (refund: Refund) => {
    setData(refund)
    // setIsEdit(false);
    setOpenViewRefund(true);
  }

  const filteredRefunds = stableSort(refunds, getComparator(order, orderBy)).filter(
    (item) => {
      return (
        (compaignFilter.status ? item.status.toLocaleLowerCase() == compaignFilter.status : true ) && 
        (compaignFilter.search ?
          item.agentName.toLowerCase().includes(compaignFilter.search.toLowerCase())
          : true )
      
      )
    },
  );

  const handleDeleteRefund = (id: string) => {
    setRefunds((state) => state.filter((item) => item.id !== id));
  };

  const handleAllRefundDelete = () => {
    setRefunds((state) => state.filter((item) => !selected.includes(item.id)));
    handleSelectAllRows([])();
  };
  return (
      <Box mt={3}>
        <Card >
          <Box px={2} pt={2}>
            <HeadingArea/>

            <SearchArea
              filter={compaignFilter}
              handleChangeFilter={handleChangeFilter}
            />
            <Modal open={openViewRefund} handleClose={() => setOpenViewRefund(false)}>
              <IconButton
                aria-label="close"
                onClick={() => setOpenViewRefund(false)}
                sx={(theme) => ({
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme.palette.grey[500],
                })}
              >
                <Close />
              </IconButton>
              <RefundForm handleCancel={() => setOpenViewRefund(false)} data={data}/>
            </Modal>
          </Box>

          {/* TABLE ROW SELECTION HEADER  */}
          {/* {selected.length > 0 && (
            <TableToolbar
              selected={selected.length}
              handleDeleteRows={handleAllRefundDelete}
            />
          )} */}

          {/* TABLE HEAD & BODY ROWS */}
          <TableContainer>
            <Scrollbar autoHide={false}>
              <Table>
                <RefundTableHead
                  order={order}
                  orderBy={orderBy}
                  numSelected={selected.length}
                  rowCount={filteredRefunds.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllRows={handleSelectAllRows(
                    filteredRefunds.map((row) => row.id),
                  )}
                />

                <TableBody>
                  {filteredRefunds
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((refund) => (
                      <RefundTableRow
                        key={refund.id}
                        refund={refund}
                        isSelected={isSelected(refund.id)}
                        handleSelectRow={handleSelectRow}
                        // handleDeleteRefund={handleDeleteRefund}
                        // handleEditRefund={handleEditRefund}
                        handleViewProfileDetails={handleViewProfileDetails}
                      />
                    ))}

                  {filteredRefunds.length === 0 && <TableDataNotFound />}
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
              count={filteredRefunds.length}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Box>
  );
};

export default RefundApprovals;
