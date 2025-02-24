import { MouseEvent, useState } from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import { FlexBox } from "@/components/flexbox";
import { Paragraph } from "@/components/typography";
import { Wallet } from "./index";

// ==============================================================
interface WalletRowProps {
  wallet: Wallet;
}
// ==============================================================

const WalletTableRow = (props: WalletRowProps) => {
  const { wallet } = props;

  return (
    <TableRow hover>
      {/* <TableCell padding="checkbox">
        <Checkbox
          size="small"
          color="primary"
          checked={isSelected}
          onClick={(event) => handleSelectRow(event, user.id)}
        />
      </TableCell> */}

      <TableCell padding="normal">
        <FlexBox alignItems="center" gap={2}>
          <div>
            <Paragraph
              fontWeight={500}
              color="text.primary"
              sx={{
                ":hover": { textDecoration: "underline", cursor: "pointer" },
              }}
            >
              {wallet.agentName}
            </Paragraph>

            <Paragraph fontSize={13}>#{wallet.id.substring(0, 11)}</Paragraph>
          </div>
        </FlexBox>
      </TableCell>

      <TableCell padding="normal">${wallet?.balance || 0}</TableCell>

      <TableCell padding="normal">{wallet.lastRecharge}</TableCell>

      <TableCell padding="checkbox">
        <Checkbox
          size="small"
          color="primary"
          checked={wallet.lowBalanceAlert}
          readOnly
        />
      </TableCell>
    </TableRow>
  );
};

export default WalletTableRow;
