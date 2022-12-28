export default function Header() {
  return (
    <header className="my-4 flex items-center justify-center gap-3 text-xl font-bold">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
      >
        <rect width="36" height="36" rx="6" fill="#F97316" />
        <path
          d="M9.49432 9.54545H13.6278L17.608 17.0625H17.7784L21.7585 9.54545H25.892L19.5256 20.8295V27H15.8608V20.8295L9.49432 9.54545Z"
          fill="#F9FAFB"
        />
      </svg>

      <span className="text-gray-900 dark:text-gray-100">
        Better Hacker News
      </span>
    </header>
  )
}
