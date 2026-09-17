import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },

        name: {
            type: String,
            default: 'Admin',
            trim: true,
        },

        role: {
            type: String,
            enum: ['super-admin', 'admin'],
            default: 'admin',
        },

        phone: {
            type: String,
            default: '',
            trim: true,
        },

        lastLogin: Date,

        /*
         * Email login OTP
         * Databaseમાં original OTP નહીં,
         * ફક્ત તેનું secure hash store થશે.
         */
        loginOtpHash: {
            type: String,
            select: false,
            default: undefined,
        },

        loginOtpExpires: {
            type: Date,
            select: false,
            default: undefined,
        },

        loginOtpAttempts: {
            type: Number,
            select: false,
            default: 0,
        },

        /*
         * Forgot-password reset information
         */
        resetPasswordToken: {
            type: String,
            select: false,
            default: undefined,
        },

        resetPasswordExpires: {
            type: Date,
            select: false,
            default: undefined,
        },
    },
    {
        timestamps: true,
    }
);

adminSchema.pre(
    'save',
    async function hashPassword(next) {
        if (!this.isModified('password')) {
            return next();
        }

        const salt = await bcrypt.genSalt(10);

        this.password = await bcrypt.hash(
            this.password,
            salt
        );

        next();
    }
);

adminSchema.methods.comparePassword =
    function comparePassword(candidate) {
        return bcrypt.compare(
            candidate,
            this.password
        );
    };

const Admin = mongoose.model(
    'Admin',
    adminSchema
);

export default Admin;