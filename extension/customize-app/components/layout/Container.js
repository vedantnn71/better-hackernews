export default function Container({ children }) {
  return (
    <div className="relative flex w-full justify-center bg-gray-100 dark:bg-gray-900">
      <div className="relative overflow-scroll">
        <div className="relative flex w-full min-w-[420px] flex-col p-1 font-sans font-normal text-black dark:text-white">
          {children}
        </div>
      </div>
    </div>
  )
}
