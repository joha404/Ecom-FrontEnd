import TextField from "../../Components/common/TextField";
export default function ProfileForm({ register, isEditing }) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <TextField label="First name">
          <TextField.Input
            placeholder="Md"
            {...register("firstName")}
            readOnly={!isEditing}
          />
        </TextField>
        <TextField label="Last name">
          <TextField.Input
            placeholder="Joha"
            {...register("lastName")}
            readOnly={!isEditing}
          />
        </TextField>
      </div>

      <TextField label="Email">
        <TextField.Input
          placeholder="mdjoha@example.com"
          {...register("email")}
          readOnly={!isEditing}
        />
      </TextField>

      <TextField label="Bio">
        <TextField.Input
          placeholder="Tell us about yourself"
          {...register("bio")}
          readOnly={!isEditing}
        />
      </TextField>

      <TextField label="Location">
        <TextField.Input
          placeholder="Where do you live?"
          {...register("location")}
          readOnly={!isEditing}
        />
      </TextField>

      <TextField label="Website">
        <TextField.Input
          placeholder="https://example.com"
          {...register("website")}
          readOnly={!isEditing}
        />
      </TextField>
    </>
  );
}
