import { FC, ReactNode, useState } from "react";
import {
  Grid,
  Stack,
  Theme,
  Button,
  Avatar,
  TextField,
  IconButton,
  useMediaQuery,
  MenuItem,
  styled,
  InputBase,
} from "@mui/material";
import { Modal } from "@/components/modal";
import { AttachFile, CameraAlt, Edit, Telegram } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
// CUSTOM COMPONENTS
import { H5, Paragraph, Span } from "@/components/typography";
import { Scrollbar } from "@/components/scrollbar";
import { AvatarBadge } from "@/components/avatar-badge";
import { Roles } from "@/components/auth/RoleBasedGuard";
import { useSnackbar } from "@/contexts/snackbarContext";
import { FlexBetween } from "@/components/flexbox";
import { Ticket } from ".";
import { useDropzone } from "react-dropzone";
import Post from "./Activity";

const AttachButton = styled("div")(({ theme }) => ({
  width: 36,
  height: 36,
  fontSize: 18,
  display: "flex",
  cursor: "pointer",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.grey[400],
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.grey[200]}`,
}));

// ==========================================================================
type RefundFormProps = { handleClose: () => void; data?: Ticket };
// ==========================================================================

const ViewManageForm: FC<RefundFormProps> = ({ handleClose, data }) => {
  const showSnackbar = useSnackbar();
  const [openEditHeadlines, setOpenEditHeadlines] = useState(false);
  const handleCloseModal = () => { setOpenEditHeadlines(false) }
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      // console.log(files);
    },
  });
  const ALL_ROLES = [
    { id: 1, name: "Admin", value: Roles.admin },
    { id: 2, name: "Agent", value: Roles.agent },
    { id: 3, name: "sub Agent", value: Roles.subAgent },
    { id: 4, name: "Manager", value: Roles.manager },
    { id: 5, name: "Marketing", value: Roles.marketing },
  ];
  const ASSIGN_TO = [
    { id: 1, name: "Premier Group", value: "Premier Group" },
    { id: 2, name: "Elit Realty", value: "Elit Realty" },
  ];
  const PRIORITY = [
    { id: 1, name: "high", value: "high" },
    { id: 2, name: "medium", value: "medium" },
    { id: 3, name: "low", value: "low" },
  ];
  const STATUS = [
    { id: 1, name: "Premier Group", value: "Premier Group" },
    { id: 2, name: "Elit Realty", value: "Elit Realty" },
  ];

  const initialValues = {
    status: data?.status || "",
    priority: data?.priority || "",
    assignedTo: data?.assignedTo || "",
    reply: "",
    files: [],
  };

  const validationSchema = Yup.object({
    // name: Yup.string()
    //   .min(3, "Must be greater then 3 characters")
    //   .required("Full Name is Required!"),
    // agency: Yup.string().required("Agency is Required!"),
    // email: Yup.string()
    //   .email("Invalid email address")
    //   .required("Email is Required!"),
    // // birthday: Yup.date().required("Date of Birth is Required!"),
    // phone: Yup.number().min(9).required("Phone Number is required!"),
    // parentAgency: Yup.string(),
    // role: Yup.string(),
    // company: Yup.string().required("Company is Required!"),
  });

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => { handleClose() },
  });

  const StyledBox = styled("div")(({ theme }) => ({
    padding: 24,
    height: "100%",
    borderRadius: 8,
  }));

  return (
    <div>
      <H5 fontSize={16}>
        {data ? "Ticket Details" + data?.id : "Details"}
      </H5>
      <form onSubmit={handleSubmit}>
        <Scrollbar autoHide={false} style={{ maxHeight: downSm ? 300 : "" }}>


          <Grid mt={2} container spacing={3}>
            {/* <Grid item sm={6} xs={12}> */}
            <Grid item sm={4} xs={12}>
              <TextField
                name="priority"
                select
                fullWidth
                variant="outlined"
                label="Priority"
                value={values.priority}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.priority && touched.priority)}
                helperText={(touched.priority && errors.priority) as string}
              >
                {PRIORITY.map(({ id, name, value }) => (
                  <MenuItem key={id} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                name="status"
                select
                fullWidth
                variant="outlined"
                label="Status"
                value={values.priority}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.status && touched.status)}
                helperText={(touched.status && errors.status) as string}
              >
                {STATUS.map(({ id, name, value }) => (
                  <MenuItem key={id} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                name="assignedTo"
                select
                fullWidth
                variant="outlined"
                label="Assigned To"
                value={values.assignedTo}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.assignedTo && touched.assignedTo)}
                helperText={(touched.assignedTo && errors.assignedTo) as string}
              >
                {ASSIGN_TO.map(({ id, name, value }) => (
                  <MenuItem key={id} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item sm={12} xs={12}>
                <Stack spacing={2}>
                  <ListItem
                    text="Submitted By:"
                    description={`${data?.submittedBy.name} (${data?.submittedBy.email})`}
                  />
                  <ListItem
                    text="Subject:"
                    description={data?.subject}
                  />
                </Stack>
            </Grid>
            <Grid item sm={12} xs={12}>
              <H5 fontSize={16}>
                Activity Log
              </H5>

              <Post/>
            </Grid>
            <Grid item sm={12} xs={12}>
              <H5 fontSize={16}>
                Reply
              </H5>
              <InputBase
                fullWidth
                multiline
                placeholder="Type Something....."
                sx={{ fontSize: 14, fontWeight: 500, flex: 1 }}
              />
            </Grid>

          </Grid>
        </Scrollbar>

        <FlexBetween mt={3}>
          <AttachButton {...getRootProps()}>
                        <input {...getInputProps()} />
                        <AttachFile fontSize="inherit" />
                      </AttachButton>
          <Button onClick={() => {
            // showSnackbar(
            //   `Campaign Activated`,
            //   `The campaign "${data?.name}" has been activated.`
            // )
          }} type="submit" size="small">
            <Telegram sx={{paddingRight: "5px", paddingLeft: "5px"}}/>
            Send Reply
          </Button>

        </FlexBetween>
      </form>

    </div>
  );
};

function ListItem({
  text,
  description,
}: {
  text: string;
  description: string | ReactNode;
}) {
  return (
    <Paragraph color="text.secondary">
      {text} <br />
      <Span fontWeight={500} color="text.primary">
        {description}
      </Span>
    </Paragraph>
  );
}

export default ViewManageForm;
