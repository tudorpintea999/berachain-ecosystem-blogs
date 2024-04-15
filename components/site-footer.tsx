import * as React from "react"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className="border-border bg-background border-t p-4 sm:p-8"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="text-secondary-foreground text-xs leading-5">
          &copy; {new Date().getFullYear()} Berachain | All rights reserved |{" "}
          <a
            className="font-bold underline"
            href="https://artio.bex.berachain.com/terms-of-use"
          >
            Terms of Service
          </a>{" "}
          |{" "}
          <a
            className="font-bold underline"
            href="https://artio.bex.berachain.com/privacy-policy"
          >
            Privacy Policy
          </a>
        </div>
        <div className="whitespace-nowrap text-xs">
          Made W/❤️ at the 🐻Beraden
        </div>
      </div>

      <div className="mt-2 flex w-full text-left text-[8px] sm:w-9/12">
        *Annual Percentage Yield (APY) data is provided from third party and
        publicly available information, is subject to change, may not be
        accurate or complete and may not reflect your actual earnings but rather
        the general network yields estimated to be applicable to all relevant
        network participants based on current conditions of the network, which
        may change. Presented rates are retrospective in nature and there is no
        guarantee that historic rates will represent current or future rates.
        APY data is provided for informational purposes only and should not be
        relied on.
      </div>
    </footer>
  )
}
