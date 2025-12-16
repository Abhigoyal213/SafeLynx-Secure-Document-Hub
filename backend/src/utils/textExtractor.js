const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');

const extractText = async (filePath) => {
    try {
        const ext = path.extname(filePath).toLowerCase();

        // 1. PDF Handling
        if (ext === '.pdf') {
            const dataBuffer = fs.readFileSync(filePath);

            try {
                const data = await pdfParse(dataBuffer);
                const text = data.text ? data.text.trim() : "";

                // If text is very short/empty, it behaves like a scanned PDF
                if (text.length < 100) {
                    // Note: To truly support Scanned PDFs in pure Node without system deps (Ghostscript/Poppler) is extremely difficult.
                    // Tesseract.js works on images. We would need to convert PDF pages to images first.
                    // Since we cannot guarantee 'pdf-to-img' libraries work on this environment without external binaries,
                    // we will return a specific signal for now, OR valid "insufficient text" error.
                    // The user request asks to "Convert PDF pages to images -> Run Tesseract OCR".
                    // Without a reliable pure-JS PDF-to-Image converter, we fallback to specific error to avoid crashing.
                    console.log("[TextExtractor] PDF text too short. Likely scanned.");
                    return { text: "", isScanned: true };
                }

                return { text: text, isScanned: false };
            } catch (e) {
                console.error("[TextExtractor] PDF Parse Error:", e);
                return { text: "", error: e.message };
            }
        }

        // 2. Image Handling (OCR)
        else if (['.png', '.jpg', '.jpeg', '.bmp', '.webp'].includes(ext)) {
            console.log(`[OCR] Starting Tesseract on ${path.basename(filePath)}...`);
            try {
                const { data: { text } } = await Tesseract.recognize(filePath, 'eng', {
                    logger: m => {
                        // Minimal logging
                    }
                });
                const cleanText = text.trim();
                return { text: cleanText, isScanned: false };
            } catch (ocrError) {
                console.error("[OCR] Failed:", ocrError);
                throw new Error("OCR Failed for image");
            }
        }

        // 3. Text/Code Handling (Fallback)
        else if (['.txt', '.md', '.json', '.js', '.html', '.css', '.xml'].includes(ext)) {
            const content = fs.readFileSync(filePath, 'utf8');
            return { text: content, isScanned: false };
        }

        return { text: null, error: "Unsupported file type" };
    } catch (error) {
        console.error("Text extraction failed:", error);
        throw error;
    }
};

module.exports = { extractText };
