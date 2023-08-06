<template>
    <header>
        <div>
            <h1>
                Error 404
            </h1>

            <h3>
                This is not an accessible page. Click <RouterLink to="/">here</RouterLink> to return to the main page.
            </h3>
        </div>
    </header>
</template>

<style>
header {
    padding-top: calc(var(--section-gap) / 2);
}

@media (min-width: 1024px) {
    header {
        padding-left: calc(var(--section-gap) / 2);
    }
}
</style>
  