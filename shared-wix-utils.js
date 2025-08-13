// shared-wix-utils.js
// Hybrid version: works with imports or as global functions

const globalScope = typeof window !== 'undefined' ? window : self;

// --- FUNCTIONS ---

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

export function helloFromSharedLib() {
    console.log("Hello from the shared library!");
}

// --- ATTACH TO GLOBAL SCOPE ---
globalScope.queueAnimations = queueAnimations;
globalScope.helloFromSharedLib = helloFromSharedLib;
