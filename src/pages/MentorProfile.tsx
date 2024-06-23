import React, { useState, useEffect } from 'react';
import MentorCounter from '@/components/MentorCounter';
import MentorProfileTop from '@/components/MentorProfileTop';
import MentorSection from '@/components/MentorSection';

interface MentorData {
    userName: string;
    specialization: string;
    imageUrl: string;
}

interface MentorProfileProps {
    _id: string;
}

const MentorProfile: React.FC<MentorProfileProps> = ({ _id }) => {
    const [mentor, setMentor] = useState<MentorData>([]);

    useEffect(() => {
        fetch(`https://radwan.up.railway.app/listMentor/${_id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMentor({
                    userName: data.mentor.userName,
                    specialization: data.mentor.specialization,
                    imageUrl: data.mentor.imageUrl
                });
            })
            .catch(error => {
                console.error('Error fetching mentor data:', error);
            });
    }, [_id]);

    return (
        <section className="py-12 px-4 md:px-12">
            {mentor ? (
                <>
                    <MentorProfileTop
                        userName={mentor.userName}
                        professionalTitle={mentor.specialization}
                        imageUrl={mentor.imageUrl}
                    />
                    <MentorCounter />
                    <MentorSection />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </section>
    );
}

export default MentorProfile;
