import { getMainRealtor } from "@/lib/apiRealtor";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const mainRealtor = await getMainRealtor();

    if (!mainRealtor) {
      return NextResponse.json(
        {
          success: false,
          message: "No main realtor found",
          data: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: mainRealtor,
    });
  } catch (error) {
    console.error("Error fetching main realtor:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch main realtor",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
