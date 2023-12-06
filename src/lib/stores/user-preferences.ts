import { persisted } from 'svelte-persisted-store';
import type { Writable } from 'svelte/store';

/**
 * System-wide user preferences that are stored in local storage.
 */
export interface UserPrefrences {
    darkmode: 'system' | 'dark' | 'light';
}

/**
 * System-wide preference store.
 */
export const preferences: Writable<UserPrefrences> = persisted('preferences', <UserPrefrences>{
    darkmode: 'system', // Initial value
});

/**
 * Listen for changes to preferences and react accordingly.
 */
preferences.subscribe(($preferences: UserPrefrences) => {
    // Clean up old classes
    document.documentElement.classList.remove('dark');

    // Update darkmode
    switch ($preferences.darkmode) {
        case 'system':
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            }
            break;
        case 'dark':
            document.documentElement.classList.add('dark');
            break;
    }
});
