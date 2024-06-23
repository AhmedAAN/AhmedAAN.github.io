import React from 'react';

interface MentorProfileTopProps {
    userName: string;
    professionalTitle: string;
    imageUrl: string;
}

const MentorProfileTop: React.FC<MentorProfileTopProps> = ({ userName, professionalTitle, imageUrl }) => {
    return (
        <div className="relative w-full h-96 flex flex-col justify-evenly mb-6">
            <div className="px-5 pt-72">
                <p className="font-bold text-xl text-slate-900">{userName}</p>
                <p className="text-slate-700">{professionalTitle}</p>
            </div>
            <img
                src={imageUrl}
                alt="Mentor Profile"
                className="absolute -z-10 w-full h-96 object-cover"
            />
        </div>
    );
}

export default MentorProfileTop;
