import { MessageSquare, TwitterIcon } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-gray-800/60">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <a 
            href="https://communityfund.xyz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Community Fund
          </a>
          <a 
            href="https://discord.gg/communityfund" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Discord</span>
          </a>
          <a 
            href="https://twitter.com/communityfund" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <TwitterIcon className="h-4 w-4" />
            <span>Twitter</span>
          </a>
        </div>
        <div className="text-sm text-gray-500">
          © 2025 Stellar Community Fund. All rights reserved.
        </div>
      </div>
    </footer>
  )
} 