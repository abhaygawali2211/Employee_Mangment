import React, { useEffect, useState } from "react";
import { dummyProfileData } from "../assets/assets";
import { Loading } from "../components/Loading";
import { Lock } from "lucide-react";
import { ProfileForm } from "../components/ProfileForm";
import { ChangePassword } from "../components/changePassword";
import toast from "react-hot-toast";
import api from "../api/axios";
import{useAuth} from "../context/Authcontext"
export const Setting = () => {
  const {user}=useAuth()
  const [profile, setProfile] = useState(null);
  const [loading, setloading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const fetchProfile = async () => {
    try {
      const res= await  api.get("/profile")
      const profile= res.data;
    if(profile) setProfile(profile)
      
    } catch (error) {
      toast.error(error?.response?.error|| err?.message)
    }
    finally{
      setloading(false)
    }
  };


  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-gray-500">
          Manage your account and performance
        </p>
      </div>
      {profile && <ProfileForm inisialData={profile} onSuccess={fetchProfile}/>}

      {/* Change Password trigger */}
      <div className="max-w-md p-6 flex items-center justify-between border rounded-xl bg-white">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-100 rounded-lg">
            <Lock className="w-5 h-5 text-slate-600" />
          </div>

          <div>
            <p className="font-medium text-slate-900">Password</p>
            <p className="text-sm text-slate-500">
              Update your account password
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPassword(true)}
          className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-50"
        >
          Change
        </button>
      </div>
      <ChangePassword open={showPassword} onClose={()=>setShowPassword(false)}/>
    </div>
  );
};