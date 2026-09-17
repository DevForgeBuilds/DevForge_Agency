import gsap from 'gsap';


/* ============================================================
   TYPES
============================================================ */

type RGB = {
    r: number;
    g: number;
    b: number;
};


type NavbarColors = {
    background: RGB;
    text: RGB;
    muted: RGB;
    accent: RGB;
    border: RGB;
};


/* ============================================================
   DEVFORGE NAVBAR ANIMATION
============================================================ */

/*
 * IMPORTANT
 *
 * Navbar does NOT depend only on section IDs anymore.
 *
 * It detects the actual element sitting underneath the navbar.
 *
 * Therefore it works on:
 *
 * /
 * /services
 * /services/:slug
 * other pages
 *
 * and also inside multi-background pages.
 */


/* ============================================================
   CSS COLOR READER
============================================================ */

const readCSSColor = (
    variable: string,
    fallback: string
): RGB => {

    const value =
        getComputedStyle(
            document.documentElement
        )
            .getPropertyValue(
                variable
            )
            .trim();


    const color =
        value || fallback;


    /* ========================================================
       HEX
    ======================================================== */

    if (
        color.startsWith('#')
    ) {

        let hex =
            color.slice(1);


        if (
            hex.length === 3
        ) {

            hex =
                hex
                    .split('')
                    .map(
                        char =>
                            char + char
                    )
                    .join('');

        }


        if (
            hex.length === 6
        ) {

            const number =
                parseInt(
                    hex,
                    16
                );


            return {

                r:
                    (number >> 16) &
                    255,

                g:
                    (number >> 8) &
                    255,

                b:
                    number &
                    255,

            };

        }

    }


    /* ========================================================
       RGB / RGBA
    ======================================================== */

    const match =
        color.match(
            /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/
        );


    if (match) {

        return {

            r:
                Number(
                    match[1]
                ),

            g:
                Number(
                    match[2]
                ),

            b:
                Number(
                    match[3]
                ),

        };

    }


    return {
        r: 0,
        g: 0,
        b: 0,
    };

};


/* ============================================================
   PARSE RGB STRING
============================================================ */

const parseRGB = (
    value: string
): RGB | null => {

    const match =
        value.match(
            /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/
        );


    if (!match) {

        return null;

    }


    return {

        r:
            Number(
                match[1]
            ),

        g:
            Number(
                match[2]
            ),

        b:
            Number(
                match[3]
            ),

    };

};


/* ============================================================
   MIX COLORS
============================================================ */

const mix = (
    a: RGB,
    b: RGB,
    amount: number
): RGB => {

    return {

        r:
            a.r +
            (
                b.r -
                a.r
            ) *
            amount,

        g:
            a.g +
            (
                b.g -
                a.g
            ) *
            amount,

        b:
            a.b +
            (
                b.b -
                a.b
            ) *
            amount,

    };

};


/* ============================================================
   LUMINANCE
============================================================ */

const luminance = (
    color: RGB
): number => {

    const convert =
        (
            value: number
        ) => {

            const channel =
                value / 255;


            return channel <= 0.03928

                ? channel / 12.92

                : Math.pow(
                    (
                        channel +
                        0.055
                    ) / 1.055,
                    2.4
                );

        };


    return (

        0.2126 *
        convert(color.r)

        +

        0.7152 *
        convert(color.g)

        +

        0.0722 *
        convert(color.b)

    );

};


/* ============================================================
   CONTRAST RATIO
============================================================ */

const contrastRatio = (
    a: RGB,
    b: RGB
): number => {

    const light =
        Math.max(
            luminance(a),
            luminance(b)
        );


    const dark =
        Math.min(
            luminance(a),
            luminance(b)
        );


    return (
        light + 0.05
    ) / (
        dark + 0.05
    );

};


/* ============================================================
   COLOR DISTANCE
============================================================ */

const colorDistance = (
    a: RGB,
    b: RGB
): number => {

    const dr =
        a.r - b.r;

    const dg =
        a.g - b.g;

    const db =
        a.b - b.b;


    return Math.sqrt(
        dr * dr +
        dg * dg +
        db * db
    );

};


/* ============================================================
   DEVFORGE PALETTE
============================================================ */

const getPalette = () => {

    return {

        ivory:
            readCSSColor(
                '--df-ivory',
                '#f6f2e8'
            ),

        ivory2:
            readCSSColor(
                '--df-ivory-2',
                '#efe8d8'
            ),

        cream:
            readCSSColor(
                '--df-cream',
                '#e9e1cd'
            ),

        charcoal:
            readCSSColor(
                '--df-charcoal',
                '#070d09'
            ),

        charcoal2:
            readCSSColor(
                '--df-charcoal-2',
                '#0c150e'
            ),

        forest:
            readCSSColor(
                '--df-forest',
                '#0e3323'
            ),

        forest2:
            readCSSColor(
                '--df-forest-2',
                '#164430'
            ),

        lime:
            readCSSColor(
                '--df-lime',
                '#b7f34a'
            ),

        lime2:
            readCSSColor(
                '--df-lime-2',
                '#9fd331'
            ),

        ink:
            readCSSColor(
                '--df-ink',
                '#12180f'
            ),

    };

};


/* ============================================================
   BACKGROUND FROM ELEMENT
============================================================ */

const getElementBackground = (
    element: HTMLElement | null
): RGB | null => {

    let current =
        element;


    while (
        current
    ) {

        const style =
            getComputedStyle(
                current
            );


        /* ====================================================
           BACKGROUND COLOR
        ==================================================== */

        const backgroundColor =
            style.backgroundColor;


        if (
            backgroundColor &&
            backgroundColor !==
                'transparent' &&
            backgroundColor !==
                'rgba(0, 0, 0, 0)'
        ) {

            const parsed =
                parseRGB(
                    backgroundColor
                );


            if (
                parsed
            ) {

                /*
                 * Ignore almost transparent layers.
                 */

                const alphaMatch =
                    backgroundColor.match(
                        /rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/
                    );


                const alpha =
                    alphaMatch
                        ? Number(
                            alphaMatch[1]
                        )
                        : 1;


                if (
                    alpha >
                    0.05
                ) {

                    return parsed;

                }

            }

        }


        current =
            current.parentElement;

    }


    return null;

};


/* ============================================================
   BACKGROUND FROM CUSTOM THEME TOKEN
============================================================ */

const getThemeTokenColor = (
    element: HTMLElement,
    variable: string
): RGB | null => {

    let current:
        HTMLElement | null =
        element;


    while (
        current
    ) {

        const value =
            getComputedStyle(
                current
            )
                .getPropertyValue(
                    variable
                )
                .trim();


        if (
            value
        ) {

            const parsed =
                parseRGB(
                    value
                );


            if (
                parsed
            ) {

                return parsed;

            }


            if (
                value.startsWith('#')
            ) {

                /*
                 * Parse local custom token.
                 */

                let hex =
                    value.slice(1);


                if (
                    hex.length === 3
                ) {

                    hex =
                        hex
                            .split('')
                            .map(
                                char =>
                                    char + char
                            )
                            .join('');

                }


                if (
                    hex.length === 6
                ) {

                    const number =
                        parseInt(
                            hex,
                            16
                        );


                    return {

                        r:
                            (number >> 16) &
                            255,

                        g:
                            (number >> 8) &
                            255,

                        b:
                            number &
                            255,

                    };

                }

            }

        }


        current =
            current.parentElement;

    }


    return null;

};


/* ============================================================
   FIND PAGE BACKGROUND
============================================================ */

const getPageBackground = (): RGB => {

    /*
     * --------------------------------------------------------
     * 1. Find the exact element underneath navbar.
     * --------------------------------------------------------
     */

    const x =
        Math.min(
            window.innerWidth / 2,
            window.innerWidth - 1
        );


    const y =
        Math.min(
            88,
            window.innerHeight - 1
        );


    const elements =
        document.elementsFromPoint(
            x,
            y
        );


    for (
        const element of elements
    ) {

        if (
            !(element instanceof HTMLElement)
        ) {

            continue;

        }


        /*
         * Never use navbar itself.
         */

        if (
            element.closest(
                '.df-adaptive-nav'
            )
        ) {

            continue;

        }


        if (
            element.closest(
                '#df-mobile-navigation'
            )
        ) {

            continue;

        }


        /* ====================================================
           SERVICE DETAIL
        ==================================================== */

        const detail =
            element.closest<HTMLElement>(
                '.service-detail'
            );


        if (
            detail
        ) {

            /*
             * First try the actual element background.
             *
             * This is important because Service Detail has
             * multiple background sections.
             */

            const direct =
                getElementBackground(
                    element
                );


            if (
                direct
            ) {

                return direct;

            }


            /*
             * Fallback to detail token.
             */

            const detailBg =
                getThemeTokenColor(
                    detail,
                    '--df-detail-bg'
                );


            if (
                detailBg
            ) {

                return detailBg;

            }

        }


        /* ====================================================
           SERVICES
        ==================================================== */

        const services =
            element.closest<HTMLElement>(
                '.services-section'
            );


        if (
            services
        ) {

            const direct =
                getElementBackground(
                    element
                );


            if (
                direct
            ) {

                return direct;

            }


            const servicesBg =
                getThemeTokenColor(
                    services,
                    '--df-services-bg'
                );


            if (
                servicesBg
            ) {

                return servicesBg;

            }

        }


        /* ====================================================
           NORMAL HOMEPAGE / OTHER SECTIONS
        ==================================================== */

        const background =
            getElementBackground(
                element
            );


        if (
            background
        ) {

            return background;

        }

    }


    /* ========================================================
       FALLBACK
    ======================================================== */

    const bodyBackground =
        getElementBackground(
            document.body
        );


    if (
        bodyBackground
    ) {

        return bodyBackground;

    }


    return readCSSColor(
        '--df-ivory',
        '#f6f2e8'
    );

};


/* ============================================================
   BUILD OPPOSITE NAVBAR COLORS
============================================================ */

const getOppositeNavbarColors = (
    background: RGB
): NavbarColors => {

    const palette =
        getPalette();


    const brightness =
        luminance(
            background
        );


    /* ========================================================
       VERY LIGHT
       
       IVORY / CREAM
       →
       FOREST
    ======================================================== */

    if (
        brightness >
        0.55
    ) {

        return {

            background:
                palette.forest,

            text:
                palette.ivory,

            muted:
                mix(
                    palette.ivory2,
                    palette.forest,
                    0.40
                ),

            accent:
                palette.lime,

            border:
                palette.ivory2,

        };

    }


    /* ========================================================
       LIME / BRIGHT GREEN
       
       →
       CHARCOAL
    ======================================================== */

    if (
        brightness >
            0.35 &&
        background.g >
            background.r * 1.35 &&
        background.g >
            background.b * 1.35
    ) {

        return {

            background:
                palette.charcoal,

            text:
                palette.ivory,

            muted:
                mix(
                    palette.ivory2,
                    palette.charcoal,
                    0.40
                ),

            accent:
                palette.lime,

            border:
                palette.ivory2,

        };

    }


    /* ========================================================
       DARK
       
       CHARCOAL / DARK FOREST
       →
       IVORY
    ======================================================== */

    if (
        brightness <
        0.22
    ) {

        return {

            background:
                palette.ivory,

            text:
                palette.charcoal,

            muted:
                mix(
                    palette.charcoal,
                    palette.ivory,
                    0.45
                ),

            accent:
                palette.forest,

            border:
                palette.charcoal2,

        };

    }


    /* ========================================================
       MEDIUM
       
       Choose the strongest contrasting DevForge tone.
    ======================================================== */

    const darkCandidate =
        contrastRatio(
            palette.charcoal,
            background
        );


    const forestCandidate =
        contrastRatio(
            palette.forest,
            background
        );


    if (
        darkCandidate >
        forestCandidate
    ) {

        return {

            background:
                palette.charcoal,

            text:
                palette.ivory,

            muted:
                mix(
                    palette.ivory2,
                    palette.charcoal,
                    0.42
                ),

            accent:
                palette.lime,

            border:
                palette.ivory2,

        };

    }


    return {

        background:
            palette.ivory,

        text:
            palette.charcoal,

        muted:
            mix(
                palette.charcoal,
                palette.ivory,
                0.45
            ),

        accent:
            palette.forest,

        border:
            palette.charcoal2,

    };

};


// /* ============================================================
//    WRITE RGB VARIABLES
// ============================================================ */

// const writeRGB = (
//     element: HTMLElement,
//     prefix: string,
//     color: RGB
// ) => {

//     element.style.setProperty(
//         `--${prefix}-r`,
//         String(
//             Math.round(
//                 color.r
//             )
//         )
//     );


//     element.style.setProperty(
//         `--${prefix}-g`,
//         String(
//             Math.round(
//                 color.g
//             )
//         )
//     );


//     element.style.setProperty(
//         `--${prefix}-b`,
//         String(
//             Math.round(
//                 color.b
//             )
//         )
//     );

// };


/* ============================================================
   APPLY COLORS
============================================================ */

/* ============================================================
   MAIN INITIALIZER
============================================================ */

export const initNavbarAnimation = (
    navbar: HTMLElement,
    onSectionChange:
        (
            sectionId: string
        ) => void
) => {

    let destroyed =
        false;


    let scrollFrame =
        0;


    let resizeFrame =
        0;


    let themeFrame =
        0;


    let lastBackground:
        RGB | null =
        null;


    let lastSection =
        'hero';


    let currentTween:
        gsap.core.Tween | null =
        null;


    const mobileMenu =
        document.getElementById(
            'df-mobile-navigation'
        ) as HTMLElement | null;


    /* ========================================================
       UPDATE SECTION
    ======================================================== */

    const updateSection =
        () => {

            /*
             * Section detection is ONLY for the active number.
             *
             * Theme detection is completely independent.
             */

            const sections =
                Array.from(
                    document.querySelectorAll<HTMLElement>(
                        'section[id]'
                    )
                );


            if (
                sections.length === 0
            ) {

                return;

            }


            const probe =
                Math.min(
                    window.innerHeight *
                    0.28,
                    260
                );


            let closest:
                HTMLElement | null =
                null;


            let closestDistance =
                Infinity;


            sections.forEach(
                section => {

                    const rect =
                        section.getBoundingClientRect();


                    if (
                        rect.bottom <= 0 ||
                        rect.top >=
                        window.innerHeight
                    ) {

                        return;

                    }


                    const distance =
                        Math.abs(
                            (
                                rect.top +
                                rect.height / 2
                            ) -
                            probe
                        );


                    if (
                        distance <
                        closestDistance
                    ) {

                        closestDistance =
                            distance;

                        closest =
                            section;

                    }

                }
            );


            const sectionId =
    (closest as HTMLElement | null)?.id ??
    'hero';


            if (
                sectionId !==
                lastSection
            ) {

                lastSection =
                    sectionId;


                onSectionChange(
                    sectionId
                );

            }

        };


    /* ========================================================
       UPDATE THEME
    ======================================================== */

    const updateTheme =
        () => {

            if (
                destroyed
            ) {

                return;

            }


            updateSection();


            const background =
                getPageBackground();


            /*
             * Do not continuously tween when the same background
             * is still underneath the navbar.
             */

            if (
                lastBackground &&
                colorDistance(
                    background,
                    lastBackground
                ) < 2
            ) {

                return;

            }


            lastBackground =
                background;


            const colors =
                getOppositeNavbarColors(
                    background
                );


            if (
                currentTween
            ) {

                currentTween.kill();

            }


            /*
             * Animate navbar CSS variables.
             */

            currentTween =
                gsap.to(
                    navbar,
                    {

                        '--nav-bg-r':
                            colors.background.r,

                        '--nav-bg-g':
                            colors.background.g,

                        '--nav-bg-b':
                            colors.background.b,


                        '--nav-text-r':
                            colors.text.r,

                        '--nav-text-g':
                            colors.text.g,

                        '--nav-text-b':
                            colors.text.b,


                        '--nav-muted-r':
                            colors.muted.r,

                        '--nav-muted-g':
                            colors.muted.g,

                        '--nav-muted-b':
                            colors.muted.b,


                        '--nav-accent-r':
                            colors.accent.r,

                        '--nav-accent-g':
                            colors.accent.g,

                        '--nav-accent-b':
                            colors.accent.b,


                        '--nav-border-r':
                            colors.border.r,

                        '--nav-border-g':
                            colors.border.g,

                        '--nav-border-b':
                            colors.border.b,


                        duration:
                            0.55,

                        ease:
                            'power3.out',

                        overwrite:
                            'auto',

                    }
                );


            /*
             * Mobile menu gets exactly the same theme.
             */

            if (
                mobileMenu
            ) {

                gsap.to(
                    mobileMenu,
                    {

                        '--mobile-bg-r':
                            colors.background.r,

                        '--mobile-bg-g':
                            colors.background.g,

                        '--mobile-bg-b':
                            colors.background.b,


                        '--mobile-text-r':
                            colors.text.r,

                        '--mobile-text-g':
                            colors.text.g,

                        '--mobile-text-b':
                            colors.text.b,


                        '--mobile-muted-r':
                            colors.muted.r,

                        '--mobile-muted-g':
                            colors.muted.g,

                        '--mobile-muted-b':
                            colors.muted.b,


                        '--mobile-accent-r':
                            colors.accent.r,

                        '--mobile-accent-g':
                            colors.accent.g,

                        '--mobile-accent-b':
                            colors.accent.b,


                        '--mobile-border-r':
                            colors.border.r,

                        '--mobile-border-g':
                            colors.border.g,

                        '--mobile-border-b':
                            colors.border.b,


                        duration:
                            0.55,

                        ease:
                            'power3.out',

                        overwrite:
                            'auto',

                    }
                );

            }

        };


    /* ========================================================
       SCHEDULE THEME
    ======================================================== */

    const scheduleTheme =
        () => {

            if (
                themeFrame
            ) {

                return;

            }


            themeFrame =
                requestAnimationFrame(
                    () => {

                        themeFrame =
                            0;

                        updateTheme();

                    }
                );

        };


    /* ========================================================
       SCROLL
    ======================================================== */

    const handleScroll =
        () => {

            if (
                scrollFrame
            ) {

                return;

            }


            scrollFrame =
                requestAnimationFrame(
                    () => {

                        scrollFrame =
                            0;

                        scheduleTheme();

                    }
                );

        };


    /* ========================================================
       RESIZE
    ======================================================== */

    const handleResize =
        () => {

            if (
                resizeFrame
            ) {

                cancelAnimationFrame(
                    resizeFrame
                );

            }


            resizeFrame =
                requestAnimationFrame(
                    () => {

                        resizeFrame =
                            0;

                        lastBackground =
                            null;

                        scheduleTheme();

                    }
                );

        };


    /* ========================================================
       MUTATION OBSERVER
       
       Useful when ServiceDetail changes its DOM/background
       after route rendering.
    ======================================================== */

    const observer =
        new MutationObserver(
            () => {

                lastBackground =
                    null;

                scheduleTheme();

            }
        );


    observer.observe(
        document.body,
        {
            childList:
                true,

            subtree:
                true,
        }
    );


    /* ========================================================
       EVENTS
    ======================================================== */

    window.addEventListener(
        'scroll',
        handleScroll,
        {
            passive:
                true,
        }
    );


    window.addEventListener(
        'resize',
        handleResize
    );


    /* ========================================================
       INITIAL
    ======================================================== */

    updateTheme();


    requestAnimationFrame(
        () => {

            if (
                destroyed
            ) {

                return;

            }


            lastBackground =
                null;

            updateTheme();

        }
    );


    /* ========================================================
       CLEANUP
    ======================================================== */

    return () => {

        destroyed =
            true;


        if (
            scrollFrame
        ) {

            cancelAnimationFrame(
                scrollFrame
            );

        }


        if (
            resizeFrame
        ) {

            cancelAnimationFrame(
                resizeFrame
            );

        }


        if (
            themeFrame
        ) {

            cancelAnimationFrame(
                themeFrame
            );

        }


        if (
            currentTween
        ) {

            currentTween.kill();

        }


        observer.disconnect();


        window.removeEventListener(
            'scroll',
            handleScroll
        );


        window.removeEventListener(
            'resize',
            handleResize
        );

    };

};