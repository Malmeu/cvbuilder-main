import Script from 'next/script'
import { useEffect } from 'react'

interface Props {
  slot: string
  style?: React.CSSProperties
  className?: string
}

const AdBanner = ({ slot, style, className }: Props) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('Erreur AdSense:', err)
    }
  }, [])

  return (
    <>
      <ins
        className={`adsbygoogle ${className}`}
        style={{
          display: 'block',
          ...style,
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  )
}

export default AdBanner
