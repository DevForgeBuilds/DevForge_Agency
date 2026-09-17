import { FormEvent, useEffect, useRef, useState } from 'react';
import { initContactAnimation } from '../../animations/contactAnimation';
import {
    submitInquiry,
    type ProjectInquiry,
} from '../../lib/inquiries';

import './Contact.css';


const SERVICES = [
    'Web UI / UX Design',
    'Web Development',
    'Full-Stack MERN',
    'Frontend Engineering',
    'Backend & APIs',
    'Admin Dashboard',
    'Automation',
    'AI Integration',
    'Other',
];

const TIMELINES = [
    'ASAP',
    '2–4 weeks',
    '1–2 months',
    '2–3 months',
    'Just exploring',
];

const INITIAL_FORM: ProjectInquiry = {
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    serviceOther: '',
    timeline: '',
    website: '',
    message: '',
};

const Contact = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    const [form, setForm] =
        useState<ProjectInquiry>(INITIAL_FORM);

    const [submitting, setSubmitting] =
        useState(false);

    const [submitted, setSubmitted] =
        useState(false);

    const [projectId, setProjectId] =
        useState('');

    const [error, setError] =
        useState('');

    const [focusedField, setFocusedField] =
        useState<string | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const cleanup =
            initContactAnimation(sectionRef.current);

        return () => {
            if (typeof cleanup === 'function') {
                cleanup();
            }
        };
    }, []);

    const updateField = (
        field: keyof ProjectInquiry,
        value: string
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        if (error) {
            setError('');
        }
    };

    const validate = () => {
        if (!form.name.trim()) {
            return 'Please enter your name.';
        }

        if (!form.email.trim()) {
            return 'Please enter your email.';
        }

        if (
            !/^\S+@\S+\.\S+$/.test(
                form.email.trim()
            )
        ) {
            return 'Please enter a valid email address.';
        }

        if (!form.phone.trim()) {
            return 'Please enter your phone number.';
        }

        if (
            !/^\+?[0-9\s()-]{7,18}$/.test(
                form.phone.trim()
            )
        ) {
            return 'Please enter a valid phone number.';
        }

        if (!form.service) {
            return 'Please select a service.';
        }

        if (
            form.service === 'Other' &&
            !form.serviceOther.trim()
        ) {
            return 'Please tell us what you need.';
        }

        if (!form.message.trim()) {
            return 'Please tell us a little about your project.';
        }

        return '';
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (submitting) return;

        const validationError = validate();

        if (validationError) {
            setError(validationError);
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const response = await submitInquiry({
                name: form.name.trim(),
                company: form.company.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                service: form.service,
                serviceOther: form.serviceOther.trim(),
                timeline: form.timeline.trim(),
                website: form.website.trim(),
                message: form.message.trim(),
            });

            if (
                response.success &&
                response.data?.projectId
            ) {
                setProjectId(
                    response.data.projectId
                );
            }

            setSubmitted(true);
            setForm(INITIAL_FORM);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Something went wrong. Please try again.'
            );
        } finally {
            setSubmitting(false);
        }
    };

    const closeSuccess = () => {
        setSubmitted(false);
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="contact"
        >
            <div className="contact__grid" />

            <div className="contact__inner">

                {/* TOP BAR */}
                <div className="contact__top">
                    <span className="contact__index">
                        07
                    </span>

                    <span className="contact__label">
                        CONTACT
                    </span>

                    <span className="contact__top-line" />

                    <span className="contact__availability">
                        AVAILABLE FOR NEW PROJECTS
                    </span>
                </div>

                <div className="contact__layout">

                    {/* LEFT SIDE */}
                    <aside className="contact__intro">

                        <div className="contact__headline-wrap">
                            <p className="contact__eyebrow">
                                HAVE A PROJECT IN MIND?
                            </p>

                            <h2 className="contact__headline">
                                LET'S
                                <br />
                                BUILD
                                <br />
                                <span>IT.</span>
                            </h2>
                        </div>

                        <div className="contact__intro-copy">
                            <p>
                                Tell us what you're building,
                                what you're trying to solve,
                                and where you want to take it.
                            </p>

                            <p>
                                We'll turn the conversation
                                into a clear technical direction.
                            </p>
                        </div>

                        {/* WHAT WE DO */}
                        <div className="contact__info-block">
                            <div className="contact__info-heading">
                                <span>01</span>
                                <span>WHAT WE DO</span>
                            </div>

                            <div className="contact__services">
                                <span>WEB DESIGN</span>
                                <span>DEVELOPMENT</span>
                                <span>FULL-STACK</span>
                                <span>APIs &amp; SYSTEMS</span>
                                <span>DASHBOARDS</span>
                                <span>AUTOMATION</span>
                                <span>AI INTEGRATION</span>
                            </div>
                        </div>

                        {/* PROCESS */}
                        <div className="contact__info-block">
                            <div className="contact__info-heading">
                                <span>02</span>
                                <span>HOW IT STARTS</span>
                            </div>

                            <div className="contact__steps">

                                <div className="contact__step">
                                    <span>01</span>
                                    <p>
                                        You share the idea.
                                    </p>
                                </div>

                                <div className="contact__step">
                                    <span>02</span>
                                    <p>
                                        We understand the problem.
                                    </p>
                                </div>

                                <div className="contact__step">
                                    <span>03</span>
                                    <p>
                                        We define the right solution.
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* BOTTOM INFO */}
                        <div className="contact__intro-footer">

                            <div>
                                <span>RESPONSE</span>
                                <strong>
                                    WITHIN 24–48H
                                </strong>
                            </div>

                            <div>
                                <span>BASED IN</span>
                                <strong>
                                    INDIA
                                </strong>
                            </div>

                        </div>

                    </aside>


                    {/* RIGHT SIDE */}
                    <div className="contact__form-column">

                        <div className="contact__form-heading">
                            <span>
                                START A CONVERSATION
                            </span>

                            <span>
                                01 — 04
                            </span>
                        </div>

                        <form
                            className="contact__form"
                            onSubmit={handleSubmit}
                            noValidate
                        >

                            {/* =================================
                                01 — PERSONAL DETAILS
                            ================================= */}
                            <div className="contact__form-section">

                                <div className="contact__section-number">
                                    01
                                </div>

                                <div className="contact__section-content">

                                    <h3>
                                        YOUR DETAILS
                                    </h3>

                                    <div className="contact__fields contact__fields--two">

                                        {/* NAME */}
                                        <label
                                            className={`contact__field ${focusedField ===
                                                'name'
                                                ? 'is-focused'
                                                : ''
                                                } ${form.name
                                                    ? 'has-value'
                                                    : ''
                                                }`}
                                        >
                                            <span>
                                                YOUR NAME *
                                            </span>

                                            <input
                                                type="text"
                                                value={
                                                    form.name
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    updateField(
                                                        'name',
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                onFocus={() =>
                                                    setFocusedField(
                                                        'name'
                                                    )
                                                }
                                                onBlur={() =>
                                                    setFocusedField(
                                                        null
                                                    )
                                                }
                                                autoComplete="name"
                                            />
                                        </label>

                                        {/* COMPANY */}
                                        <label
                                            className={`contact__field ${focusedField ===
                                                'company'
                                                ? 'is-focused'
                                                : ''
                                                } ${form.company
                                                    ? 'has-value'
                                                    : ''
                                                }`}
                                        >
                                            <span>
                                                COMPANY
                                            </span>

                                            <input
                                                type="text"
                                                value={
                                                    form.company
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    updateField(
                                                        'company',
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                onFocus={() =>
                                                    setFocusedField(
                                                        'company'
                                                    )
                                                }
                                                onBlur={() =>
                                                    setFocusedField(
                                                        null
                                                    )
                                                }
                                                autoComplete="organization"
                                            />
                                        </label>

                                    </div>

                                    {/* EMAIL */}
                                    <div className="contact__fields">

                                        <label
                                            className={`contact__field ${focusedField ===
                                                'email'
                                                ? 'is-focused'
                                                : ''
                                                } ${form.email
                                                    ? 'has-value'
                                                    : ''
                                                }`}
                                        >
                                            <span>
                                                EMAIL ADDRESS *
                                            </span>

                                            <input
                                                type="email"
                                                value={
                                                    form.email
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    updateField(
                                                        'email',
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                onFocus={() =>
                                                    setFocusedField(
                                                        'email'
                                                    )
                                                }
                                                onBlur={() =>
                                                    setFocusedField(
                                                        null
                                                    )
                                                }
                                                autoComplete="email"
                                            />
                                        </label>

                                    </div>

                                    {/* PHONE */}
                                    <div className="contact__fields">

                                        <label
                                            className={`contact__field ${focusedField ===
                                                'phone'
                                                ? 'is-focused'
                                                : ''
                                                } ${form.phone
                                                    ? 'has-value'
                                                    : ''
                                                }`}
                                        >
                                            <span>
                                                PHONE NUMBER *
                                            </span>

                                            <input
                                                type="tel"
                                                value={
                                                    form.phone
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    updateField(
                                                        'phone',
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                onFocus={() =>
                                                    setFocusedField(
                                                        'phone'
                                                    )
                                                }
                                                onBlur={() =>
                                                    setFocusedField(
                                                        null
                                                    )
                                                }
                                                autoComplete="tel"
                                                inputMode="tel"
                                                placeholder="+91"
                                            />
                                        </label>

                                    </div>

                                    {/* WEBSITE */}
                                    <div className="contact__fields">

                                        <label
                                            className={`contact__field ${focusedField ===
                                                'website'
                                                ? 'is-focused'
                                                : ''
                                                } ${form.website
                                                    ? 'has-value'
                                                    : ''
                                                }`}
                                        >
                                            <span>
                                                WEBSITE / EXISTING PRODUCT
                                            </span>

                                            <input
                                                type="url"
                                                value={
                                                    form.website
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    updateField(
                                                        'website',
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                onFocus={() =>
                                                    setFocusedField(
                                                        'website'
                                                    )
                                                }
                                                onBlur={() =>
                                                    setFocusedField(
                                                        null
                                                    )
                                                }
                                                placeholder="https://"
                                                autoComplete="url"
                                            />
                                        </label>

                                    </div>

                                </div>
                            </div>


                            {/* =================================
                                02 — SERVICE
                            ================================= */}
                            <div className="contact__form-section">

                                <div className="contact__section-number">
                                    02
                                </div>

                                <div className="contact__section-content">

                                    <h3>
                                        WHAT ARE WE BUILDING?
                                    </h3>

                                    <div className="contact__service-grid">

                                        {SERVICES.map(
                                            (service) => (
                                                <button
                                                    key={service}
                                                    type="button"
                                                    className={`contact__service ${form.service ===
                                                        service
                                                        ? 'is-selected'
                                                        : ''
                                                        }`}
                                                    onClick={() =>
                                                        updateField(
                                                            'service',
                                                            service
                                                        )
                                                    }
                                                >
                                                    <span>
                                                        {service}
                                                    </span>

                                                    <span className="contact__service-arrow">
                                                        →
                                                    </span>
                                                </button>
                                            )
                                        )}

                                    </div>

                                    {form.service ===
                                        'Other' && (
                                            <label className="contact__field contact__field--other">

                                                <span>
                                                    TELL US WHAT YOU NEED *
                                                </span>

                                                <input
                                                    type="text"
                                                    value={
                                                        form.serviceOther
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        updateField(
                                                            'serviceOther',
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                />

                                            </label>
                                        )}

                                </div>
                            </div>


                            {/* =================================
                                03 — TIMELINE
                            ================================= */}
                            <div className="contact__form-section">

                                <div className="contact__section-number">
                                    03
                                </div>

                                <div className="contact__section-content">

                                    <h3>
                                        WHEN DO YOU WANT TO START?
                                    </h3>

                                    <div className="contact__timeline">

                                        {TIMELINES.map(
                                            (timeline) => (
                                                <button
                                                    key={timeline}
                                                    type="button"
                                                    className={`contact__timeline-option ${form.timeline ===
                                                        timeline
                                                        ? 'is-selected'
                                                        : ''
                                                        }`}
                                                    onClick={() =>
                                                        updateField(
                                                            'timeline',
                                                            timeline
                                                        )
                                                    }
                                                >
                                                    {timeline}
                                                </button>
                                            )
                                        )}

                                    </div>

                                </div>
                            </div>


                            {/* =================================
                                04 — MESSAGE
                            ================================= */}
                            <div className="contact__form-section">

                                <div className="contact__section-number">
                                    04
                                </div>

                                <div className="contact__section-content">

                                    <h3>
                                        TELL US ABOUT IT
                                    </h3>

                                    <label
                                        className={`contact__field contact__field--message ${focusedField ===
                                            'message'
                                            ? 'is-focused'
                                            : ''
                                            } ${form.message
                                                ? 'has-value'
                                                : ''
                                            }`}
                                    >
                                        <span>
                                            PROJECT DETAILS *
                                        </span>

                                        <textarea
                                            value={
                                                form.message
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                updateField(
                                                    'message',
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            onFocus={() =>
                                                setFocusedField(
                                                    'message'
                                                )
                                            }
                                            onBlur={() =>
                                                setFocusedField(
                                                    null
                                                )
                                            }
                                            rows={6}
                                            maxLength={5000}
                                            placeholder="What are you building? What problem are you trying to solve?"
                                        />

                                    </label>

                                </div>
                            </div>


                            {/* ERROR */}
                            {error && (
                                <div className="contact__error">
                                    <span>!</span>
                                    {error}
                                </div>
                            )}


                            {/* SUBMIT */}
                            <div className="contact__submit-row">

                                <div className="contact__submit-note">
                                    <span>
                                        READY WHEN YOU ARE.
                                    </span>

                                    <small>
                                        NO COMMITMENT. JUST A
                                        CONVERSATION.
                                    </small>
                                </div>

                                <button
                                    type="submit"
                                    className="contact__submit"
                                    disabled={submitting}
                                >
                                    <span>
                                        {submitting
                                            ? 'SENDING...'
                                            : 'SEND INQUIRY'}
                                    </span>

                                    <span className="contact__submit-arrow">
                                        →
                                    </span>
                                </button>

                            </div>

                        </form>
                    </div>

                </div>


                {/* CLOSING
                <div className="contact__closing">
                    <span>
                        GOOD IDEAS
                    </span>

                    <strong>
                        DESERVE GOOD EXECUTION.
                    </strong>
                </div> */}

            </div>


            {/* =============================================
                SUCCESS OVERLAY
            ============================================= */}
            {submitted && (
                <div className="contact__success">

                    <div className="contact__success-inner">

                        <span className="contact__success-number">
                            07 / DONE
                        </span>

                        <h3>
                            MESSAGE
                            <br />
                            <span>RECEIVED.</span>
                        </h3>

                        <p>
                            Thanks for reaching out.
                            We'll review your project and
                            get back to you within 24–48 hours.
                        </p>

                        {projectId && (
                            <div
                                style={{
                                    marginBottom: '28px',
                                    fontFamily:
                                        'var(--font-mono, monospace)',
                                    fontSize: '9px',
                                    letterSpacing: '0.08em',
                                    color:
                                        'var(--contact-muted)',
                                }}
                            >
                                REFERENCE: {projectId}
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={closeSuccess}
                        >
                            CLOSE →
                        </button>

                    </div>

                </div>
            )}
        </section>
    );
};

export default Contact;