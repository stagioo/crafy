"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

function AvatarDemo({ src }: { src?: string }) {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export default function DashboardSection() {
  const [profileAvatar, setProfileAvatar] = useState<string | undefined>(
    undefined
  );
  const [profileName, setProfileName] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        const { user } = data;
        setProfileAvatar(user?.user_metadata.avatar_url);
        setProfileName(user?.user_metadata.name);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  return (
    <div>
      <div className="flex gap-2 items-center">
        {loading ? <p>Loading...</p> : <AvatarDemo src={profileAvatar} />}
        <p>{profileName}</p>
      </div>
    </div>
  );
}
