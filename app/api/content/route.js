import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function getFilePath(filename) {
    // Simple sanitation to prevent directory traversal
    const safeFilename = path.basename(filename).replace(/[^a-z0-9-]/gi, "");
    return path.join(DATA_DIR, `${safeFilename}.json`);
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("file");

    if (!filename) {
        return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    try {
        const filePath = await getFilePath(filename);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "File not found or invalid" }, { status: 404 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { file, data } = body;

        if (!file || !data) {
            return NextResponse.json({ error: "File and data are required" }, { status: 400 });
        }

        const filePath = await getFilePath(file);

        // Write formatted JSON
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
    }
}
