/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // primary: "#1445c5",
                // line: "#dcdcdc",
                // op: "var(--op)",
                // hover: "#f0f0f0",
                color: "#607D8B",
                bg_hover: "#607d8b1a",
                btn: "#1677ff",
            },
            width: { wrap: "80rem" },
        },
    },
    plugins: [],
}
