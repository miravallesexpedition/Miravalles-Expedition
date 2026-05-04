import { tourService } from '@/lib/services'

export async function GET(request) {
  try {
    const tours = await tourService.getAllTours()

    return Response.json({
      success: true,
      data: tours
    })
  } catch (error) {
    console.error('Error fetching tours:', error)
    return Response.json(
      { error: 'Error al obtener los tours' },
      { status: 500 }
    )
  }
}
