'use client'

export default function DownloadButton(): JSX.Element {
  const handleDownload = () => {
    try {
      const link = document.createElement('a')
      link.href = '/Jason_Xu.pdf'
      link.download = 'resume.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading resume:', error)
    }
  }

  return (
    <button className="download-btn" onClick={handleDownload}>
      [.pdf]
    </button>
  )
}
