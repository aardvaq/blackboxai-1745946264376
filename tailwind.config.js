/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./node_modules/@solana/wallet-adapter-react-ui/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
