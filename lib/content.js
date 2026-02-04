import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export async function getContent(filename) {
    const filePath = path.join(DATA_DIR, `${filename}.json`);
    try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        return JSON.parse(fileContent);
    } catch (error) {
        return [];
    }
}
