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
  Switch,
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
import { FlexBetween, FlexBox } from "@/components/flexbox";
import { Ticket } from ".";
import { useDropzone } from "react-dropzone";
import Post from "./Activity";
import { Priority, Statuses } from "../page-view";

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

const SwitchWrapper = styled(FlexBox)({
  // width: "100%",
  // marginTop: 10,
});

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

  const CATEGORIES = [
    { id: 1, name: "Technical Issue", value: "0" },
    { id: 2, name: "Booking Problem", value: "1" },
  ]

  const SUBJECTS = [
    [{ id: 1, name: "Cannot Open System or Website", value: 1 },
      { id: 2, name: "System Is Slow or Not Responding", value: 2 },],
    [{ id: 1, name: "Cannot Create a New Booking", value: 1 },
      { id: 2, name: "Issues Modifying or Canceling a Booking", value: 2 },],
  ]
  const STATUS = [
    { id: 1, name: Statuses.new, value: Statuses.new },
    { id: 2, name: Statuses.open, value: Statuses.open },
    { id: 3, name: Statuses.escalated, value: Statuses.escalated },
    { id: 4, name: Statuses.resolvedSuccess, value: Statuses.resolvedSuccess },
    { id: 5, name: Statuses.resolvedUnSuccess, value: Statuses.resolvedUnSuccess },
    { id: 6, name: Statuses.pending, value: Statuses.pending },
    { id: 7, name: Statuses.close, value: Statuses.close },
  ];

  const initialValues = {
    status: data?.status || "",
    priority: data?.priority || "",
    assignedTo: data?.assignedTo || "",
    reply: "",
    category: data?.category || "",
    subject: data?.subject || "",
    files: [],
    isNeedEscalation: false,
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

  const changeIsNeedEscalation = (bool: boolean) => {
    setFieldValue("isNeedEscalation", bool)
  }

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
                value={values.status}
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
              <SwitchWrapper>
                <Paragraph pt={1} display="block" fontWeight={500}>
                  Need escalation
                </Paragraph>

                <Switch checked={values?.isNeedEscalation} onChange={(e, checked) => changeIsNeedEscalation(checked)} />
              </SwitchWrapper>
            </Grid>
            {/* <Grid item sm={4} xs={12}>
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
            </Grid> */}

            <Grid item sm={12} xs={12}>
              <Stack spacing={2}>
                <ListItem
                  text="Submitted By:"
                  description={`${data?.submittedBy.name} (${data?.submittedBy.email})`}
                />
                {/* <ListItem
                  text="Subject:"
                  description={data?.subject}
                /> */}
              </Stack>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                name="category"
                select
                fullWidth
                variant="outlined"
                label="Category"
                value={values.category}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.category && touched.category)}
                helperText={(touched.category && errors.category) as string}
              >
                {CATEGORIES.map(({ id, name, value }) => (
                  <MenuItem key={id} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                name="subject"
                select
                fullWidth
                variant="outlined"
                disabled={!values.category}
                label="subject"
                value={values.subject}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.subject && touched.subject)}
                helperText={(touched.subject && errors.subject) as string}
              >
                {SUBJECTS?.[+values?.category]?.map(({ id, name, value }) => (
                  <MenuItem key={id} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item sm={12} xs={12}>
              <H5 fontSize={16}>
                Description
              </H5>

              <Post />
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
          <FlexBox>

            <AttachButton {...getRootProps()}>
              <input {...getInputProps()} />
              <AttachFile fontSize="inherit" />
            </AttachButton>
            <Button onClick={() => {
              // showSnackbar(
              //   `Campaign Activated`,
              //   `The campaign "${data?.name}" has been activated.`
              // )
            }}  >
              <Telegram sx={{ paddingRight: "5px", paddingLeft: "5px" }} />
              Send Reply
            </Button>
          </FlexBox>
          <Button disabled={!((values.status == Statuses.resolvedSuccess) || (values.status == Statuses.resolvedUnSuccess))} onClick={() => {
          }} >
            Resolve ticket
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
