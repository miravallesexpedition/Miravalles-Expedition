import { tourService } from '@/lib/services'

export const dynamic = 'force-dynamic'

export async function GET() {
  const tours = await tourService.getAllTours()

  return Response.json({
    success: true,
    data: tours
  })
}
