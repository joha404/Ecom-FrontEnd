import { useEffect, useState } from "react";
import TextField from "../../Components/common/TextField";
import { getProfile } from "../../api/auth/profile";

export default function ProfileForm({ register, setValue, isEditing }) {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = async () => {
    setIsLoading(true);
    const res = await getProfile();
    setUserData(res);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (userData) {
      setValue("name", userData.user?.name || "");
      setValue("email", userData.user?.email || "");
      setValue("phoneNumber", userData.phoneNumber || "");
      setValue("bio", userData.bio || "");
      setValue("location", userData.location || "");
      setValue("website", userData.website || "");
      setValue("gender", userData.gender || "");
      setValue("dateOfBirth", userData.dateOfBirth?.split("T")[0] || "");
      setValue("social.facebook", userData.socialLinks?.facebook || "");
      setValue("social.instagram", userData.socialLinks?.instagram || "");
    }
  }, [userData, setValue]);

  return (
    <>
      <TextField label="Your Name">
        <TextField.Input
          {...register("name")}
          placeholder="Your full name"
          readOnly={!isEditing}
        />
      </TextField>

      <TextField label="Email">
        <TextField.Input {...register("email")} readOnly />
      </TextField>

      <TextField label="Phone Number">
        <TextField.Input {...register("phoneNumber")} readOnly={!isEditing} />
      </TextField>

      <TextField label="Bio">
        <TextField.Input {...register("bio")} readOnly={!isEditing} />
      </TextField>

      <TextField label="Location">
        <TextField.Input {...register("location")} readOnly={!isEditing} />
      </TextField>

      <TextField label="Website">
        <TextField.Input {...register("website")} readOnly={!isEditing} />
      </TextField>

      <div className="flex flex-col md:flex-row gap-4">
        <TextField label="Gender">
          <TextField.Input {...register("gender")} readOnly={!isEditing} />
        </TextField>
        <TextField label="Date of Birth">
          <TextField.Input
            type="date"
            {...register("dateOfBirth")}
            readOnly={!isEditing}
          />
        </TextField>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <TextField label="Facebook">
          <TextField.Input
            {...register("social.facebook")}
            readOnly={!isEditing}
          />
        </TextField>
        <TextField label="Instagram">
          <TextField.Input
            {...register("social.instagram")}
            readOnly={!isEditing}
          />
        </TextField>
      </div>
    </>
  );
}
