"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import Link from "next/link";

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
  const [userLink, setUserLink] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) throw userError;
        const { user } = userData;

        const { data: pageData, error: pageError } = await supabase
          .from("user_page")
          .select("link")
          .eq("user_id", user?.id)
          .single();

        if (pageError) {
          console.error("Error fetching user page:", pageError);
        } else {
          setUserLink(pageData?.link);
        }

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
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        {loading ? <p>Loading...</p> : <AvatarDemo src={profileAvatar} />}
        <p>{profileName}</p>
      </div>
      <div>
        {userLink ? (
          <p>
            Ir a tu página:{" "}
            <Link
              target="_blank"
              href={`/${userLink}`}
              className="text-blue-500 hover:text-blue-700 underline"
            >
              {userLink}
            </Link>
          </p>
        ) : (
          <p className="text-gray-500">No tienes una página creada aún</p>
        )}
      </div>
    </div>
  );
}
