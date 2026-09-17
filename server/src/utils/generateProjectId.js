const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

// Matches the format already generated client-side in Contact.tsx: DF-XXXX
const generateProjectId = () => {
    let result = 'DF-';

    for (let i = 0; i < 4; i++) {
        result += CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    return result;
};

export default generateProjectId;
