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
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
// CUSTOM COMPONENTS
import { H5 } from "@/components/typography";
import { Scrollbar } from "@/components/scrollbar";
import { AvatarBadge } from "@/components/avatar-badge";
import { Roles } from "@/components/auth/RoleBasedGuard";
import { useSnackbar } from "@/contexts/snackbarContext";

// ==========================================================================
type AddUserFormProps = { handleCancel: () => void; data?: any };
// ==========================================================================

const AddUserForm: FC<AddUserFormProps> = ({ handleCancel, data }) => {
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

  const initialValues = {
    headline: data?.headline || "",
    description: data?.description || "",
  };

  const validationSchema = Yup.object({
    headline: Yup.string()
      .min(3, "Must be greater then 3 characters")
      .required("headline is Required!"),
    description: Yup.string().required("description is Required!"),
   
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
    onSubmit: (values) => {
      showSnackbar("Changes Saved","Campaign details have been updated successfully.")
      handleCancel()},
  });

  return (
    <div>
      <H5 fontSize={16} mb={4}>
        {data ? data?.name : "Edit"}
      </H5>
      <form onSubmit={handleSubmit}>
        <Scrollbar autoHide={false} style={{ maxHeight: downSm ? 300 : "" }}>
          <Grid container pt={1} spacing={3}>
            <Grid item sm={12} xs={12}>
              <TextField
                fullWidth
                name="headline"
                label="Campaign Headline"
                variant="outlined"
                onBlur={handleBlur}
                value={values.headline}
                onChange={handleChange}
                error={Boolean(errors.headline && touched.headline)}
                helperText={(touched.headline && errors.headline) as string}
              />
            </Grid>

            <Grid item sm={12} xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                variant="outlined"
                onBlur={handleBlur}
                value={values.description}
                onChange={handleChange}
                error={Boolean(errors.description && touched.description)}
              />
            </Grid>
          </Grid>
        </Scrollbar>

        <Stack direction="row" alignItems="center" spacing={1} mt={4}>
          <Button type="submit" size="small">
            Save Changes
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

export default AddUserForm;
