/* ============================================================
   DEVFORGE
   PREMIUM SYSTEM PRELOADER
============================================================ */


/*
============================================================
TIMING
============================================================

BOOT          0ms
SCAN          500ms
CONSTRUCT     1250ms
READY         3150ms
EXIT          3850ms
REMOVE        4800ms
*/

export const PRELOADER_DURATION = 4800;


/* ============================================================
   LOCK
============================================================ */

export const lockPreloaderScroll = (): void => {

    if (
        typeof document === 'undefined'
    ) {
        return;
    }


    document.documentElement.classList.add(
        'df-preloader-active'
    );

    document.body.classList.add(
        'df-preloader-active'
    );

};


/* ============================================================
   UNLOCK
============================================================ */

export const unlockPreloaderScroll = (): void => {

    if (
        typeof document === 'undefined'
    ) {
        return;
    }


    document.documentElement.classList.remove(
        'df-preloader-active'
    );

    document.body.classList.remove(
        'df-preloader-active'
    );

};


/* ============================================================
   ACTIVE STATE
============================================================ */

export const isPreloaderActive = (): boolean => {

    if (
        typeof document === 'undefined'
    ) {
        return false;
    }


    return (
        document.documentElement.classList.contains(
            'df-preloader-active'
        ) ||
        document.body.classList.contains(
            'df-preloader-active'
        )
    );

};


/* ============================================================
   INIT
============================================================ */

export const initPreloaderAnimation =
    (): (() => void) => {

        lockPreloaderScroll();


        let cleanedUp =
            false;


        const cleanup = (): void => {

            if (cleanedUp) {
                return;
            }


            cleanedUp = true;

            unlockPreloaderScroll();

        };


        return cleanup;

    };