import { FC } from "react";
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
  Switch,
  styled,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
// CUSTOM COMPONENTS
import { H5, Paragraph } from "@/components/typography";
import { Scrollbar } from "@/components/scrollbar";
import { AvatarBadge } from "@/components/avatar-badge";
import { Roles } from "@/components/auth/RoleBasedGuard";
import { Statuses } from "./page-view";
import { useSnackbar } from "@/contexts/snackbarContext";
import { FlexBetween } from "@/components/flexbox";

const SwitchWrapper = styled(FlexBetween)({
  width: "100%",
  padding: "10px"
});

// ==========================================================================
type AddCompaignFormProps = { handleCancel: () => void; data?: any };
// ==========================================================================

const AddCompaignForm: FC<AddCompaignFormProps> = ({ handleCancel, data }) => {
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const showSnackbar = useSnackbar();

  const ALL_ROLES = [
      { id: 1, name: "Admin", value: Roles.admin },
      { id: 2, name: "Agent", value: Roles.agent },
      { id: 3, name: "sub Agent", value: Roles.subAgent },
      { id: 4, name: "Manager", value: Roles.manager },
      { id: 5, name: "Marketing", value: Roles.marketing },
    ];
  const ALL_PARENTS = [
      { id: 1, name: "Premier Group", value: "Premier Group" },
      { id: 2, name: "Elit Realty", value: "Elit Realty" },
    ];
  const DESTINATION = [
      { id: 1, name: "USA", value: "USA" },
      { id: 2, name: "UK", value: "UK" },
      { id: 3, name: "Canada", value: "Canada" },
      { id: 4, name: "Australia", value: "Australia" },
      { id: 5, name: "Germany", value: "Germany" },
      { id: 6, name: "France", value: "France" },
    ];
  const WATSUP = [
      { id: 1, name: "+2342345234", value: "+2342345234" },
      { id: 2, name: "+125345234", value: "+125345234" },
    ];
  const PLATFORMS = [
      { id: 1, name: "Facebook", value: "Premier Group" },
      { id: 2, name: "Instagram", value: "Instagram" },
      { id: 3, name: "Google", value: "Google" },
      { id: 4, name: "Twitter", value: "Twitter" },
      { id: 5, name: "Linkedin", value: "Linkedin" },
    ];
  const STATUSES = [
      { id: 1, name: "Waiting for approval", value: Statuses.pending },
      { id: 2, name: "Approved", value: Statuses.active },
      { id: 3, name: "Not approved", value: Statuses.inactive },
    ];

  const initialValues = {
    campaignId: data?.id || "",
    creationDate: data?.createdAt || "",
    destination: data?.targetDestination || "",
    whatsappNumber: "",
    leadyaConnected: data?.leadyaConnected || "",
    campaignLink: data?.campaignLink || "",
    numberOfAds: data?.totalAds || "",
    platforms: data?.platform || "",
    dailyBudget: data?.dailyBudget || "",
    status: data?.status || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Must be greater then 3 characters")
      .required("Full Name is Required!"),
    agency: Yup.string().required("Agency is Required!"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required!"),
    // birthday: Yup.date().required("Date of Birth is Required!"),
    phone: Yup.number().min(9).required("Phone Number is required!"),
    parentAgency: Yup.string(),
    role: Yup.string(),
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
    onSubmit: (values) => showSnackbar("Campaign created", "Your campaign has been created successfully."),
  });

  return (
    <div>
      <H5 fontSize={16} mb={4}>
        {data ? "Edit Campaign" : "Create New Campaign"}
      </H5>
      <form onSubmit={handleSubmit}>
        <Scrollbar autoHide={false} style={{ maxHeight: downSm ? 300 : "" }}>
         

          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="campaignId"
                label="Campaign ID"
                variant="outlined"
                onBlur={handleBlur}
                disabled
                value={values.campaignId}
                onChange={handleChange}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="creationDate"
                label="Creation Date"
                disabled
                variant="outlined"
                onBlur={handleBlur}
                value={values.creationDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                name="destination"
                select
                fullWidth
                variant="outlined"
                label="Destination"
                value={values.destination}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.destination && touched.destination)}
                helperText={(touched.destination && errors.destination) as string}
              >
                {DESTINATION.map(({ id, name, value }) => (
                  <MenuItem key={id} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                name="whatsappNumber"
                select
                fullWidth
                variant="outlined"
                label="WhatsApp Number"
                value={values.whatsappNumber}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.whatsappNumber && touched.whatsappNumber)}
                helperText={(touched.whatsappNumber && errors.whatsappNumber) as string}
              >
                {WATSUP.map(({ id, name, value }) => (
                  <MenuItem key={id} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item sm={6} xs={12}>
              <SwitchWrapper>
                <Paragraph display="block" fontWeight={400}>
                  Leadya Connected
                </Paragraph>

                <Switch defaultChecked />
              </SwitchWrapper>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="campaignLink"
                label="Campaign Link"
                variant="outlined"
                onBlur={handleBlur}
                value={values.campaignLink}
                onChange={handleChange}
                error={Boolean(errors.campaignLink && touched.campaignLink)}
                helperText={(touched.campaignLink && errors.campaignLink) as string}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="numberOfAds"
                label="Number of Ads"
                type="number"
                variant="outlined"
                onBlur={handleBlur}
                value={values.numberOfAds}
                onChange={handleChange}
                error={Boolean(errors.numberOfAds && touched.numberOfAds)}
                helperText={(touched.numberOfAds && errors.numberOfAds) as string}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                name="parentAgency"
                select
                multiline
                fullWidth
                variant="outlined"
                label="Platforms"
                value={values.platforms}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.platforms && touched.platforms)}
                helperText={(touched.platforms && errors.platforms) as string}
              >
                {PLATFORMS.map(({ id, name, value }) => (
                  <MenuItem key={id} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="dailyBudget"
                label="Daily Budget"
                type="number"
                variant="outlined"
                onBlur={handleBlur}
                value={values.dailyBudget}
                onChange={handleChange}
                error={Boolean(errors.dailyBudget && touched.dailyBudget)}
                helperText={(touched.dailyBudget && errors.dailyBudget) as string}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
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
                {STATUSES.map(({ id, name, value }) => (
                  <MenuItem key={id} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Scrollbar>

        <Stack direction="row" alignItems="center" spacing={1} mt={4}>
          <Button type="submit" size="small">
            Save Compaign
          </Button>

          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default AddCompaignForm;
