import { Box, Card, Table, TableBody, TableContainer, TablePagination } from "@mui/material";
// CUSTOM PAGE SECTION COMPONENTS
import HeadingArea from "./HeadingArea";
import SearchArea from "./SearchArea";
import { TableDataNotFound } from "@/components/table";
import { Scrollbar } from "@/components/scrollbar";
import WalletTableHead from "./WalletTableHead";
import WalletTableRow from "./WalletTableRow";
import { useState } from "react";
import useMuiTable, { getComparator, stableSort } from "@/hooks/useMuiTable";

export enum Statuses {
  pending = "pending",
  active = "active",
  inactive = "inactive",
}

export interface Wallet {
  id: string;
  agentName: string;
  balance: string;
  lastRecharge: string;
  lowBalanceAlert: boolean;
}

const wallets1: Wallet[] = [
  { id: "1", agentName: "John Doe", balance: "5000", lastRecharge: "2024-02-20", lowBalanceAlert: true },
  { id: "2", agentName: "Jane Smith", balance: "3000", lastRecharge: "2024-02-18", lowBalanceAlert: false },
  { id: "3", agentName: "Mike Johnson", balance: "1500", lastRecharge: "2024-02-15", lowBalanceAlert: true },
];


const WalletManagement = () => {
  const [wallets, setWallets] = useState([...wallets1]);
  const [compaignFilter, setCompaignFilter] = useState({ status: "", search: "", platform: "", createdBy: "" });

  const {
    page,
    order,
    orderBy,
    selected,
    rowsPerPage,
    handleChangePage,
    handleRequestSort,
    handleSelectAllRows,
    handleChangeRowsPerPage,
  } = useMuiTable({ defaultOrderBy: "name" });

  const handleChangeFilter = (key: string, value: string) => {
    setCompaignFilter((state) => ({ ...state, [key]: value }));
  };

  const filteredWallets = stableSort(wallets, getComparator(order, orderBy)).filter(
    (item) => {
      return (
        (compaignFilter.search ?
          item.agentName.toLowerCase().includes(compaignFilter.search.toLowerCase())
          : true)
      )
    },
  );

  return (
    <Box mt={3}>
      <Card >
        <Box px={2} pt={2}>
          <HeadingArea />

          <SearchArea
            filter={compaignFilter}
            handleChangeFilter={handleChangeFilter}
          />
        </Box>
        <TableContainer>
          <Scrollbar autoHide={false}>
            <Table>
              <WalletTableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                rowCount={filteredWallets.length}
                onRequestSort={handleRequestSort}
                onSelectAllRows={handleSelectAllRows(
                  filteredWallets.map((row) => row.id),
                )}
              />

              <TableBody>
                {filteredWallets
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((wallet) => (
                    <WalletTableRow
                      key={wallet.id}
                      wallet={wallet}
                    />
                  ))}

                {filteredWallets.length === 0 && <TableDataNotFound />}
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
            count={filteredWallets.length}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default WalletManagement;
