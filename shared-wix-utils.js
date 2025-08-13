// shared-wix-utils.js
// Hybrid version for Wix: supports both import and global access

// Detect global scope safely (browser or worker)
const globalScope = typeof window !== 'undefined' ? window : self;

// --- FUNCTIONS ---

/**
 * Queues animations for multiple elements in sequence.
 * @param {string[]} elements - Array of Wix element selectors (e.g., ['#box1', '#box2']).
 * @param {Object[]} effects - Array of effect configs { action: 'show', options: {...} }.
 * @returns {Promise} Resolves when all animations complete.
 */
export function queueAnimations(elements, effects) {
    let chain = Promise.resolve();

    elements.forEach((el, i) => {
        chain = chain.then(() => {
            return $w(el)[effects[i].action]({
                ...effects[i].options
            });
        });
    });

    return chain;
}

/**
 * Simple test function.
 */
export function helloFromSharedLib() {
    console.log("Hello from the shared library!");
}

// --- ATTACH TO GLOBAL SCOPE FOR NON-IMPORT USE ---
globalScope.queueAnimations = queueAnimations;
globalScope.helloFromSharedLib = helloFromSharedLib;

