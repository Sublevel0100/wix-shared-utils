// shared-wix-utils.js

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
