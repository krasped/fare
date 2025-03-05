import { MouseEvent, useState } from "react";
import { Avatar, Checkbox, TableCell, TableRow } from "@mui/material";
import { DeleteOutline, PageviewOutlined, Edit } from "@mui/icons-material";
// CUSTOM DEFINED HOOK
import useNavigate from "@/hooks/useNavigate";
// CUSTOM COMPONENTS
import { FlexBox } from "@/components/flexbox";
import { Paragraph } from "@/components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "@/components/table";
import { DocumentStatuses, UserDocuments } from ".";
import { StatusBadge } from "@/components/status-badge";

// ==============================================================
interface UserRowProps {
  user: any;
  isSelected: boolean;
  handleViewProfileDetailsUser: (user: UserDocuments) => void;
  handleEditUser: (user: UserDocuments) => void;
  handleDeleteUser: (id: string) => void;
  handleSelectRow: (_: MouseEvent, name: string) => void;
}
// ==============================================================

const UserTableRow = (props: UserRowProps) => {
  const { user, isSelected, handleSelectRow, handleDeleteUser, handleEditUser, handleViewProfileDetailsUser } = props;

  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenMenuEl(event.currentTarget);
  };

  const handleCloseOpenMenu = () => setOpenMenuEl(null);

  return (
    <TableRow hover>
      <TableCell padding="checkbox">
        <Checkbox
          size="small"
          color="primary"
          checked={isSelected}
          onClick={(event) => handleSelectRow(event, user.id)}
        />
      </TableCell>

      <TableCell padding="normal">
        <FlexBox alignItems="center" gap={2}>
          <Avatar src={user.avatar} alt={user.name} variant="rounded" />

          <div>
            <Paragraph
              fontWeight={500}
              color="text.primary"
              sx={{
                ":hover": { textDecoration: "underline", cursor: "pointer" },
              }}
            >
              {user.agentName}
            </Paragraph>

            <Paragraph fontSize={13}>#{user.id.substring(0, 11)}</Paragraph>
          </div>
        </FlexBox>
      </TableCell>

      <TableCell padding="normal">{user.agencyName}</TableCell>

      <TableCell padding="normal">{user.documentProvided}</TableCell>

      <TableCell padding="normal">
        <StatusBadge type={user.status === DocumentStatuses.approved ? "success" : ((user.status === DocumentStatuses.waiting || user.status === DocumentStatuses.missing) ? "warning" : "error")}>
          {user.status}
        </StatusBadge>
      </TableCell>

      <TableCell padding="normal">
        <TableMoreMenu
          open={openMenuEl}
          handleOpen={handleOpenMenu}
          handleClose={handleCloseOpenMenu}
        >
          <TableMoreMenuItem
            Icon={PageviewOutlined}
            title="View Details"
            handleClick={() => {
              handleCloseOpenMenu();
              handleViewProfileDetailsUser(user);
            }}
          />
          {/* <TableMoreMenuItem
            Icon={Edit}
            title="Edit"
            handleClick={() => {
              handleCloseOpenMenu();
              handleEditUser(user);
            }}
          />
          <TableMoreMenuItem
            Icon={DeleteOutline}
            title="Delete"
            handleClick={() => {
              handleCloseOpenMenu();
              handleDeleteUser(user.id);
            }}
          /> */}
        </TableMoreMenu>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
