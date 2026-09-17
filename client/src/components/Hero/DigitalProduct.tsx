import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';
import { Html } from '@react-three/drei';
import './DigitalProduct.css';

export interface DigitalProductHandle {
    reveal: () => void;
}

interface DigitalProductProps {
    position: [number, number, number];
    reduced: boolean;
}

const DigitalProduct = forwardRef<DigitalProductHandle, DigitalProductProps>(
    ({ position, reduced }, ref) => {
        const rootRef = useRef<HTMLDivElement | null>(null);
        const frameRef = useRef<HTMLDivElement | null>(null);

        const topRef = useRef<HTMLDivElement | null>(null);
        const titleRef = useRef<HTMLDivElement | null>(null);
        const linesRef = useRef<HTMLDivElement | null>(null);
        const footerRef = useRef<HTMLDivElement | null>(null);

        useImperativeHandle(
            ref,
            () => ({
                reveal: () => {
                    const rows = linesRef.current
                        ? Array.from(linesRef.current.children)
                        : [];

                    const ctx = gsap.context(() => {
                        // Reset
                        gsap.set(rootRef.current, {
                            opacity: 0,
                            scale: 0.55,
                            y: 10,
                        });

                        gsap.set(frameRef.current, {
                            opacity: 0,
                            scaleX: 0.7,
                            clipPath: 'inset(0 12% 0 12% round 12px)',
                        });

                        gsap.set(
                            [
                                topRef.current,
                                titleRef.current,
                                footerRef.current,
                            ],
                            {
                                opacity: 0,
                                y: 7,
                            }
                        );

                        gsap.set(rows, {
                            opacity: 0,
                            x: -8,
                        });

                        const tl = gsap.timeline();

                        if (reduced) {
                            tl.set(rootRef.current, {
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            })
                                .set(frameRef.current, {
                                    opacity: 1,
                                    scaleX: 1,
                                    clipPath:
                                        'inset(0 0 0 0 round 12px)',
                                })
                                .set(
                                    [
                                        topRef.current,
                                        titleRef.current,
                                        footerRef.current,
                                    ],
                                    {
                                        opacity: 1,
                                        y: 0,
                                    }
                                )
                                .set(rows, {
                                    opacity: 1,
                                    x: 0,
                                });

                            return;
                        }

                        // Digital object forms
                        tl.to(rootRef.current, {
                            opacity: 1,
                            scale: 0.78,
                            y: 0,
                            duration: 0.16,
                            ease: 'power3.out',
                        });

                        // Frame draws itself
                        tl.to(
                            frameRef.current,
                            {
                                opacity: 1,
                                scaleX: 1,
                                clipPath:
                                    'inset(0 0 0 0 round 12px)',
                                duration: 0.38,
                                ease: 'power3.out',
                            },
                            '-=0.05'
                        );

                        // Top bar
                        tl.to(
                            topRef.current,
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.18,
                                ease: 'power3.out',
                            },
                            '-=0.12'
                        );

                        // Small title
                        tl.to(
                            titleRef.current,
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.22,
                                ease: 'power3.out',
                            },
                            '-=0.08'
                        );

                        // UI lines
                        tl.to(
                            rows,
                            {
                                opacity: 1,
                                x: 0,
                                duration: 0.2,
                                stagger: 0.06,
                                ease: 'power3.out',
                            },
                            '-=0.08'
                        );

                        // Footer
                        tl.to(
                            footerRef.current,
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.16,
                                ease: 'power3.out',
                            },
                            '-=0.08'
                        );

                        // Final settle
                        tl.to(
                            rootRef.current,
                            {
                                scale: 1,
                                duration: 0.28,
                                ease: 'power2.out',
                            },
                            '-=0.08'
                        );
                    }, rootRef);

                    return () => ctx.revert();
                },
            }),
            [reduced]
        );

        return (
            <Html
                position={position}
                transform
                distanceFactor={7}
                occlude={false}
                wrapperClass="digital-product-wrapper"
                zIndexRange={[10, 0]}
            >
                <div
                    ref={rootRef}
                    className="digital-product"
                    aria-hidden="true"
                >
                    <div
                        ref={frameRef}
                        className="digital-product__frame"
                    >
                        {/* TOP BAR */}
                        <div
                            ref={topRef}
                            className="digital-product__top"
                        >
                            <div className="digital-product__brand">
                                <span className="digital-product__mark">
                                    DF
                                </span>

                                <span>DEVFORGE</span>
                            </div>

                            <div className="digital-product__status">
                                <i />
                                LIVE
                            </div>
                        </div>

                        {/* MAIN CONTENT */}
                        <div className="digital-product__body">
                            <div
                                ref={titleRef}
                                className="digital-product__title"
                            >
                                <small>FORGED / 001</small>

                                <strong>
                                    DIGITAL
                                    <em> PRODUCT</em>
                                </strong>
                            </div>

                            {/* UI SYSTEM */}
                            <div
                                ref={linesRef}
                                className="digital-product__rows"
                            >
                                <div className="digital-product__row">
                                    <span>01</span>
                                    <b>DESIGN</b>
                                    <i />
                                    <small>UI / UX</small>
                                </div>

                                <div className="digital-product__row">
                                    <span>02</span>
                                    <b>CODE</b>
                                    <i />
                                    <small>BUILD</small>
                                </div>

                                <div className="digital-product__row">
                                    <span>03</span>
                                    <b>MOTION</b>
                                    <i />
                                    <small>INTERACT</small>
                                </div>
                            </div>

                            <div className="digital-product__mini-grid">
                                <span />
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div
                            ref={footerRef}
                            className="digital-product__footer"
                        >
                            <span>BUILD · CODE · LAUNCH</span>
                            <span>↗</span>
                        </div>
                    </div>
                </div>
            </Html>
        );
    }
);

DigitalProduct.displayName = 'DigitalProduct';

export default DigitalProduct;