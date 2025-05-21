import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [skills, setSkills] = useState(user.skills);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async (event) => {
    event.preventDefault();

    try {
      const skillsArray = Array.isArray(skills)
        ? skills
        : skills
            ?.split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          about,
          skills: skillsArray,
          age,
          gender,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data.loggedInUser));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-start gap-10 p-8 md:p-16 bg-base-200 min-h-screen">
        <div className="w-full md:w-1/2 bg-base-100 rounded-2xl shadow-2xl p-8 border border-base-300">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            Edit Profile
          </h2>

          <form className="space-y-6" onSubmit={saveProfile}>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="Sachin"
                className="input input-bordered w-full bg-base-200 text-white"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Tendulkar"
                className="input input-bordered w-full bg-base-200 text-white"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Age
              </label>
              <input
                type="number"
                placeholder="50"
                className="input input-bordered w-full bg-base-200 text-white"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Gender
              </label>
              <select
                className="select select-bordered w-full bg-base-200 text-white"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full bg-base-200 text-white"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                placeholder="cover-drive, straight-drive, leg-spin"
                className="input input-bordered w-full bg-base-200 text-white"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                About
              </label>
              <textarea
                placeholder="Write a short bio..."
                className="textarea textarea-bordered w-full bg-base-200 text-white"
                rows={4}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-center text-red-500 font-semibold text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full text-white font-semibold"
            >
              Update Profile
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <UserCard
            user={{
              firstName,
              lastName,
              skills,
              about,
              age,
              gender,
              photoURL,
            }}
          />
        </div>
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile saved successfully.</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
