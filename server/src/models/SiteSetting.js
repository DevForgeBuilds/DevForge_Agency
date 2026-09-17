import mongoose from 'mongoose';

const siteSettingSchema = new mongoose.Schema({
    key: { type: String, default: 'main', unique: true },
    heroTitle: { type: String, default: 'WE FORGE DIGITAL EXPERIENCES' },
    heroSubtitle: { type: String, default: '' },
    aboutTitle: { type: String, default: 'About DevForge' },
    aboutText: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    logo: { type: String, default: '' },
    backgroundVideo: { type: String, default: '' },
    socialLinks: { instagram: String, linkedin: String, github: String, youtube: String },
}, { timestamps: true });

export default mongoose.model('SiteSetting', siteSettingSchema);
