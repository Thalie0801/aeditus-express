import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const { path } = await req.json().catch(() => ({}));
  if (!path) return NextResponse.json({ ok:false, error:"Missing path" }, { status: 400 });
  revalidatePath(path);
  return NextResponse.json({ ok:true, revalidated: path });
}
