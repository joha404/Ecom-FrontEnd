import Button from "../../Components/common/Button";
import TextField from "../../Components/common/TextField";

export default function PasswordSection({
  isEditing,
  register,
  onChangePassword,
}) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Change Password
      </h3>

      {/* ✅ Old Password Field */}
      <TextField label="Current password">
        <TextField.Input
          type="password"
          placeholder="Enter current password"
          {...register("password")}
          readOnly={!isEditing}
        />
      </TextField>

      <TextField label="New password">
        <TextField.Input
          type="password"
          placeholder="Enter new password"
          {...register("newPassword")}
          readOnly={!isEditing}
        />
      </TextField>

      <TextField label="Confirm new password">
        <TextField.Input
          type="password"
          placeholder="Re-type new password"
          {...register("confirmPassword")}
          readOnly={!isEditing}
        />
      </TextField>

      {isEditing && (
        <div className="mt-4 float-end">
          <Button type="button" onClick={onChangePassword}>
            Change Password
          </Button>
        </div>
      )}
    </div>
  );
}
