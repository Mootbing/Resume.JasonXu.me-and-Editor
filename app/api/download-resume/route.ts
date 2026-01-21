import { readFileSync, existsSync, writeFileSync, unlinkSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function GET() {
  try {
    // Validate file path exists
    const texPath = join(process.cwd(), 'public', 'resume.tex')
    if (!existsSync(texPath)) {
      return new Response(
        JSON.stringify({ error: 'Resume template not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const texContent = readFileSync(texPath, 'utf-8')

    // Use process-specific temp directory for better isolation
    const tempDir = '/tmp'
    const timestamp = Date.now()
    const tempTexPath = join(tempDir, `resume_${timestamp}.tex`)
    const tempPdfPath = join(tempDir, `resume_${timestamp}.pdf`)

    writeFileSync(tempTexPath, texContent)

    // Sanitize paths to prevent command injection
    const sanitizedTempDir = tempDir.replace(/[^a-zA-Z0-9/_-]/g, '')
    const sanitizedTexPath = tempTexPath.replace(/[^a-zA-Z0-9/_.-]/g, '')

    // Compile LaTeX to PDF with timeout and safe command
    const { stdout, stderr } = await execAsync(
      `pdflatex -interaction=nonstopmode -output-directory=${sanitizedTempDir} ${sanitizedTexPath}`,
      { timeout: 30000 }
    )

    // Verify PDF was created
    if (!existsSync(tempPdfPath)) {
      throw new Error(`PDF compilation failed. stdout: ${stdout}, stderr: ${stderr}`)
    }

    const pdfBuffer = readFileSync(tempPdfPath)

    // Clean up temp files
    try {
      unlinkSync(tempTexPath)
      unlinkSync(tempPdfPath)
      unlinkSync(join(tempDir, `resume_${timestamp}.aux`))
      unlinkSync(join(tempDir, `resume_${timestamp}.log`))
      unlinkSync(join(tempDir, `resume_${timestamp}.out`))
    } catch (cleanupError) {
      console.error('Warning: Failed to clean up temp files:', cleanupError)
    }

    // Return the PDF
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    })
  } catch (error) {
    console.error('Error compiling resume:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: 'Failed to compile resume', details: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
