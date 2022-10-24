const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center px-2 pt-4 pb-8">
      <div className="mt-2 flex flex-col items-center justify-center gap-2 text-sm text-gray-500">
        <span>
          p.s. customization options are coming soon. If you have any <br />
          suggestions, please let me know on Twitter{" "}
          <a
            href="https://twitter.com/vedantnn7"
            rel="noopener noreferrer"
            target="_blank"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
          >
            @vedantnn7
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer
