import nodemailer from 'nodemailer';

const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        secure:
            String(process.env.SMTP_SECURE)
                .toLowerCase() === 'true',

        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

export const sendLoginOtpEmail = async ({
    email,
    name,
    otp,
}) => {
    const transporter = createTransporter();

    await transporter.sendMail({
        from:
            process.env.EMAIL_FROM ||
            process.env.SMTP_USER,

        to: email,

        subject:
            'Your DEVFORGE Admin Login Code',

        text:
            `Hello ${name || 'Admin'},\n\n` +
            `Your DEVFORGE Admin login code is: ${otp}\n\n` +
            `This code expires in 10 minutes.\n` +
            `If you did not request this login, please change your password immediately.`,

        html: `
            <div style="
                max-width: 520px;
                margin: 0 auto;
                padding: 30px;
                background: #101514;
                color: #eef5f2;
                border-radius: 12px;
                font-family: Arial, sans-serif;
            ">
                <div style="
                    color: #a8ff38;
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 2px;
                ">
                    DEVFORGE CONTROL
                </div>

                <h1 style="
                    margin: 18px 0 8px;
                    font-size: 26px;
                ">
                    Admin login verification
                </h1>

                <p style="
                    color: #aab7b2;
                    line-height: 1.6;
                ">
                    Hello ${name || 'Admin'}, use this
                    verification code to complete your login:
                </p>

                <div style="
                    margin: 25px 0;
                    padding: 18px;
                    border: 1px solid #a8ff38;
                    border-radius: 9px;
                    background: #080b0b;
                    color: #a8ff38;
                    font-size: 34px;
                    font-weight: 800;
                    letter-spacing: 10px;
                    text-align: center;
                ">
                    ${otp}
                </div>

                <p style="
                    color: #aab7b2;
                    font-size: 13px;
                ">
                    This code expires in 10 minutes.
                    Do not share this code with anyone.
                </p>

                <p style="
                    margin-top: 22px;
                    color: #ff8a8a;
                    font-size: 12px;
                ">
                    If you did not request this login,
                    change your password immediately.
                </p>
            </div>
        `,
    });
};