import {
  Bell,
  Download,
  Home,
  Music2,
  Search,
  UsersRound,
} from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'

const Navbar = () => {
  const user = useSelector((state) => state.auth.user)
  const profileInitial = user?.firstName?.trim()?.charAt(0).toUpperCase() || 'H'
console.log(user);

  return (
    <div className="flex h-full items-center justify-between gap-4">
      <div className="flex shrink-0 items-center gap-6">
        <Link
          to="/main"
          aria-label="Spotify home"
          className="flex items-center gap-2 text-white transition hover:text-[#1ed760]"
        >
          <span className="grid size-9 place-items-center rounded-full bg-[#1ed760] text-black">
            <Music2 size={21} strokeWidth={2.5} />
          </span>
          <span className="hidden text-xl font-bold tracking-tight sm:inline">
            Spotify
          </span>
        </Link>

        <Link
          to="/main"
          aria-label="Home"
          title="Home"
          className="grid size-12 shrink-0 place-items-center rounded-full bg-[#242424] text-[#b3b3b3] transition hover:scale-105 hover:bg-[#2a2a2a] hover:text-white"
        >
          <Home size={23} fill="currentColor" strokeWidth={1.5} />
        </Link>
      </div>

      <label className="flex h-12 min-w-0 max-w-[560px] flex-1 items-center gap-3 rounded-full bg-[#242424] px-4 text-[#b3b3b3] transition hover:bg-[#2a2a2a] focus-within:outline focus-within:outline-2 focus-within:outline-white">
        <Search size={22} aria-hidden="true" />
        <input
          type="search"
          name="search"
          aria-label="Search"
          placeholder="What do you want to play?"
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#b3b3b3]"
        />
        <span className="hidden h-6 border-l border-[#7c7c7c] sm:block" />
        <Music2 size={21} className="hidden sm:block" aria-hidden="true" />
      </label>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <div className="hidden items-center gap-3 border-r border-[#7c7c7c] pr-4 text-sm font-bold text-[#b3b3b3] lg:flex">
          <button type="button" className="transition hover:scale-105 hover:text-white">
            Explore Premium
          </button>
          <button type="button" className="transition hover:scale-105 hover:text-white">
            Support
          </button>
        </div>

        <button
          type="button"
          className="hidden items-center gap-2 text-sm font-bold text-[#b3b3b3] transition hover:text-white md:flex"
        >
          <Download size={17} />
          Install App
        </button>
        <button
          type="button"
          aria-label="What's new"
          title="What's new"
          className="grid size-10 place-items-center rounded-full text-[#b3b3b3] transition hover:scale-105 hover:text-white"
        >
          <Bell size={20} />
        </button>
        <button
          type="button"
          aria-label="Friend activity"
          title="Friend activity"
          className="hidden size-10 place-items-center rounded-full text-[#b3b3b3] transition hover:scale-105 hover:text-white sm:grid"
        >
          <UsersRound size={20} />
        </button>
        <button
          type="button"
          aria-label={user?.name ? `${user.name} profile` : 'Profile'}
          title={user?.name || 'Profile'}
          className="grid size-10 place-items-center rounded-full bg-[#535353] text-sm font-bold text-white transition hover:scale-105 hover:bg-[#686868]"
        >
          {profileInitial}
        </button>
      </div>
    </div>
  )
}

export default Navbar
