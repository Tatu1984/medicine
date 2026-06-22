import { prisma } from "@/lib/db";

// Streams a research PDF stored in Postgres. Public: only published articles
// (or any article to a signed-in admin) are served.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const article = await prisma.article.findUnique({
      where: { id },
      select: { pdfData: true, pdfName: true, pdfMime: true, published: true },
    });

    if (!article?.pdfData || !article.published) {
      return new Response("Not found", { status: 404 });
    }

    const bytes = new Uint8Array(article.pdfData);
    const filename = (article.pdfName || "research.pdf").replace(/"/g, "");

    return new Response(bytes, {
      headers: {
        "Content-Type": article.pdfMime || "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Content-Length": String(bytes.byteLength),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("[pdf route]", err);
    return new Response("Error", { status: 500 });
  }
}
