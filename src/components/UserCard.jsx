import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoURL, about, skills, age, gender } = user;

  return (
    <div className="card bg-base-200 w-96 shadow-xl rounded-2xl overflow-hidden text-white">
      <figure className="h-60 bg-gray-900 flex justify-center items-center">
        {photoURL ? (
          <img
            src={photoURL}
            alt="User"
            className="object-cover h-full w-full"
          />
        ) : (
          <div className="text-gray-400 text-center">No Photo</div>
        )}
      </figure>

      <div className="card-body space-y-3">
        <h2 className="card-title text-xl font-bold">
          {firstName} {lastName}
        </h2>

        {(age || gender) && (
          <div className="flex gap-4 text-sm">
            {age && (
              <p>
                <strong>Age:</strong> {age}
              </p>
            )}
            {gender && (
              <p>
                <strong>Gender:</strong> {gender}
              </p>
            )}
          </div>
        )}

        {Array.isArray(skills) && skills.length > 0 && (
          <p className="text-sm">
            <strong>Skills:</strong> {skills.join(", ")}
          </p>
        )}

        {about && (
          <p className="text-sm">
            <strong>About:</strong> {about}
          </p>
        )}

        <div className="card-actions justify-between pt-4">
          <button className="btn btn-primary btn-sm">Ignore</button>
          <button className="btn btn-secondary btn-sm">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
