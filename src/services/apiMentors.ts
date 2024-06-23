export async function getMentorsList() {
  try {
    const response = await fetch("https://radwan.up.railway.app/listMentors");
    if (!response.ok) {
      throw new Error("Failed to fetch mentors");
    }
    const data = await response.json();
    return data.mentorsData;
  } catch (error) {
    console.error("Error fetching mentors:", error);
    throw error;
  }
}

export async function getMockMentors() {
  try {
    const response = await fetch("https://radwan.up.railway.app/mockInterview");
    if (!response.ok) {
      throw new Error("Failed to fetch mentors");
    }
    const data = await response.json();
    return data.mentorsData;
  } catch (error) {
    console.error("Error fetching mentors:", error);
    throw error;
  }
}
export async function getConsultMentors() {
  try {
    const response = await fetch("https://radwan.up.railway.app/consultation");
    if (!response.ok) {
      throw new Error("Failed to fetch mentors");
    }
    const data = await response.json();
    return data.mentorsData;
  } catch (error) {
    console.error("Error fetching mentors:", error);
    throw error;
  }
}
export async function getMentoringMentors() {
  try {
    const response = await fetch("https://radwan.up.railway.app/mentoring");
    if (!response.ok) {
      throw new Error("Failed to fetch mentors");
    }
    const data = await response.json();
    return data.mentorsData;
  } catch (error) {
    console.error("Error fetching mentors:", error);
    throw error;
  }
}

export async function getMentorAvailablity(mentorId: { mentorId: string }) {
  try {
    const response = await fetch(
      `https://ali.up.railway.app/api/v1/availability/check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mentorId),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch mentor's time slots");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching mentor's time slots:", error);
    throw error;
  }
}

export async function getRecommended(mentorId: { mentorId: string }) {
  try {
    const response = await fetch(
      `https://deployment-2-1.onrender.com/recommend`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mentor_id: mentorId }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch recommended");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching mentor's time slots:", error);
    throw error;
  }
}
