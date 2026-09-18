// // import crypto from 'crypto';
// // import jwt from 'jsonwebtoken';

// // import Admin from '../models/Admin.js';
// // import ActivityLog from '../models/ActivityLog.js';

// // import asyncHandler from '../middleware/asyncHandler.js';
// // import { getTransporter } from '../config/mailer.js';
// // import { sendLoginOtpEmail } from '../utils/sendLoginOtpEmail.js';

// // const signToken = (id) =>
// //     jwt.sign(
// //         {
// //             id,
// //             purpose: 'access',
// //         },
// //         process.env.JWT_SECRET,
// //         {
// //             expiresIn:
// //                 process.env.JWT_EXPIRES_IN || '7d',
// //         }
// //     );

// // const signOtpToken = (id) =>
// //     jwt.sign(
// //         {
// //             id,
// //             purpose: 'login-otp',
// //         },
// //         process.env.JWT_SECRET,
// //         {
// //             expiresIn: '10m',
// //         }
// //     );

// // const hashLoginOtp = (otp) =>
// //     crypto
// //         .createHmac(
// //             'sha256',
// //             process.env.JWT_SECRET
// //         )
// //         .update(String(otp))
// //         .digest('hex');

// // const maskEmail = (email) => {
// //     const [name, domain] =
// //         String(email).split('@');

// //     if (!domain) {
// //         return email;
// //     }

// //     return `${name.slice(0, 2)}${'*'.repeat(
// //         Math.max(2, name.length - 2)
// //     )}@${domain}`;
// // };

// // const hashResetToken = (token) =>
// //     crypto
// //         .createHash('sha256')
// //         .update(token)
// //         .digest('hex');

// // const getClientOrigin = () =>
// //     (
// //         process.env.CLIENT_ORIGIN ||
// //         'http://localhost:5173'
// //     )
// //         .split(',')[0]
// //         .trim()
// //         .replace(/\/$/, '');

// // // @route   POST /api/auth/login
// // // @desc    Check password and send email OTP
// // // @access  Public
// // export const login = asyncHandler(
// //     async (req, res) => {
// //         const { email, password } = req.body;

// //         if (!email || !password) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message:
// //                     'Email and password are required',
// //             });
// //         }

// //         const admin = await Admin.findOne({
// //             email: email.toLowerCase(),
// //         }).select('+password');

// //         if (
// //             !admin ||
// //             !(await admin.comparePassword(password))
// //         ) {
// //             return res.status(401).json({
// //                 success: false,
// //                 message:
// //                     'Invalid email or password',
// //             });
// //         }

// //         const otp = String(
// //             crypto.randomInt(100000, 1000000)
// //         );

// //         admin.loginOtpHash =
// //             hashLoginOtp(otp);

// //         admin.loginOtpExpires =
// //             new Date(
// //                 Date.now() + 10 * 60 * 1000
// //             );

// //         admin.loginOtpAttempts = 0;

// //         await admin.save({
// //             validateBeforeSave: false,
// //         });

// //         try {
// //             await sendLoginOtpEmail({
// //                 email: admin.email,
// //                 name: admin.name,
// //                 otp,
// //             });
// //         } catch (error) {
// //             admin.loginOtpHash = undefined;
// //             admin.loginOtpExpires = undefined;
// //             admin.loginOtpAttempts = 0;

// //             await admin.save({
// //                 validateBeforeSave: false,
// //             });

// //             console.error(
// //                 '[Auth] Could not send login OTP:',
// //                 error.message
// //             );

// //             return res.status(503).json({
// //                 success: false,
// //                 message:
// //                     'Could not send verification code. Please try again.',
// //             });
// //         }

// //         res.json({
// //             success: true,
// //             requiresOtp: true,
// //             otpToken: signOtpToken(admin._id),
// //             email: maskEmail(admin.email),
// //             message:
// //                 'Verification code sent to your admin email.',
// //         });
// //     }
// // );

// // // @route   POST /api/auth/verify-login-otp
// // // @desc    Verify email OTP and return admin JWT
// // // @access  Public
// // export const verifyLoginOtp = asyncHandler(
// //     async (req, res) => {
// //         const otpToken = String(
// //             req.body.otpToken || ''
// //         );

// //         const otp = String(
// //             req.body.otp || ''
// //         ).trim();

// //         if (
// //             !otpToken ||
// //             !/^\d{6}$/.test(otp)
// //         ) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message:
// //                     'A valid 6-digit verification code is required.',
// //             });
// //         }

// //         let decoded;

// //         try {
// //             decoded = jwt.verify(
// //                 otpToken,
// //                 process.env.JWT_SECRET
// //             );
// //         } catch {
// //             return res.status(401).json({
// //                 success: false,
// //                 message:
// //                     'Verification session has expired. Please sign in again.',
// //             });
// //         }

// //         if (
// //             decoded.purpose !== 'login-otp'
// //         ) {
// //             return res.status(401).json({
// //                 success: false,
// //                 message:
// //                     'Invalid verification session.',
// //             });
// //         }

// //         const admin =
// //             await Admin.findById(
// //                 decoded.id
// //             ).select(
// //                 '+loginOtpHash +loginOtpExpires +loginOtpAttempts'
// //             );

// //         if (
// //             !admin ||
// //             !admin.loginOtpHash ||
// //             !admin.loginOtpExpires
// //         ) {
// //             return res.status(401).json({
// //                 success: false,
// //                 message:
// //                     'Verification session is invalid. Please sign in again.',
// //             });
// //         }

// //         if (
// //             admin.loginOtpExpires.getTime() <
// //             Date.now()
// //         ) {
// //             admin.loginOtpHash = undefined;
// //             admin.loginOtpExpires = undefined;
// //             admin.loginOtpAttempts = 0;

// //             await admin.save({
// //                 validateBeforeSave: false,
// //             });

// //             return res.status(401).json({
// //                 success: false,
// //                 message:
// //                     'Verification code has expired. Please sign in again.',
// //             });
// //         }

// //         if (
// //             (admin.loginOtpAttempts || 0) >= 5
// //         ) {
// //             return res.status(429).json({
// //                 success: false,
// //                 message:
// //                     'Too many incorrect attempts. Please sign in again.',
// //             });
// //         }

// //         if (
// //             hashLoginOtp(otp) !==
// //             admin.loginOtpHash
// //         ) {
// //             admin.loginOtpAttempts =
// //                 (admin.loginOtpAttempts || 0) + 1;

// //             await admin.save({
// //                 validateBeforeSave: false,
// //             });

// //             return res.status(401).json({
// //                 success: false,
// //                 message:
// //                     'Incorrect verification code.',
// //                 attemptsRemaining:
// //                     Math.max(
// //                         0,
// //                         5 -
// //                             admin.loginOtpAttempts
// //                     ),
// //             });
// //         }

// //         admin.loginOtpHash = undefined;
// //         admin.loginOtpExpires = undefined;
// //         admin.loginOtpAttempts = 0;
// //         admin.lastLogin = new Date();

// //         await admin.save({
// //             validateBeforeSave: false,
// //         });

// //         ActivityLog.create({
// //             admin: admin._id,
// //             adminName: admin.name,
// //             adminEmail: admin.email,
// //             action: 'auth.login',
// //             method: 'POST',
// //             path:
// //                 '/api/auth/verify-login-otp',
// //             resource: 'auth',
// //             statusCode: 200,
// //             ip: req.ip || '',
// //             userAgent:
// //                 req.headers['user-agent'] ||
// //                 '',
// //         }).catch((error) => {
// //             console.error(
// //                 '[ActivityLog] Could not save login:',
// //                 error.message
// //             );
// //         });

// //         res.json({
// //             success: true,
// //             token: signToken(admin._id),

// //             admin: {
// //                 id: admin._id,
// //                 name: admin.name,
// //                 email: admin.email,
// //                 role: admin.role,
// //                 phone: admin.phone,
// //             },
// //         });
// //     }
// // );

// // // @route   GET /api/auth/me
// // // @access  Private
// // export const getMe = asyncHandler(
// //     async (req, res) => {
// //         res.json({
// //             success: true,

// //             admin: {
// //                 id: req.admin._id,
// //                 name: req.admin.name,
// //                 email: req.admin.email,
// //                 role: req.admin.role,
// //                 phone: req.admin.phone,
// //             },
// //         });
// //     }
// // );

// // // @route   POST /api/auth/forgot-password
// // // @access  Public
// // export const forgotPassword = asyncHandler(
// //     async (req, res) => {
// //         const email = String(
// //             req.body.email || ''
// //         )
// //             .trim()
// //             .toLowerCase();

// //         if (!email) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: 'Email is required',
// //             });
// //         }

// //         const admin =
// //             await Admin.findOne({ email });

// //         // Account exists કે નહીં તે જાહેર ન થાય
// //         if (!admin) {
// //             return res.json({
// //                 success: true,
// //                 message:
// //                     'If that admin account exists, a password reset email has been sent.',
// //             });
// //         }

// //         const transporter =
// //             getTransporter();

// //         if (!transporter) {
// //             return res.status(503).json({
// //                 success: false,
// //                 message:
// //                     'Email service is not configured.',
// //             });
// //         }

// //         const rawToken =
// //             crypto
// //                 .randomBytes(32)
// //                 .toString('hex');

// //         admin.resetPasswordToken =
// //             hashResetToken(rawToken);

// //         admin.resetPasswordExpires =
// //             new Date(
// //                 Date.now() + 30 * 60 * 1000
// //             );

// //         await admin.save({
// //             validateBeforeSave: false,
// //         });

// //         const resetUrl =
// //             `${getClientOrigin()}/admin?resetToken=${
// //                 encodeURIComponent(rawToken)
// //             }`;

// //         try {
// //             await transporter.sendMail({
// //                 from:
// //                     process.env.EMAIL_FROM ||
// //                     process.env.SMTP_USER,

// //                 to: admin.email,

// //                 subject:
// //                     'Reset your DevForge admin password',

// //                 html: `
// //                     <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#18201d;">
// //                         <h2>Reset your DevForge password</h2>

// //                         <p>
// //                             A password reset was requested
// //                             for your admin account.
// //                         </p>

// //                         <p style="margin:28px 0;">
// //                             <a
// //                                 href="${resetUrl}"
// //                                 style="background:#94ff24;color:#081008;padding:13px 20px;text-decoration:none;border-radius:6px;font-weight:700;"
// //                             >
// //                                 Reset password
// //                             </a>
// //                         </p>

// //                         <p>
// //                             This link expires in 30 minutes
// //                             and can only be used once.
// //                         </p>

// //                         <p>
// //                             If you did not request this,
// //                             you can safely ignore this email.
// //                         </p>
// //                     </div>
// //                 `,
// //             });
// //         } catch (error) {
// //             admin.resetPasswordToken =
// //                 undefined;

// //             admin.resetPasswordExpires =
// //                 undefined;

// //             await admin.save({
// //                 validateBeforeSave: false,
// //             });

// //             throw error;
// //         }

// //         res.json({
// //             success: true,
// //             message:
// //                 'If that admin account exists, a password reset email has been sent.',
// //         });
// //     }
// // );

// // // @route   POST /api/auth/reset-password/:token
// // // @access  Public
// // export const resetPassword = asyncHandler(
// //     async (req, res) => {
// //         const password = String(
// //             req.body.password || ''
// //         );

// //         if (password.length < 8) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message:
// //                     'Password must contain at least 8 characters.',
// //             });
// //         }

// //         const admin =
// //             await Admin.findOne({
// //                 resetPasswordToken:
// //                     hashResetToken(
// //                         req.params.token
// //                     ),

// //                 resetPasswordExpires: {
// //                     $gt: new Date(),
// //                 },
// //             }).select(
// //                 '+resetPasswordToken +resetPasswordExpires'
// //             );

// //         if (!admin) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message:
// //                     'Reset link is invalid or has expired.',
// //             });
// //         }

// //         admin.password = password;
// //         admin.resetPasswordToken =
// //             undefined;

// //         admin.resetPasswordExpires =
// //             undefined;

// //         await admin.save();

// //         res.json({
// //             success: true,
// //             message:
// //                 'Password reset successfully. Please sign in again.',
// //         });
// //     }
// // );
// import crypto from 'crypto';
// import jwt from 'jsonwebtoken';

// import Admin from '../models/Admin.js';
// import ActivityLog from '../models/ActivityLog.js';

// import asyncHandler from '../middleware/asyncHandler.js';
// import { getTransporter } from '../config/mailer.js';
// import { sendLoginOtpEmail } from '../utils/sendLoginOtpEmail.js';

// const signToken = (id) =>
//     jwt.sign(
//         {
//             id,
//             purpose: 'access',
//         },
//         process.env.JWT_SECRET,
//         {
//             expiresIn:
//                 process.env.JWT_EXPIRES_IN || '7d',
//         }
//     );

// const signOtpToken = (id) =>
//     jwt.sign(
//         {
//             id,
//             purpose: 'login-otp',
//         },
//         process.env.JWT_SECRET,
//         {
//             expiresIn: '10m',
//         }
//     );

// const hashLoginOtp = (otp) =>
//     crypto
//         .createHmac(
//             'sha256',
//             process.env.JWT_SECRET
//         )
//         .update(String(otp))
//         .digest('hex');

// const maskEmail = (email) => {
//     const [name, domain] =
//         String(email).split('@');

//     if (!domain) {
//         return email;
//     }

//     return `${name.slice(0, 2)}${'*'.repeat(
//         Math.max(2, name.length - 2)
//     )}@${domain}`;
// };

// const hashResetToken = (token) =>
//     crypto
//         .createHash('sha256')
//         .update(token)
//         .digest('hex');

// const getClientOrigin = () =>
//     (
//         process.env.CLIENT_ORIGIN ||
//         'http://localhost:5173'
//     )
//         .split(',')[0]
//         .trim()
//         .replace(/\/$/, '');

// // @route   POST /api/auth/login
// // @desc    Check password and send email OTP
// // @access  Public
// export const login = asyncHandler(
//     async (req, res) => {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     'Email and password are required',
//             });
//         }

//         const admin = await Admin.findOne({
//             email: email.toLowerCase(),
//         }).select('+password');

//         if (
//             !admin ||
//             !(await admin.comparePassword(password))
//         ) {
//             return res.status(401).json({
//                 success: false,
//                 message:
//                     'Invalid email or password',
//             });
//         }

//         const otp = String(
//             crypto.randomInt(100000, 1000000)
//         );

//         admin.loginOtpHash =
//             hashLoginOtp(otp);

//         admin.loginOtpExpires =
//             new Date(
//                 Date.now() + 10 * 60 * 1000
//             );

//         admin.loginOtpAttempts = 0;

//         await admin.save({
//             validateBeforeSave: false,
//         });

//         try {
//             await sendLoginOtpEmail({
//                 email: admin.email,
//                 name: admin.name,
//                 otp,
//             });
//         } catch (error) {
//             admin.loginOtpHash = undefined;
//             admin.loginOtpExpires = undefined;
//             admin.loginOtpAttempts = 0;

//             await admin.save({
//                 validateBeforeSave: false,
//             });

//             console.error(
//                 '[Auth] Could not send login OTP:',
//                 error.message
//             );

//             return res.status(503).json({
//                 success: false,
//                 message:
//                     'Could not send verification code. Please try again.',
//             });
//         }

//         res.json({
//             success: true,
//             requiresOtp: true,
//             otpToken:
//                 signOtpToken(admin._id),
//             email:
//                 maskEmail(admin.email),
//             message:
//                 'Verification code sent to your admin email.',
//         });
//     }
// );

// // @route   POST /api/auth/verify-login-otp
// // @desc    Verify email OTP and return admin JWT
// // @access  Public
// export const verifyLoginOtp = asyncHandler(
//     async (req, res) => {
//         const otpToken = String(
//             req.body.otpToken || ''
//         );

//         const otp = String(
//             req.body.otp || ''
//         ).trim();

//         if (
//             !otpToken ||
//             !/^\d{6}$/.test(otp)
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     'A valid 6-digit verification code is required.',
//             });
//         }

//         let decoded;

//         try {
//             decoded = jwt.verify(
//                 otpToken,
//                 process.env.JWT_SECRET
//             );
//         } catch {
//             return res.status(401).json({
//                 success: false,
//                 message:
//                     'Verification session has expired. Please sign in again.',
//             });
//         }

//         if (
//             decoded.purpose !== 'login-otp'
//         ) {
//             return res.status(401).json({
//                 success: false,
//                 message:
//                     'Invalid verification session.',
//             });
//         }

//         const admin =
//             await Admin.findById(
//                 decoded.id
//             ).select(
//                 '+loginOtpHash +loginOtpExpires +loginOtpAttempts'
//             );

//         if (
//             !admin ||
//             !admin.loginOtpHash ||
//             !admin.loginOtpExpires
//         ) {
//             return res.status(401).json({
//                 success: false,
//                 message:
//                     'Verification session is invalid. Please sign in again.',
//             });
//         }

//         if (
//             admin.loginOtpExpires.getTime() <
//             Date.now()
//         ) {
//             admin.loginOtpHash = undefined;
//             admin.loginOtpExpires = undefined;
//             admin.loginOtpAttempts = 0;

//             await admin.save({
//                 validateBeforeSave: false,
//             });

//             return res.status(401).json({
//                 success: false,
//                 message:
//                     'Verification code has expired. Please sign in again.',
//             });
//         }

//         if (
//             (admin.loginOtpAttempts || 0) >= 5
//         ) {
//             return res.status(429).json({
//                 success: false,
//                 message:
//                     'Too many incorrect attempts. Please sign in again.',
//             });
//         }

//         if (
//             hashLoginOtp(otp) !==
//             admin.loginOtpHash
//         ) {
//             admin.loginOtpAttempts =
//                 (admin.loginOtpAttempts || 0) + 1;

//             await admin.save({
//                 validateBeforeSave: false,
//             });

//             return res.status(401).json({
//                 success: false,
//                 message:
//                     'Incorrect verification code.',
//                 attemptsRemaining:
//                     Math.max(
//                         0,
//                         5 -
//                             admin.loginOtpAttempts
//                     ),
//             });
//         }

//         admin.loginOtpHash = undefined;
//         admin.loginOtpExpires = undefined;
//         admin.loginOtpAttempts = 0;
//         admin.lastLogin = new Date();

//         await admin.save({
//             validateBeforeSave: false,
//         });

//         ActivityLog.create({
//             admin: admin._id,
//             adminName: admin.name,
//             adminEmail: admin.email,
//             action: 'auth.login',
//             method: 'POST',
//             path:
//                 '/api/auth/verify-login-otp',
//             resource: 'auth',
//             statusCode: 200,
//             ip: req.ip || '',
//             userAgent:
//                 req.headers['user-agent'] ||
//                 '',
//         }).catch((error) => {
//             console.error(
//                 '[ActivityLog] Could not save login:',
//                 error.message
//             );
//         });

//         res.json({
//             success: true,
//             token:
//                 signToken(admin._id),

//             admin: {
//                 id: admin._id,
//                 name: admin.name,
//                 email: admin.email,
//                 role: admin.role,
//                 phone: admin.phone,
//             },
//         });
//     }
// );

// // @route   POST /api/auth/resend-login-otp
// // @desc    Send a new admin login OTP
// // @access  Public
// export const resendLoginOtp = asyncHandler(
//     async (req, res) => {
//         const otpToken = String(
//             req.body.otpToken || ''
//         );

//         if (!otpToken) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     'Verification session is required.',
//             });
//         }

//         let decoded;

//         try {
//             decoded = jwt.verify(
//                 otpToken,
//                 process.env.JWT_SECRET
//             );
//         } catch {
//             return res.status(401).json({
//                 success: false,
//                 message:
//                     'Verification session has expired. Please sign in again.',
//             });
//         }

//         if (
//             decoded.purpose !== 'login-otp'
//         ) {
//             return res.status(401).json({
//                 success: false,
//                 message:
//                     'Invalid verification session.',
//             });
//         }

//         const admin =
//             await Admin.findById(
//                 decoded.id
//             );

//         if (!admin) {
//             return res.status(401).json({
//                 success: false,
//                 message:
//                     'Admin account was not found.',
//             });
//         }

//         const otp = String(
//             crypto.randomInt(100000, 1000000)
//         );

//         admin.loginOtpHash =
//             hashLoginOtp(otp);

//         admin.loginOtpExpires =
//             new Date(
//                 Date.now() + 10 * 60 * 1000
//             );

//         admin.loginOtpAttempts = 0;

//         await admin.save({
//             validateBeforeSave: false,
//         });

//         try {
//             await sendLoginOtpEmail({
//                 email: admin.email,
//                 name: admin.name,
//                 otp,
//             });
//         } catch (error) {
//             admin.loginOtpHash = undefined;
//             admin.loginOtpExpires = undefined;
//             admin.loginOtpAttempts = 0;

//             await admin.save({
//                 validateBeforeSave: false,
//             });

//             console.error(
//                 '[Auth] Could not resend login OTP:',
//                 error.message
//             );

//             return res.status(503).json({
//                 success: false,
//                 message:
//                     'Could not resend verification code. Please try again.',
//             });
//         }

//         res.json({
//             success: true,

//             otpToken:
//                 signOtpToken(admin._id),

//             email:
//                 maskEmail(admin.email),

//             message:
//                 'A new verification code has been sent to your email.',
//         });
//     }
// );

// // @route   GET /api/auth/me
// // @access  Private
// export const getMe = asyncHandler(
//     async (req, res) => {
//         res.json({
//             success: true,

//             admin: {
//                 id: req.admin._id,
//                 name: req.admin.name,
//                 email: req.admin.email,
//                 role: req.admin.role,
//                 phone: req.admin.phone,
//             },
//         });
//     }
// );

// // @route   POST /api/auth/forgot-password
// // @access  Public
// export const forgotPassword = asyncHandler(
//     async (req, res) => {
//         const email = String(
//             req.body.email || ''
//         )
//             .trim()
//             .toLowerCase();

//         if (!email) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     'Email is required',
//             });
//         }

//         const admin =
//             await Admin.findOne({
//                 email,
//             });

//         // Account exists કે નહીં તે જાહેર નહીં કરે
//         if (!admin) {
//             return res.json({
//                 success: true,
//                 message:
//                     'If that admin account exists, a password reset email has been sent.',
//             });
//         }

//         const transporter =
//             getTransporter();

//         if (!transporter) {
//             return res.status(503).json({
//                 success: false,
//                 message:
//                     'Email service is not configured.',
//             });
//         }

//         const rawToken =
//             crypto
//                 .randomBytes(32)
//                 .toString('hex');

//         admin.resetPasswordToken =
//             hashResetToken(rawToken);

//         admin.resetPasswordExpires =
//             new Date(
//                 Date.now() +
//                     30 * 60 * 1000
//             );

//         await admin.save({
//             validateBeforeSave: false,
//         });

//         const resetUrl =
//             `${getClientOrigin()}/admin?resetToken=${
//                 encodeURIComponent(rawToken)
//             }`;

//         try {
//             await transporter.sendMail({
//                 from:
//                     process.env.EMAIL_FROM ||
//                     process.env.SMTP_USER,

//                 to:
//                     admin.email,

//                 subject:
//                     'Reset your DevForge admin password',

//                 html: `
//                     <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#18201d;">
//                         <h2>
//                             Reset your DevForge password
//                         </h2>

//                         <p>
//                             A password reset was requested
//                             for your admin account.
//                         </p>

//                         <p style="margin:28px 0;">
//                             <a
//                                 href="${resetUrl}"
//                                 style="background:#94ff24;color:#081008;padding:13px 20px;text-decoration:none;border-radius:6px;font-weight:700;"
//                                 color:#081008;
//                                 padding:13px 20px;
//                                 text-decoration:none;
//                                 border-radius:6px;
//                                 font-weight:700;"
//                             >
//                                 Reset password
//                             </a>
//                         </p>

//                         <p>
//                             This link expires in 30 minutes
//                             and can only be used once.
//                         </p>

//                         <p>
//                             If you did not request this,
//                             you can safely ignore this email.
//                         </p>
//                     </div>
//                 `,
//             });
//         } catch (error) {
//             admin.resetPasswordToken =
//                 undefined;

//             admin.resetPasswordExpires =
//                 undefined;

//             await admin.save({
//                 validateBeforeSave: false,
//             });

//             throw error;
//         }

//         res.json({
//             success: true,
//             message:
//                 'If that admin account exists, a password reset email has been sent.',
//         });
//     }
// );

// // @route   POST /api/auth/reset-password/:token
// // @access  Public
// export const resetPassword = asyncHandler(
//     async (req, res) => {
//         const password = String(
//             req.body.password || ''
//         );

//         if (password.length < 8) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     'Password must contain at least 8 characters.',
//             });
//         }

//         const admin =
//             await Admin.findOne({
//                 resetPasswordToken:
//                     hashResetToken(
//                         req.params.token
//                     ),

//                 resetPasswordExpires: {
//                     $gt: new Date(),
//                 },
//             }).select(
//                 '+resetPasswordToken +resetPasswordExpires'
//             );

//         if (!admin) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     'Reset link is invalid or has expired.',
//             });
//         }

//         admin.password =
//             password;

//         admin.resetPasswordToken =
//             undefined;

//         admin.resetPasswordExpires =
//             undefined;

//         await admin.save();

//         res.json({
//             success: true,
//             message:
//                 'Password reset successfully. Please sign in again.',
//         });
//     }
// );
// import crypto from 'crypto';
// import jwt from 'jsonwebtoken';

// import Admin from '../models/Admin.js';
// import ActivityLog from '../models/ActivityLog.js';

// import asyncHandler from '../middleware/asyncHandler.js';
// import { getTransporter } from '../config/mailer.js';
// import { sendLoginOtpEmail } from '../utils/sendLoginOtpEmail.js';

// const signToken = (id) =>
//     jwt.sign(
//         {
//             id,
//             purpose: 'access',
//         },
//         process.env.JWT_SECRET,
//         {
//             expiresIn:
//                 process.env.JWT_EXPIRES_IN || '7d',
//         }
//     );

// const signOtpToken = (id) =>
//     jwt.sign(
//         {
//             id,
//             purpose: 'login-otp',
//         },
//         process.env.JWT_SECRET,
//         {
//             expiresIn: '10m',
//         }
//     );

// const hashLoginOtp = (otp) =>
//     crypto
//         .createHmac(
//             'sha256',
//             process.env.JWT_SECRET
//         )
//         .update(String(otp))
//         .digest('hex');

// const maskEmail = (email) => {
//     const [name, domain] =
//         String(email).split('@');

//     if (!domain) {
//         return email;
//     }

//     return `${name.slice(0, 2)}${'*'.repeat(
//         Math.max(2, name.length - 2)
//     )}@${domain}`;
// };

// const hashResetToken = (token) =>
//     crypto
//         .createHash('sha256')
//         .update(token)
//         .digest('hex');

// const getClientOrigin = () =>
//     (
//         process.env.CLIENT_ORIGIN ||
//         'http://localhost:5173'
//     )
//         .split(',')[0]
//         .trim()
//         .replace(/\/$/, '');

// // @route   POST /api/auth/login
// // @desc    Check password and send email OTP
// // @access  Public
// export const login = asyncHandler(
//     async (req, res) => {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     'Email and password are required',
//             });
//         }

//         const admin = await Admin.findOne({
//             email: email.toLowerCase(),
//         }).select('+password');

//         if (
//             !admin ||
//             !(await admin.comparePassword(password))
//         ) {
//             return res.status(401).json({
//                 success: false,
//                 message:
//                     'Invalid email or password',
//             });
//         }

//         const otp = String(
//             crypto.randomInt(100000, 1000000)
//         );

//         admin.loginOtpHash =
//             hashLoginOtp(otp);

//         admin.loginOtpExpires =
//             new Date(
//                 Date.now() + 10 * 60 * 1000
//             );

//         admin.loginOtpAttempts = 0;

//         await admin.save({
//             validateBeforeSave: false,
//         });

//         try {
//             await sendLoginOtpEmail({
//                 email: admin.email,
//                 name: admin.name,
//                 otp,
//             });
//         } catch (error) {
//             admin.loginOtpHash = undefined;
//             admin.loginOtpExpires = undefined;
//             admin.loginOtpAttempts = 0;

//             await admin.save({
//                 validateBeforeSave: false,
//             });

//             console.error(
//                 '[Auth] Could not send login OTP:',
//                 error.message
//             );

//             return res.status(503).json({
//                 success: false,
//                 message:
//                     'Could not send verification code. Please try again.',
//             });
//         }

//         res.json({
//             success: true,
//             requiresOtp: true,
//             otpToken: signOtpToken(admin._id),
//             email: maskEmail(admin.email),
//             message:
//                 'Verification code sent to your admin email.',
//         });
//     }
// );

// // @route   POST /api/auth/verify-login-otp
// // @desc    Verify email OTP and return admin JWT
// // @access  Public
// export const verifyLoginOtp = asyncHandler(
//     async (req, res) => {
//         const otpToken = String(
//             req.body.otpToken || ''
//         );

//         const otp = String(
//             req.body.otp || ''
//         ).trim();

//         if (
//             !otpToken ||
//             !/^\d{6}$/.test(otp)
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     'A valid 6-digit verification code is required.',
//             });
//         }

//         let decoded;

//         try {
//             decoded = jwt.verify(
//                 otpToken,
//                 process.env.JWT_SECRET
//             );
//         } catch {
//             return res.status(401).json({
//                 success: false,
//                 message:
//                     'Verification session has expired. Please sign in again.',
//             });
//         }

//         if (
//             decoded.purpose !== 'login-otp'
//         ) {
//             return res.status(401).json({
//                 success: false,
//                 message:
//                     'Invalid verification session.',
//             });
//         }

//         const admin =
//             await Admin.findById(
//                 decoded.id
//             ).select(
//                 '+loginOtpHash +loginOtpExpires +loginOtpAttempts'
//             );

//         if (
//             !admin ||
//             !admin.loginOtpHash ||
//             !admin.loginOtpExpires
//         ) {
//             return res.status(401).json({
//                 success: false,
//                 message:
//                     'Verification session is invalid. Please sign in again.',
//             });
//         }

//         if (
//             admin.loginOtpExpires.getTime() <
//             Date.now()
//         ) {
//             admin.loginOtpHash = undefined;
//             admin.loginOtpExpires = undefined;
//             admin.loginOtpAttempts = 0;

//             await admin.save({
//                 validateBeforeSave: false,
//             });

//             return res.status(401).json({
//                 success: false,
//                 message:
//                     'Verification code has expired. Please sign in again.',
//             });
//         }

//         if (
//             (admin.loginOtpAttempts || 0) >= 5
//         ) {
//             return res.status(429).json({
//                 success: false,
//                 message:
//                     'Too many incorrect attempts. Please sign in again.',
//             });
//         }

//         if (
//             hashLoginOtp(otp) !==
//             admin.loginOtpHash
//         ) {
//             admin.loginOtpAttempts =
//                 (admin.loginOtpAttempts || 0) + 1;

//             await admin.save({
//                 validateBeforeSave: false,
//             });

//             return res.status(401).json({
//                 success: false,
//                 message:
//                     'Incorrect verification code.',
//                 attemptsRemaining:
//                     Math.max(
//                         0,
//                         5 -
//                             admin.loginOtpAttempts
//                     ),
//             });
//         }

//         admin.loginOtpHash = undefined;
//         admin.loginOtpExpires = undefined;
//         admin.loginOtpAttempts = 0;
//         admin.lastLogin = new Date();

//         await admin.save({
//             validateBeforeSave: false,
//         });

//         ActivityLog.create({
//             admin: admin._id,
//             adminName: admin.name,
//             adminEmail: admin.email,
//             action: 'auth.login',
//             method: 'POST',
//             path:
//                 '/api/auth/verify-login-otp',
//             resource: 'auth',
//             statusCode: 200,
//             ip: req.ip || '',
//             userAgent:
//                 req.headers['user-agent'] ||
//                 '',
//         }).catch((error) => {
//             console.error(
//                 '[ActivityLog] Could not save login:',
//                 error.message
//             );
//         });

//         res.json({
//             success: true,
//             token: signToken(admin._id),

//             admin: {
//                 id: admin._id,
//                 name: admin.name,
//                 email: admin.email,
//                 role: admin.role,
//                 phone: admin.phone,
//             },
//         });
//     }
// );

// // @route   GET /api/auth/me
// // @access  Private
// export const getMe = asyncHandler(
//     async (req, res) => {
//         res.json({
//             success: true,

//             admin: {
//                 id: req.admin._id,
//                 name: req.admin.name,
//                 email: req.admin.email,
//                 role: req.admin.role,
//                 phone: req.admin.phone,
//             },
//         });
//     }
// );

// // @route   POST /api/auth/forgot-password
// // @access  Public
// export const forgotPassword = asyncHandler(
//     async (req, res) => {
//         const email = String(
//             req.body.email || ''
//         )
//             .trim()
//             .toLowerCase();

//         if (!email) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Email is required',
//             });
//         }

//         const admin =
//             await Admin.findOne({ email });

//         // Account exists કે નહીં તે જાહેર ન થાય
//         if (!admin) {
//             return res.json({
//                 success: true,
//                 message:
//                     'If that admin account exists, a password reset email has been sent.',
//             });
//         }

//         const transporter =
//             getTransporter();

//         if (!transporter) {
//             return res.status(503).json({
//                 success: false,
//                 message:
//                     'Email service is not configured.',
//             });
//         }

//         const rawToken =
//             crypto
//                 .randomBytes(32)
//                 .toString('hex');

//         admin.resetPasswordToken =
//             hashResetToken(rawToken);

//         admin.resetPasswordExpires =
//             new Date(
//                 Date.now() + 30 * 60 * 1000
//             );

//         await admin.save({
//             validateBeforeSave: false,
//         });

//         const resetUrl =
//             `${getClientOrigin()}/admin?resetToken=${
//                 encodeURIComponent(rawToken)
//             }`;

//         try {
//             await transporter.sendMail({
//                 from:
//                     process.env.EMAIL_FROM ||
//                     process.env.SMTP_USER,

//                 to: admin.email,

//                 subject:
//                     'Reset your DevForge admin password',

//                 html: `
//                     <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#18201d;">
//                         <h2>Reset your DevForge password</h2>

//                         <p>
//                             A password reset was requested
//                             for your admin account.
//                         </p>

//                         <p style="margin:28px 0;">
//                             <a
//                                 href="${resetUrl}"
//                                 style="background:#94ff24;color:#081008;padding:13px 20px;text-decoration:none;border-radius:6px;font-weight:700;"
//                             >
//                                 Reset password
//                             </a>
//                         </p>

//                         <p>
//                             This link expires in 30 minutes
//                             and can only be used once.
//                         </p>

//                         <p>
//                             If you did not request this,
//                             you can safely ignore this email.
//                         </p>
//                     </div>
//                 `,
//             });
//         } catch (error) {
//             admin.resetPasswordToken =
//                 undefined;

//             admin.resetPasswordExpires =
//                 undefined;

//             await admin.save({
//                 validateBeforeSave: false,
//             });

//             throw error;
//         }

//         res.json({
//             success: true,
//             message:
//                 'If that admin account exists, a password reset email has been sent.',
//         });
//     }
// );

// // @route   POST /api/auth/reset-password/:token
// // @access  Public
// export const resetPassword = asyncHandler(
//     async (req, res) => {
//         const password = String(
//             req.body.password || ''
//         );

//         if (password.length < 8) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     'Password must contain at least 8 characters.',
//             });
//         }

//         const admin =
//             await Admin.findOne({
//                 resetPasswordToken:
//                     hashResetToken(
//                         req.params.token
//                     ),

//                 resetPasswordExpires: {
//                     $gt: new Date(),
//                 },
//             }).select(
//                 '+resetPasswordToken +resetPasswordExpires'
//             );

//         if (!admin) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     'Reset link is invalid or has expired.',
//             });
//         }

//         admin.password = password;
//         admin.resetPasswordToken =
//             undefined;

//         admin.resetPasswordExpires =
//             undefined;

//         await admin.save();

//         res.json({
//             success: true,
//             message:
//                 'Password reset successfully. Please sign in again.',
//         });
//     }
// );
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import Admin from '../models/Admin.js';
import ActivityLog from '../models/ActivityLog.js';

import asyncHandler from '../middleware/asyncHandler.js';
import { getTransporter } from '../config/mailer.js';
import { sendLoginOtpEmail } from '../utils/sendLoginOtpEmail.js';

const signToken = (id) =>
    jwt.sign(
        {
            id,
            purpose: 'access',
        },
        process.env.JWT_SECRET,
        {
            expiresIn:
                process.env.JWT_EXPIRES_IN || '7d',
        }
    );

const signOtpToken = (id) =>
    jwt.sign(
        {
            id,
            purpose: 'login-otp',
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '10m',
        }
    );

const hashLoginOtp = (otp) =>
    crypto
        .createHmac(
            'sha256',
            process.env.JWT_SECRET
        )
        .update(String(otp))
        .digest('hex');

const maskEmail = (email) => {
    const [name, domain] =
        String(email).split('@');

    if (!domain) {
        return email;
    }

    return `${name.slice(0, 2)}${'*'.repeat(
        Math.max(2, name.length - 2)
    )}@${domain}`;
};

const hashResetToken = (token) =>
    crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

const getClientOrigin = () =>
    (
        process.env.CLIENT_ORIGIN ||
        'http://localhost:5173'
    )
        .split(',')[0]
        .trim()
        .replace(/\/$/, '');

// @route   POST /api/auth/login
// @desc    Check password and send email OTP
// @access  Public
export const login = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message:
                    'Email and password are required',
            });
        }

        const admin = await Admin.findOne({
            email: email.toLowerCase(),
        }).select('+password');

        if (
            !admin ||
            !(await admin.comparePassword(password))
        ) {
            return res.status(401).json({
                success: false,
                message:
                    'Invalid email or password',
            });
        }

        admin.lastLogin = new Date();

        await admin.save({
            validateBeforeSave: false,
        });

        ActivityLog.create({
            admin: admin._id,
            adminName: admin.name,
            adminEmail: admin.email,
            action: 'auth.login',
            method: 'POST',
            path: '/api/auth/login',
            resource: 'auth',
            statusCode: 200,
            ip: req.ip || '',
            userAgent:
                req.headers['user-agent'] || '',
        }).catch((error) => {
            console.error(
                '[ActivityLog] Could not save login:',
                error.message
            );
        });

        res.json({
            success: true,
            token: signToken(admin._id),

            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                phone: admin.phone,
            },
        });
    }
);

// @route   POST /api/auth/verify-login-otp
// @desc    Verify email OTP and return admin JWT
// @access  Public
export const verifyLoginOtp = asyncHandler(
    async (req, res) => {
        const otpToken = String(
            req.body.otpToken || ''
        );

        const otp = String(
            req.body.otp || ''
        ).trim();

        if (
            !otpToken ||
            !/^\d{6}$/.test(otp)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    'A valid 6-digit verification code is required.',
            });
        }

        let decoded;

        try {
            decoded = jwt.verify(
                otpToken,
                process.env.JWT_SECRET
            );
        } catch {
            return res.status(401).json({
                success: false,
                message:
                    'Verification session has expired. Please sign in again.',
            });
        }

        if (
            decoded.purpose !== 'login-otp'
        ) {
            return res.status(401).json({
                success: false,
                message:
                    'Invalid verification session.',
            });
        }

        const admin =
            await Admin.findById(
                decoded.id
            ).select(
                '+loginOtpHash +loginOtpExpires +loginOtpAttempts'
            );

        if (
            !admin ||
            !admin.loginOtpHash ||
            !admin.loginOtpExpires
        ) {
            return res.status(401).json({
                success: false,
                message:
                    'Verification session is invalid. Please sign in again.',
            });
        }

        if (
            admin.loginOtpExpires.getTime() <
            Date.now()
        ) {
            admin.loginOtpHash = undefined;
            admin.loginOtpExpires = undefined;
            admin.loginOtpAttempts = 0;

            await admin.save({
                validateBeforeSave: false,
            });

            return res.status(401).json({
                success: false,
                message:
                    'Verification code has expired. Please sign in again.',
            });
        }

        if (
            (admin.loginOtpAttempts || 0) >= 5
        ) {
            return res.status(429).json({
                success: false,
                message:
                    'Too many incorrect attempts. Please sign in again.',
            });
        }

        if (
            hashLoginOtp(otp) !==
            admin.loginOtpHash
        ) {
            admin.loginOtpAttempts =
                (admin.loginOtpAttempts || 0) + 1;

            await admin.save({
                validateBeforeSave: false,
            });

            return res.status(401).json({
                success: false,
                message:
                    'Incorrect verification code.',
                attemptsRemaining:
                    Math.max(
                        0,
                        5 -
                            admin.loginOtpAttempts
                    ),
            });
        }

        admin.loginOtpHash = undefined;
        admin.loginOtpExpires = undefined;
        admin.loginOtpAttempts = 0;
        admin.lastLogin = new Date();

        await admin.save({
            validateBeforeSave: false,
        });

        ActivityLog.create({
            admin: admin._id,
            adminName: admin.name,
            adminEmail: admin.email,
            action: 'auth.login',
            method: 'POST',
            path:
                '/api/auth/verify-login-otp',
            resource: 'auth',
            statusCode: 200,
            ip: req.ip || '',
            userAgent:
                req.headers['user-agent'] ||
                '',
        }).catch((error) => {
            console.error(
                '[ActivityLog] Could not save login:',
                error.message
            );
        });

        res.json({
            success: true,
            token:
                signToken(admin._id),

            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                phone: admin.phone,
            },
        });
    }
);

// @route   POST /api/auth/resend-login-otp
// @desc    Send a new admin login OTP
// @access  Public
export const resendLoginOtp = asyncHandler(
    async (req, res) => {
        const otpToken = String(
            req.body.otpToken || ''
        );

        if (!otpToken) {
            return res.status(400).json({
                success: false,
                message:
                    'Verification session is required.',
            });
        }

        let decoded;

        try {
            decoded = jwt.verify(
                otpToken,
                process.env.JWT_SECRET
            );
        } catch {
            return res.status(401).json({
                success: false,
                message:
                    'Verification session has expired. Please sign in again.',
            });
        }

        if (
            decoded.purpose !== 'login-otp'
        ) {
            return res.status(401).json({
                success: false,
                message:
                    'Invalid verification session.',
            });
        }

        const admin =
            await Admin.findById(
                decoded.id
            );

        if (!admin) {
            return res.status(401).json({
                success: false,
                message:
                    'Admin account was not found.',
            });
        }

        const otp = String(
            crypto.randomInt(100000, 1000000)
        );

        admin.loginOtpHash =
            hashLoginOtp(otp);

        admin.loginOtpExpires =
            new Date(
                Date.now() + 10 * 60 * 1000
            );

        admin.loginOtpAttempts = 0;

        await admin.save({
            validateBeforeSave: false,
        });

        try {
            await sendLoginOtpEmail({
                email: admin.email,
                name: admin.name,
                otp,
            });
        } catch (error) {
            admin.loginOtpHash = undefined;
            admin.loginOtpExpires = undefined;
            admin.loginOtpAttempts = 0;

            await admin.save({
                validateBeforeSave: false,
            });

            console.error(
                '[Auth] Could not resend login OTP:',
                error.message
            );

            return res.status(503).json({
                success: false,
                message:
                    'Could not resend verification code. Please try again.',
            });
        }

        res.json({
            success: true,

            otpToken:
                signOtpToken(admin._id),

            email:
                maskEmail(admin.email),

            message:
                'A new verification code has been sent to your email.',
        });
    }
);

// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(
    async (req, res) => {
        res.json({
            success: true,

            admin: {
                id: req.admin._id,
                name: req.admin.name,
                email: req.admin.email,
                role: req.admin.role,
                phone: req.admin.phone,
            },
        });
    }
);

// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(
    async (req, res) => {
        const email = String(
            req.body.email || ''
        )
            .trim()
            .toLowerCase();

        if (!email) {
            return res.status(400).json({
                success: false,
                message:
                    'Email is required',
            });
        }

        const admin =
            await Admin.findOne({
                email,
            });

        // Account exists કે નહીં તે જાહેર નહીં કરે
        if (!admin) {
            return res.json({
                success: true,
                message:
                    'If that admin account exists, a password reset email has been sent.',
            });
        }

        const transporter =
            getTransporter();

        if (!transporter) {
            return res.status(503).json({
                success: false,
                message:
                    'Email service is not configured.',
            });
        }

        const rawToken =
            crypto
                .randomBytes(32)
                .toString('hex');

        admin.resetPasswordToken =
            hashResetToken(rawToken);

        admin.resetPasswordExpires =
            new Date(
                Date.now() +
                    30 * 60 * 1000
            );

        await admin.save({
            validateBeforeSave: false,
        });

        const resetUrl =
            `${getClientOrigin()}/admin?resetToken=${
                encodeURIComponent(rawToken)
            }`;

        try {
            await transporter.sendMail({
                from:
                    process.env.EMAIL_FROM ||
                    process.env.SMTP_USER,

                to:
                    admin.email,

                subject:
                    'Reset your DevForge admin password',

                html: `
                    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#18201d;">
                        <h2>
                            Reset your DevForge password
                        </h2>

                        <p>
                            A password reset was requested
                            for your admin account.
                        </p>

                        <p style="margin:28px 0;">
                            <a
                                href="${resetUrl}"
                                style="background:#94ff24;color:#081008;padding:13px 20px;text-decoration:none;border-radius:6px;font-weight:700;"
                                color:#081008;
                                padding:13px 20px;
                                text-decoration:none;
                                border-radius:6px;
                                font-weight:700;"
                            >
                                Reset password
                            </a>
                        </p>

                        <p>
                            This link expires in 30 minutes
                            and can only be used once.
                        </p>

                        <p>
                            If you did not request this,
                            you can safely ignore this email.
                        </p>
                    </div>
                `,
            });
        } catch (error) {
            admin.resetPasswordToken =
                undefined;

            admin.resetPasswordExpires =
                undefined;

            await admin.save({
                validateBeforeSave: false,
            });

            throw error;
        }

        res.json({
            success: true,
            message:
                'If that admin account exists, a password reset email has been sent.',
        });
    }
);

// @route   POST /api/auth/reset-password/:token
// @access  Public
export const resetPassword = asyncHandler(
    async (req, res) => {
        const password = String(
            req.body.password || ''
        );

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message:
                    'Password must contain at least 8 characters.',
            });
        }

        const admin =
            await Admin.findOne({
                resetPasswordToken:
                    hashResetToken(
                        req.params.token
                    ),

                resetPasswordExpires: {
                    $gt: new Date(),
                },
            }).select(
                '+resetPasswordToken +resetPasswordExpires'
            );

        if (!admin) {
            return res.status(400).json({
                success: false,
                message:
                    'Reset link is invalid or has expired.',
            });
        }

        admin.password =
            password;

        admin.resetPasswordToken =
            undefined;

        admin.resetPasswordExpires =
            undefined;

        await admin.save();

        res.json({
            success: true,
            message:
                'Password reset successfully. Please sign in again.',
        });
    }
);